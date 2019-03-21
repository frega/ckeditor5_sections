<?php

namespace Drupal\ckeditor5_sections\Plugin\DataType\Deriver;

use Drupal\ckeditor5_sections\TypedData\DocumentObjectType;
use Drupal\Component\Plugin\Derivative\DeriverBase;

/**
 * Provides data type plugins for each document object type.
 */
class DocumentObjectDeriver extends DeriverBase {

  /**
   * {@inheritdoc}
   */
  public function getDerivativeDefinitions($base_plugin_definition) {
    // Also keep the 'entity' defined as is.
    $this->derivatives[''] = $base_plugin_definition;
    $object_types = $this->getObjectTypes();
    foreach ($object_types as $object_type) {
      $this->derivatives[$object_type->getType()] = $base_plugin_definition;
    }
    return $this->derivatives;
  }

  /**
   * Returns an array with all the available document object types from the
   * system.
   *
   * @return DocumentObjectType[]
   */
  protected function getObjectTypes() {
    // @todo: Properly implement the object types retrieval.
    return [
      'teaser' => new DocumentObjectType('teaser'),
      'image' => new DocumentObjectType('image'),
      'button' => new DocumentObjectType('button'),
    ];
  }
}
