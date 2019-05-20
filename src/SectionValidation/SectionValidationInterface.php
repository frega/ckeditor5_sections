<?php

namespace Drupal\ckeditor5_sections\SectionValidation;

use Drupal\Core\TypedData\TypedData;

/**
 * SectionValidationInterface implemented by all SectionValidation plugins.
 */
interface SectionValidationInterface {

  /**
   * Validates (typed) data of a document section.
   *
   * @param \Drupal\Core\TypedData\TypedData $data
   *   Data to validate.
   *
   * @throws \Drupal\ckeditor5_sections\Exceptions\SectionValidationException
   *   Throws SectionValidationException on error.
   */
  public function validate(TypedData $data);

}
