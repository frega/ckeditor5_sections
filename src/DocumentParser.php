<?php

namespace Drupal\ckeditor5_sections;

use Drupal\ckeditor5_sections\Plugin\DataType\DocumentSectionAdapter;
use Drupal\Core\TypedData\ComplexDataDefinitionInterface;
use Drupal\Core\TypedData\ComplexDataInterface;
use Drupal\Core\TypedData\ListDataDefinitionInterface;
use Drupal\Core\TypedData\ListInterface;

/**
 * Parser class for extracting the section definitions and data from
 * templates and documents.
 */
class DocumentParser implements DocumentParserInterface {

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

    // 3. All the section types will have an additional field which is called
    // 'content', of type string. The value should contain the actual html or
    // xml content of the field, when the data will be extracted.

    $dom = new \DOMDocument();
    // Load the document and convert the encoding to HTML-ENTITIES, see
    // https://davidwalsh.name/domdocument-utf8-problem
    $dom->loadHTML(mb_convert_encoding($document, 'HTML-ENTITIES', 'UTF-8'), LIBXML_NOERROR);
    $result = [];
    $this->buildSectionDefinitions($dom, $result);
    return $result;
  }

  /**
   * {@inheritdoc}
   */
  public function extractSectionData($document) {
    $dom = new \DOMDocument();
    $dom->loadHTML(mb_convert_encoding($document, 'HTML-ENTITIES', 'UTF-8'), LIBXML_NOERROR);
    //$list_definition = \Drupal::typedDataManager()->createListDataDefinition('section');
    //$result = \Drupal::typedDataManager()->create($list_definition);
    $result = [];
    $this->buildSectionData($dom, $result);
    return $result;
  }

  /**
   * Recursively traverses a dom and extracts the section definitions.
   *
   * @param \DOMNode $node
   *  The node currently being processed.
   * @param $result
   *  The extraction result.
   */
  protected function buildSectionDefinitions(\DOMNode $node, &$result, $parentType = '') {
    // If the current node is a DOMElement, process it.
    $newParentType = $parentType;
    if ($node instanceof \DOMElement) {
      // Check if the current element is a type. If yes, we will add all its
      // attributes to the result.
      if ($node->hasAttribute('itemtype')) {
        $type = $node->getAttribute('itemtype');
        // We also update the new parent type which will be used when processing
        // the children of the current node.
        $newParentType = $type;
        // We need to decide what we do if the type is already added to the
        // result. For now, we just keep processing the data, so we will just
        // merge any new fields, but we may want to change this in the future.
        if (empty($result[$type])) {
          // Also, all the sections will have by default a field named 'content'
          // of type string. This will contain the whole html or xml extracted
          // data.
          $result[$type] = [
            'type' => $type,
            'fields' => [
              'content' => [
                'label' => 'content',
                'type' => 'string',
              ],
            ],
          ];
        }
        foreach ($node->attributes as $attribute) {
          $attributeName = $attribute->nodeName;
          // Specific attributes should be ignored.
          if (in_array($attributeName, ['itemtype', 'itemscope', 'itemprop', 'content', 'itemexpand', 'class'])) {
            continue;
          }
          // Also, if the attribute name starts with 'ck-', we ignore it as
          // well.
          if (strpos($attributeName, 'ck-') === 0) {
            continue;
          }
          // Make sure that the 'data-*' attributes are properly converted to
          // camel case.
          if (strpos($attributeName, 'data-') === 0) {
            $attributeName = $this->convertDataAttributeName($attributeName);
          }
          // Add the attribute as a string field.
          $result[$type]['fields'][$attributeName] = [
            'label' => $attributeName,
            'type' => 'string',
          ];
        }
      }
      // If the element has an item prop, then we actually have to add it to its
      // parent (if any).
      if ($node->hasAttribute('itemprop') && !empty($parentType)) {
        // The type of the field depends actually on the itemtype property. If
        // there is an itemtype, it will just be used as the type, otherwise
        // the type will be 'string'.
        $itemtype = $node->hasAttribute('itemtype') ? 'section:' . $node->getAttribute('itemtype') : 'string';
        if ($node->hasAttribute('ck-contains')) {
          $itemtype = 'section';
        }
        $fieldName = $node->getAttribute('itemprop');
        $result[$parentType]['fields'][$fieldName] = [
          'label' => $fieldName,
          'type' => $itemtype,
        ];
        $ck_type = $node->hasAttribute('ck-type') ? $node->getAttribute('ck-type') : '';
        if (in_array($ck_type, ['container', 'gallery', 'tabs'])) {
          $result[$parentType]['fields'][$fieldName]['cardinality'] = 'multiple';
        }
      }
    }

    // Process all the children of the current node, if any.
    if ($node->hasChildNodes()) {
      foreach (iterator_to_array($node->childNodes) as $child) {
        $this->buildSectionDefinitions($child, $result, $newParentType);
      }
    }
  }

  public function buildSectionData(\DOMNode $node, array &$sections_list, DocumentSection $parent = NULL) {
    $new_parent = $parent;
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
        $data_definition = \Drupal::typedDataManager()->createDataDefinition($parent_type);
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
        $value['item_type'] = $node->getAttribute('itemtype');
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
          $item_field_definition = \Drupal::typedDataManager()->createDataDefinition($value['item_type']);
          // If the field is a complex field, then we need to additionally check
          // the values of the attributes.
          if ($item_field_definition instanceof ComplexDataDefinitionInterface) {
            $item_field_data = new DocumentSection($value['item_type']);
            // Add all the attributes.
            foreach ($node->attributes as $attribute) {
              $attributeName = $attribute->nodeName;
              // Make sure that the 'data-*' attributes are properly converted to
              // camel case.
              if (strpos($attributeName, 'data-') === 0) {
                $attributeName = $this->convertDataAttributeName($attributeName);
              }
              // Add the attribute to the current value.
              if ($item_field_definition->getPropertyDefinition($attributeName)) {
                $item_field_data->set($attributeName, $node->getAttribute($attribute->nodeName));
              }
            }
            $item_field_data->set('content', $this->getDOMInnerHtml($node));
            $new_parent = $item_field_data;
          }
          else {
            // If the field is just a simple (scalar) field, then we just dump
            // the entire html of the node in it for now.
            $item_field_data = $this->getDOMInnerHtml($node);
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

  // @todo: this is an initial implementation which uses the typed data, but this
  // did not work properly when having lists of items. So for now we just use
  // the above implementation which uses the typed data information to retrieve
  // the metadata about the fields, but the values themselves are stored in
  // DocumentSection objects.
  public function __buildSectionData(\DOMNode $node, ListInterface $result, DocumentSectionAdapter $parent = NULL) {
    $new_result = $result;
    $new_parent = $parent;
    $update_new_result = FALSE;
    $update_new_parent = FALSE;
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
        $parent_type = $parent->get('section_type')->getValue();
        $field_name = $node->getAttribute('itemprop');
        $value['field_name'] = $field_name;
        /* @var \Drupal\Core\TypedData\ComplexDataDefinitionInterface $data_definition */
        $data_definition = \Drupal::typedDataManager()->createDataDefinition($parent_type);
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
        $value['item_type'] = $node->getAttribute('itemtype');
      }

      // We only process the actual item if we could extract the item type.
      if (!empty($value['item_type'])) {
        if ($value['item_cardinality'] === 'multiple') {
          $item_field_definition = \Drupal::typedDataManager()->createListDataDefinition($value['item_type']);
          $item_field_data = \Drupal::typedDataManager()->create($item_field_definition);
          $update_new_result = TRUE;
        }
        else {
          $item_field_definition = \Drupal::typedDataManager()->createDataDefinition($value['item_type']);
          // If the field is a complex field, then we need to additionally check
          // the values of the attributes.
          if ($item_field_definition instanceof ComplexDataDefinitionInterface) {
            /* @var \Drupal\Core\TypedData\ComplexDataInterface $item_field_data */
            $item_field_data = \Drupal::typedDataManager()->create($item_field_definition);
            // Add all the attributes.
            foreach ($node->attributes as $attribute) {
              $attributeName = $attribute->nodeName;
              // Make sure that the 'data-*' attributes are properly converted to
              // camel case.
              if (strpos($attributeName, 'data-') === 0) {
                $attributeName = $this->convertDataAttributeName($attributeName);
              }
              // Add the attribute to the current value.
              if ($item_field_definition->getPropertyDefinition($attributeName)) {
                $item_field_data->set($attributeName, $node->getAttribute($attribute->nodeName));
              }
            }
            $item_field_data->set('content', $this->getDOMInnerHtml($node));
            $item_field_data->set('section_type', $value['item_type']);
            $update_new_parent = TRUE;
          }
          else {
            // If the field is just a simple (scalar) field, then we just dump
            // the entire html of th node in it for now.
            $item_field_data = \Drupal::typedDataManager()->create($item_field_definition, $this->getDOMInnerHtml($node));
          }
        }
        // If we are in the context of a parent, then just set the item data
        // to the proper field name.
        if (!empty($parent)) {
          if (!empty($value['field_name'])) {
            $parent->set($value['field_name'], $item_field_data->getValue());
            if ($update_new_result) {
              $new_result = $parent->get($value['field_name']);
            }
            if ($update_new_parent) {
              $new_parent = $parent->get($value['field_name']);
            }
          }
        }
        // If we are not in the context of a parent, we just append the data
        // to the result array.
        else {
          $appended_item = $result->appendItem($item_field_data->getValue());
          $appended_item->getDataDefinition()->setSectionType($item_field_data->getDataDefinition()->getConstraint('SectionType'));
          if ($update_new_result) {
            $new_result = $appended_item;
          }
          if ($update_new_parent) {
            $new_parent = $appended_item;
          }
        }
      }
    }
    // Process all the children of the current node, if any.
    if ($node->hasChildNodes()) {
      foreach (iterator_to_array($node->childNodes) as $child) {
        $this->buildSectionData($child, $new_result, $new_parent);
      }
    }
  }

  /**
   * Converts a data attribute name to camel case, according to
   * https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset
   *
   * @param string $attributeName
   *  The data attribute name
   * @return string
   *  The converted attribute name.
   */
  protected function convertDataAttributeName($attributeName) {
    $convertedName = $attributeName;
    // Remove first the 'data-' prefix. We assume that the attributeName starts
    // with 'data-', so we directly remove the first 5 characters.
    $convertedName = substr($convertedName, 5);
    // Next, make each lowercase letter which follows a dash uppercase, and
    // remove the dash.
    $chrArray = preg_split('//u', $convertedName);
    for ($i = 0; $i < count($chrArray) - 1; $i++) {
      if ($chrArray[$i] === '-' && preg_match('/[a-z]/', $chrArray[$i+1])) {
        $chrArray[$i+1] = mb_strtoupper($chrArray[$i+1]);
        unset($chrArray[$i]);
      }
    }
    return implode('', $chrArray);
  }

  /**
   * Returns the inner html of a DOM node.
   *
   * @param \DOMNode $node
   *  The DOM node.
   * @return string
   *  The html result.
   */
  protected function getDOMInnerHtml(\DOMNode $node) {
    $innerHTML = "";
    foreach ($node->childNodes as $child) {
      $innerHTML .= $node->ownerDocument->saveHTML($child);
    }
    return $innerHTML;
  }
}
