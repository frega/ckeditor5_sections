<?php

namespace Drupal\ckeditor5_sections_components\Annotation;

use Drupal\Component\Annotation\Plugin;

/**
 * Defines a Section plugin item annotation object.
 *
 * @see \Drupal\ckeditor5_sections_components\Plugin\SectionPluginManager
 * @see plugin_api
 *
 * @Annotation
 */
class SectionPlugin extends Plugin {

  /**
   * The section ID.
   *
   * @var string
   */
  public $id;

  /**
   * The label of the section.
   *
   * @var \Drupal\Core\Annotation\Translation
   *
   * @ingroup plugin_translatable
   */
  public $label;

  /**
   * The icon for the section.
   *
   * @var string
   */
  public $icon;

  /**
   * An array of context definitions describing the context used by the plugin.
   *
   * The array is keyed by context names.
   *
   * @var \Drupal\Core\Annotation\ContextDefinition[]
   */
  public $context_definitions = [];

}
