<?php
namespace Drupal\ckeditor5_sections_components;

use Drupal\ckeditor5_sections\DocumentSection;
use Drupal\ckeditor5_sections\TypedData\DocumentSectionDataDefinition;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Extension\ModuleHandlerInterface;
use Drupal\Core\TypedData\ListDataDefinitionInterface;
use Drupal\Core\TypedData\TypedDataManagerInterface;

class SectionPluginDocumentParser {

  /**
   * @var \Drupal\ckeditor5_sections_components\SectionPluginCollector
   */
  protected $sectionPluginCollector;

  /**
   * @var \Drupal\Core\TypedData\TypedDataManagerInterface
   */
  protected $typedDataManager;

  /**
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  protected $entityTypeManager;

  /**
   * @var \Drupal\Core\Extension\ModuleHandlerInterface
   */
  protected $moduleHandler;

  /**
   * Maps type names to their template DOM nodes.
   *
   * @var \DOMElement[]
   */
  protected $typeNodeMap;

  public function __construct(
    SectionPluginCollector $sectionPluginCollector,
    TypedDataManagerInterface $typedDataManager,
    EntityTypeManagerInterface $entityTypeManager,
    ModuleHandlerInterface $moduleHandler
  ) {
    $this->sectionPluginCollector = $sectionPluginCollector;
    $this->typedDataManager = $typedDataManager;
    $this->entityTypeManager = $entityTypeManager;
    $this->moduleHandler = $moduleHandler;
  }

  /**
   * Retrieve all section type definitions
   *
   * @return array
   */
  public function getSectionTypeDefinitions() {
    $section_types = [];
    $templates = $this->sectionPluginCollector->getSections();
    foreach ($templates as $template) {
      $section_types = array_merge($section_types, $this->extractSectionDefinitions($template['template']));
    }
    return $section_types;
  }

  /**
   * {@inheritdoc}
   */
  public function extractSectionDefinitions($document) {
    // The following rules apply when extracting the section definitions from a
    // document:
    // 1. If the element has the 'itemtype' attribute, it is treated like an
    // section. All of its attributes, except the 'class' and 'ck-*' are treated
    // like properties (fields) on the section, of type string. The 'data-*'
    // attributes are converted to properties according to
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset
    // @todo: handle the case when the same item type appears more times, and check for recursion.
    // 2. If the element has an 'itemprop' then this is treated like a property
    // (field) and attached to the parent type (it will be basically the first
    // ancestor element which has an itemtype). If there is not parent, then the
    // field is not attached to anything, it will basically not appear anywhere.
    // The type of the fields depends on the 'itemtype' property of the element.
    // If the 'itemtype' is empty, then the type will be set to string. If there
    // is an 'itemtype' then this will become the type of the field.
    $dom = new \DOMDocument();
    // Load the document and convert the encoding to HTML-ENTITIES, see
    // https://davidwalsh.name/domdocument-utf8-problem
    $dom->loadHTML(mb_convert_encoding($document, 'HTML-ENTITIES', 'UTF-8'), LIBXML_NOERROR);
    $result = [];
    $this->buildSectionDefinitions($dom, $result);
    $this->moduleHandler->alter('section_type_definitions', $result);
    return $result;
  }

