<?php

namespace Drupal\ckeditor5_sections\SectionValidation;

use Drupal\Core\Plugin\PluginBase;

/**
 * Base class for section validation plugins.
 */
abstract class SectionValidationBase extends PluginBase implements SectionValidationBaseInterface {

  /**
   * Returns attributes passed into section validation plugin.
   *
   * {@inheritDoc}
   */
  public function getAttributes() {
    return $this->configuration['attributes'];
  }

}
