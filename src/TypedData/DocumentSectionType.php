<?php

namespace Drupal\ckeditor5_sections\TypedData;

/**
 * The DocumentSectionType class.
 *
 * For now this just contains the type information, but we can use this to add
 * other metadata for section types in the future.
 */
class DocumentSectionType implements DocumentSectionTypeInterface {

  protected $type;

  /**
   * DocumentSectionType constructor.
   * @param $type
   *  The type of the section.
   */
  public function __construct($type) {
    $this->type = $type;
  }

  /**
   * {@inheritdoc}
   */
  public function getType() {
    return $this->type;
  }
}