  /**
   * Recursively traverses a dom and extracts the section definitions.
   *
   * @param \DOMNode $node
   *   The node currently being processed.
   * @param $result
   *   The extraction result.
   */
  protected function buildSectionDefinitions(\DOMNode $node, &$result, $parentType = '') {
    // If the current node is a DOMElement, process it.
    $newParentType = $parentType;
    if ($node instanceof \DOMElement) {
      // Check if the current element is a type. If yes, we will add all its
      // attributes to the result.
      if ($node->hasAttribute('itemtype')) {
        $type = $node->getAttribute('itemtype');
        $this->typeNodeMap[$type] = $node;
        // We also update the new parent type which will be used when processing
        // the children of the current node.
        $newParentType = $type;
        // We need to decide what we do if the type is already added to the
        // result. For now, we just keep processing the data, so we will just
        // merge any new fields, but we may want to change this in the future.
        if (empty($result[$type])) {
          $result[$type] = [
            'type' => $type,
            'fields' => [],
          ];
        }

        $internalAttributes = [];
        // Expose some attributes as fields.
        foreach ($node->attributes as $attribute) {
          $attributeName = $attribute->nodeName;
          if (
            // Specific attributes should be ignored.
            in_array($attributeName, ['itemtype', 'itemscope', 'itemprop', 'itemexpand', 'class']) ||
            // Also, if the attribute name starts with 'ck-', we ignore it as
            // well.
            strpos($attributeName, 'ck-') === 0) {
            $internalAttributes[$attributeName] = $attribute->nodeValue;
            continue;
          }
          // Add the attribute as a string field.
          $result[$type]['fields'][$attributeName] = [
            'label' => $attributeName,
            'type' => 'string',
          ];
          if ($attribute->nodeValue) {
            $result[$type]['fields'][$attributeName]['default'] = $attribute->nodeValue;
          }
        }
        $result[$type]['attributes'] = $internalAttributes;
      }
      // If the element has an item prop, then we actually have to add it to its
      // parent (if any).
      if ($node->hasAttribute('itemprop') && !empty($parentType)) {
        $attributes = [];
        // The type of the field depends actually on the itemtype property. If
        // there is an itemtype, it will just be used as the type, otherwise
        // the type will be 'string'.
        $itemtype = $node->hasAttribute('itemtype') ? 'section:' . $node->getAttribute('itemtype') : 'string';
        $fieldName = $node->getAttribute('itemprop');

        if ($node->hasAttribute('ck-contains')) {
          $itemtype = 'section';
        }
        $result[$parentType]['fields'][$fieldName] = [
          'label' => $fieldName,
          'type' => $itemtype,
          'attributes' => array_merge(array_map(function (\DOMNode $attribute) {
            return $attribute->nodeValue;
          }, iterator_to_array($node->attributes)), $attributes),
        ];

        if ($node->hasAttribute('ck-contains')) {
          $result[$parentType]['fields'][$fieldName]['cardinality'] = 'multiple';
        }
      }
      // @todo: warn if the template can't be parsed.
    }

    // Process all the children of the current node, if any.
    if ($node->hasChildNodes()) {
      foreach (iterator_to_array($node->childNodes) as $child) {
        $this->buildSectionDefinitions($child, $result, $newParentType);
      }
    }
  }


  /**
   * {@inheritdoc}
   */
  public function extractSectionData($document) {
    $dom = new \DOMDocument();
    $dom->loadHTML(mb_convert_encoding($document, 'HTML-ENTITIES', 'UTF-8'), LIBXML_NOERROR);
    // $list_definition = \Drupal::typedDataManager()->createListDataDefinition('section');
    // $result = \Drupal::typedDataManager()->create($list_definition);
    $result = [];
    if ($dom->documentElement->hasAttribute('itemtype')) {
      throw new \Exception('Data extraction requires type definition at root.');
    }
    $this->buildSectionData($dom, $result);
    return $result[0];
  }

