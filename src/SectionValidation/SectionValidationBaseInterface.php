<?php

namespace Drupal\ckeditor5_sections\SectionValidation;

/**
 * Interface for section validation base plugins.
 */
interface SectionValidationBaseInterface extends SectionValidationInterface {

  /**
   * Returns attributes passed into section validation plugin.
   *
   * @return array
   *   Returns attributes.
   */
  public function getAttributes();

}
