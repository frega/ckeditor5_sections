<?php

namespace Drupal\ckeditor5_sections\Plugin\Validation\Constraint;

use Symfony\Component\Validator\Constraint;

/**
 * Section validation constraint.
 *
 * @Constraint(
 *   id = "SectionValidation",
 *   label = @Translation("Section validation", context = "Validation")
 * )
 */
class SectionValidationConstraint extends Constraint {

  /**
   * Section validation plugin name/id.
   *
   * @var string
   */
  public $name;

  /**
   * Section attributes.
   *
   * @var array
   */
  public $attributes;

  /**
   * {@inheritdoc}
   */
  public function getDefaultOption() {
    return 'attributes';
  }

  /**
   * {@inheritdoc}
   */
  public function getRequiredOptions() {
    return ['name', 'attributes'];
  }

  /**
   * {@inheritdoc}
   */
  public function validatedBy() {
    return '\Drupal\ckeditor5_sections\Plugin\Validation\Constraint\SectionValidationValidator';
  }

}
