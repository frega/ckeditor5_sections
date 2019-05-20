<?php

namespace Drupal\ckeditor5_sections\Plugin\Validation\Constraint;

use Symfony\Component\Validator\Constraint;

/**
 * Section validation constraint.
 *
 * @Constraint(
 *   id = "SectionType",
 *   label = @Translation("Section type", context = "Validation")
 * )
 */
class SectionTypeConstraint extends Constraint {
  const INVALID_SECTION_TYPE = 'invalid_section_type';

  /**
   * Section type.
   *
   * @var string
   */
  public $type;

  /**
   * {@inheritdoc}
   */
  public function validatedBy() {
    return '\Drupal\ckeditor5_sections\Plugin\Validation\Constraint\SectionTypeValidator';
  }

}
