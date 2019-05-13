<?php

namespace Drupal\ckeditor5_sections_test\Plugin\SectionValidation;

use Drupal\ckeditor5_sections\Exceptions\SectionValidationException;
use Drupal\ckeditor5_sections\SectionValidation\SectionValidationBase;
use Drupal\Core\TypedData\TypedData;

/**
 * Section validation plugin example.
 *
 * @SectionValidation(
 *   id = "ExampleButtonValidation",
 *   label = "Example custom button validation"
 * )
 */
class ExampleButtonValidation extends SectionValidationBase {
  const MUST_FILL_OUT_BOTH_OR_NONE = 123;

  /**
   * Validates that either both link and text are filled out or none.
   *
   * {@inheritDoc}
   */
  public function validate(TypedData $data) {
    if (
      (empty($data->getValue()['text']) && !empty($data->getValue()['link-target'])) ||
      (!empty($data->getValue()['text']) && empty($data->getValue()['link-target']))
    ) {
      throw new SectionValidationException(
        'Must leave either text and link empty, or fill out both',
        self::MUST_FILL_OUT_BOTH_OR_NONE
      );
    }
  }

}