  protected function buildSectionData(\DOMNode $node, array &$sections_list, DocumentSection $parent = NULL) {
    $new_parent = $parent;
    $stop_processing = FALSE;
    if ($node instanceof \DOMElement) {
      $value = [
        'item_type' => NULL,
        'item_cardinality' => 'single',
      ];
      // If the element has an itemprop attribute, and we are in the context of
      // a parent, then we extract the item type and its cardinality from the
      // data definition we have in the system. If the element has an itemprop,
      // but we are not in the context of a parent then we can't say what type
      // is, unless it has an itemtype attribute.
      if ($node->hasAttribute('itemprop') && !empty($parent)) {
        $parent_type = $parent->getType();
        $field_name = $node->getAttribute('itemprop');
        $value['field_name'] = $field_name;
        /* @var \Drupal\Core\TypedData\ComplexDataDefinitionInterface $data_definition */
        $data_definition = $this->typedDataManager->createDataDefinition($parent_type);
        $field_definition = $data_definition->getPropertyDefinition($field_name);
        // @todo: throw an exception maybe?
        if (!empty($field_definition)) {
          $value['item_type'] = $field_definition->getDataType();
          // If the field data definition is an instance of ListDataDefinition,
          // then the cardinality is multiple, and its type is section.
          if ($field_definition instanceof ListDataDefinitionInterface) {
            $value['item_cardinality'] = 'multiple';
            $value['item_type'] = 'section';
          }
        }
      }
      elseif ($node->hasAttribute('itemtype')) {
        $value['item_type'] = 'section:' . $node->getAttribute('itemtype');
      }

      // We only process the actual item if we could extract the item type.
      if (!empty($value['item_type'])) {
        // If we encounter a multiple field, then this is actually just a list
        // of items. In this case we directly extract the list and assign it to
        // the field.
        if ($value['item_cardinality'] === 'multiple') {
          if (!empty($parent) && !empty($value['field_name'])) {
            $field_result = [];
            if ($node->hasChildNodes()) {
              foreach (iterator_to_array($node->childNodes) as $child) {
                $this->buildSectionData($child, $field_result);
              }
            }
            $parent->set($value['field_name'], $field_result);
          }
          // As we already processed the list, we set this flag to true so this
          // does not get processed again.
          $stop_processing = TRUE;
        }
        else {
          $item_field_definition = $this->typedDataManager->createDataDefinition($value['item_type']);
          // If the field is a complex field, then we need to additionally check
          // the values of the attributes.
          if ($item_field_definition instanceof DocumentSectionDataDefinition) {
            $item_field_data = new DocumentSection($value['item_type']);
            // Add all the attributes.
            $entityType = '';
            foreach ($node->attributes as $attribute) {
              $attributeName = $attribute->nodeName;
              // Add the attribute to the current value.
              if ($item_field_definition->getPropertyDefinition($attributeName)) {
                $item_field_data->set($attributeName, $node->getAttribute($attribute->nodeName));
              }
              if ($attributeName == 'data-media-type') {
                $entityType = $node->getAttribute($attribute->nodeName);
              }
            }

            $new_parent = $item_field_data;
          }
          elseif (strpos($value['item_type'], 'entity:') === 0) {
            $entity_type_id = substr($value['item_type'], strlen('entity:'));
            // Support media entities.
            try {
              $entities = $this->entityTypeManager
                ->getStorage($entity_type_id)
                ->loadByProperties([
                  'uuid' => $node->getAttribute('data-media-uuid'),
                ]);
              $item_field_data = reset($entities);
              if (!$item_field_data) {
                $item_field_data = NULL;
              }
            }
            catch (\Exception $e) {
              $item_field_data = NULL;
            }
          }
          else {
            // If the field is just a simple (scalar) field, then we just dump
            // the entire html of the node in it for now.
            $item_field_data = $this->getDOMInnerHtml($node);
            if (trim(strip_tags($item_field_data), " \t\n\r\0\x0B\xC2\xA0") === '') {
              // CKEditor and friends sometimes use the non-breaking space
              // character in empty elements for various reasons. It could be
              // just "&nbsp;" or something like "<p>&nbsp;</p>". Treat such
              // cases as empty strings, so that the user code can perform the
              // is-empty checks in an easy way.
              $item_field_data = '';
            }
          }

          // If we are in the context of a parent, then just set the item data
          // to the proper field name.
          if (!empty($parent)) {
            if (!empty($value['field_name'])) {
              $parent->set($value['field_name'], $item_field_data);
            }
          }
          // If we are not in the context of a parent, we just append the data
          // to the result array.
          else {
            $sections_list[] = $item_field_data;
          }
        }
      }
    }
    // Process all the children of the current node, if any.
    if (!$stop_processing && $node->hasChildNodes()) {
      foreach (iterator_to_array($node->childNodes) as $child) {
        $this->buildSectionData($child, $sections_list, $new_parent);
      }
    }
  }

  /**
   * Returns the inner html of a DOM node.
   *
   * @param \DOMNode $node
   *   The DOM node.
   *
   * @return string
   *   The html result.
   */
  protected function getDOMInnerHtml(\DOMNode $node) {
    $innerHTML = "";
    foreach ($node->childNodes as $child) {
      $innerHTML .= $node->ownerDocument->saveHTML($child);
    }
    return $innerHTML;
  }


  /**
   * @param $type
   *
   * @return \DOMElement
   */
  public function getTypeNode($type) {
    // @todo: this should live in its own registry, i guess.
    if (!isset($this->typeNodeMap)) {
      // Make sure all templates are scanned and the typemap is built.
      // @todo: this needs a refactor!
      // @todo: in
      $this->sectionPluginCollector->getSectionDefinitions();
    }
    return $this->typeNodeMap[$type];
  }

}
