<?php

namespace Drupal\ckeditor5_sections;

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
        $type = 'section:' . $node->getAttribute('itemtype');
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
}
