<?php

namespace Drupal\ckeditor5_sections;

/**
 * Interface for the section collector services.
 */
interface SectionsCollectorInterface {

  /**
   * Returns a list of all available sections.
   *
   * @return array
   */
  public function getSections();
}
