<?php

namespace Drupal\ckeditor5_sections\TypedData;

/**
 * The DocumentObjectType class.
 *
 * For now this just contains the type information, but we can use this to add
 * other metadata for object types in the future.
 */
class DocumentObjectType implements DocumentObjectTypeInterface {

  protected $type;

  /**
   * DocumentObjectType constructor.
   * @param $type
   *  The type of the object.
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
