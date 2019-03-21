<?php

namespace Drupal\ckeditor5_sections;

/**
 * Parser class for extracting the object definitions and data from
 * templates and documents.
 */
class DocumentParser implements DocumentParserInterface {

  /**
   * {@inheritdoc}
   */
  public function extractObjectDefinitions($document) {
    // The following rules apply when extracting the object definitions from a
    // document:
    // 1. If the element has the 'itemtype' attribute, it is treated like an
    // object. All of its attributes, except the 'class' and 'ck-*' are treated
    // like properties (fields) on the object, of type string. The 'data-*'
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

    // 3. All the object types will have an additional field which is called
    // 'content', of type string. The value should contain the actual html or
    // xml content of the field, when the data will be extracted.
  }
}
