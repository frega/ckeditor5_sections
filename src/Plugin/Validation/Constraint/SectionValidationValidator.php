<?php

namespace Drupal\ckeditor5_sections\Plugin\Validation\Constraint;

use Drupal\ckeditor5_sections\Exceptions\SectionValidationException;
use Drupal\ckeditor5_sections\SectionValidationPluginManager;
use Drupal\Core\DependencyInjection\ContainerInjectionInterface;
use Drupal\Core\TypedData\ComplexDataInterface;
use Drupal\Core\TypedData\TypedDataInterface;
use Drupal\Core\TypedData\Validation\TypedDataAwareValidatorTrait;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;
use Symfony\Component\Validator\Exception\UnexpectedTypeException;

/**
 * Validator for named validations (defined by ck-validation attributes).
 */
class SectionValidationValidator extends ConstraintValidator implements ContainerInjectionInterface {
  use TypedDataAwareValidatorTrait;

  /**
   * Section validation plugin manager.
   *
   * @var \Drupal\ckeditor5_sections\SectionValidationPluginManager
   */
  protected $sectionValidationPluginManager;

  /**
   * Instantiates a new instance of this class.
   *
   * {@inheritDoc}
   */
  public static function create(ContainerInterface $container) {
    return new static($container->get('plugin.manager.ckeditor5_sections.section_validation'));
  }

  /**
   * SectionTypeValidator constructor.
   */
  public function __construct(SectionValidationPluginManager $sectionValidationPluginManager) {
    $this->sectionValidationPluginManager = $sectionValidationPluginManager;
  }

  /**
   * Checks if the passed value is valid.
   *
   * {@inheritDoc}
   */
  public function validate($data, Constraint $constraint) {
    // If un-wrapped data has been passed, fetch the typed data object first.
    if (!$data instanceof TypedDataInterface) {
      $data = $this->getTypedData();
    }
    if (!$data instanceof ComplexDataInterface) {
      throw new UnexpectedTypeException($data, 'ComplexData');
    }

    /** @var \Drupal\ckeditor5_sections\SectionValidation\SectionValidationInterface $validationPlugin */
    $validationPlugin = $this->sectionValidationPluginManager->createInstance($constraint->name, [
      'attributes' => $constraint->attributes,
    ]);

    try {
      $validationPlugin->validate($data);
    }
    catch (SectionValidationException $e) {
      $this->context->buildViolation($e->getMessage())
        ->setInvalidValue($data)
        ->setCode($e->getCode())
        ->addViolation();
    }
  }

}
