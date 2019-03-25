<?php

namespace Drupal\ckeditor5_sections\Plugin\DataType\Deriver;

use Drupal\ckeditor5_sections\TypedData\DocumentSectionType;
use Drupal\Component\Plugin\Derivative\DeriverBase;

/**
 * Provides data type plugins for each document section type.
 */
class DocumentSectionDeriver extends DeriverBase {

  /**
   * {@inheritdoc}
   */
  public function getDerivativeDefinitions($base_plugin_definition) {
    // Also keep the 'entity' defined as is.
    $this->derivatives[''] = $base_plugin_definition;
    $section_types = $this->getSectionTypes();
    foreach ($section_types as $section_type) {
      $this->derivatives[$section_type->getType()] = $base_plugin_definition;
    }
    return $this->derivatives;
  }

  /**
   * Returns an array with all the available document section types from the
   * system.
   *
   * @return DocumentSectionType[]
   */
  protected function getSectionTypes() {
    $templates = $this->getAvailableTemplates();
    $section_types = [];
    foreach ($templates as $template) {
      $section_types = array_merge($section_types, $this->getSectionDefinitionsFromTemplate($template['template']));
    }
    return array_map(function($section) {
      return new DocumentSectionType($section['type']);
    }, $section_types);
  }

  /**
   * Returns an array with all the available templates from the system.
   *
   * @return array
   *  An array of all the available sections.
   */
  protected function getAvailableTemplates() {
    return \Drupal::getContainer()->get('ckeditor5_sections.sections_collector')->collectSections();
  }

  /**
   * Extracts the sections definitions (fields and possibly other metadata) from
   * a template.
   *
   * @param string $template
   * @return array
   */
  protected function getSectionDefinitionsFromTemplate($template) {
    return \Drupal::getContainer()->get('ckeditor5_sections.document_parser')->extractSectionDefinitions($template);
  }
}
