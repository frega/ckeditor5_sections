<?php

namespace Drupal\ckeditor5_sections\Plugin\DataType\Deriver;

use Drupal\ckeditor5_sections\TypedData\DocumentSectionType;
use Drupal\Component\Plugin\Derivative\DeriverBase;

/**
 * Provides data type plugins for each document section type.
 */
class DocumentSectionDeriver extends DeriverBase {

  /**
   * {@inheritdoc}
   */
  public function getDerivativeDefinitions($base_plugin_definition) {
    // Also keep the 'entity' defined as is.
    $this->derivatives[''] = $base_plugin_definition;
    $section_types = $this->getSectionTypes();
    foreach ($section_types as $section_type) {
      $this->derivatives[$section_type->getType()] = $base_plugin_definition;
    }
    return $this->derivatives;
  }

  /**
   * Returns an array with all the available document section types from the
   * system.
   *
   * @return DocumentSectionType[]
   */
  protected function getSectionTypes() {
    // @todo: Properly implement the section types retrieval.
    return [
      'teaser' => new DocumentSectionType('teaser'),
      'image' => new DocumentSectionType('image'),
      'button' => new DocumentSectionType('button'),
    ];
  }
}
