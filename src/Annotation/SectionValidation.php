<?php

namespace Drupal\ckeditor5_sections\Annotation;

use Drupal\Component\Annotation\Plugin;

/**
 * Defines a section validation plugin.
 *
 * @see \Drupal\ckeditor5_sections\SectionValidationBase
 * @see plugin_api
 *
 * @Annotation
 */
class SectionValidation extends Plugin {

  /**
   * The plugin ID.
   *
   * @var string
   */
  public $id;

  /**
   * The title of the plugin.
   *
   * @var \Drupal\Core\Annotation\Translation
   *
   * @ingroup plugin_translatable
   */
  public $title;

}
