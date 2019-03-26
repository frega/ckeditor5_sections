<?php

namespace Drupal\ckeditor5_sections;

/**
 * Class DocumentSection
 */
class DocumentSection implements DocumentSectionInterface {

  protected $sectionType;

  protected $fields;

  public function __construct($section_type, array $fields = []) {
    $this->sectionType = $section_type;
    $this->fields = $fields;
  }

  public function getType() {
    return $this->sectionType;
  }

  public function set($field_name, $value = NULL) {
    if (is_null($value)) {
      if (isset($this->fields[$field_name])) {
        unset($this->fields[$field_name]);
      }
    }
    else {
      $this->fields[$field_name] = $value;
    }
  }

  public function get($field_name) {
    return $this->fields[$field_name] ?? NULL;
  }

  public function getFields() {
    return $this->fields;
  }
}