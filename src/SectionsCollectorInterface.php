<?php

namespace Drupal\ckeditor5_sections;

/**
 * Interface for the section collector services.
 */
interface SectionsCollectorInterface {

  /**
   * Returns a list of all available sections.
   *
   * @param string $directory|NULL
   *  The directory path to scan for templates. If NULL, the templateDirectory
   *  configuration will be used.
   *
   * @return array
   */
  public function collectSections($directory = NULL);
}
