<?php

namespace Drupal\ckeditor5_sections_components\Plugin;

use Drupal\ckeditor5_sections\DocumentSection;
use Drupal\Core\Plugin\ContextAwarePluginBase;

/**
 * Base class for Section plugin plugins.
 */
abstract class SectionPluginBase extends ContextAwarePluginBase implements SectionPluginInterface {

  /**
   * @return  \Drupal\ckeditor5_sections\DocumentConverterInterface
   */
  protected function getConverter() {
    // @todo DI this.
    return \Drupal::service('ckeditor5_sections_components.section_plugin_converter');
  }

  /**
   * @return \Drupal\ckeditor5_sections_components\SectionPluginDocumentBuilder
   */
  protected function getDocumentBuilder() {
    // @todo DI this.
    return \Drupal::service('ckeditor5_sections_components.section_plugin_document_builder');
  }

  /**
   * @return DocumentSection
   * @throws \Drupal\Component\Plugin\Exception\PluginException
   */
  protected function getDocumentSection() {
    if ($document_section = $this->getContextValue('document_section')) {
      return $document_section;
    }
    if (!empty($this->configuration['document_section'])) {
      return $this->configuration['document_section'];
    }
    throw new \LogicException('Section plugin has not been instantiated with a "document_section"-context or -configuration');
  }

  /**
   * @return string
   */
  protected function getTemplateFilename() {
    return $this->getPluginDefinition()['template'];
  }

  /**
   * @return false|string
   */
  public function getTemplate() {
    $filename = $this->getTemplateFilename();
    // If the template is a Twig file, process the Twig placeholders etc.
    if (strpos($filename, '.html.twig') !== FALSE) {
      return \Drupal::service('ckeditor5_sections.twig_processor')->processTwigTemplate($filename);
    }
    else {
      return file_get_contents($filename);
    }
  }

  /**
   * @return string|null
   */
  public function getIcon() {
    return $this->getPluginDefinition()['icon'];
  }

  /**
   * @return string
   */
  public function getLabel() {
    return !empty($this->getPluginDefinition()['label']) ? $this->getPluginDefinition()['label'] : $this->getPluginId();
  }

  /**
   * @return array
   */
  public function getSectionInfo() {
    return [
      'id' => $this->getPluginId(),
      'label' => $this->getLabel(),
      'icon' => $this->getIcon(),
      'template' => $this->getTemplate(),
      'template_filename' =>$this->getTemplateFilename(),
    ];
  }

  /**
   * {@inheritDoc}
   */
  public function extractSectionDefinition() {
    // @todo: this should be wrapped in some for of (typed) definition class.
    return $this->getConverter()->extractSectionDefinitions($this->getTemplate());
  }

  /**
   * @return \DOMDocument
   * @throws \Drupal\Component\Plugin\Exception\PluginException
   */
  public function build() {
    return $this->getDocumentBuilder()->buildDocument($this->getDocumentSection());
  }

  /**
   * @return array
   * @throws \Drupal\Component\Plugin\Exception\PluginException
   */
  public function view() {
    $document_section = $this->getDocumentSection();
    return [
      '#theme' => 'section',
      '#document_section' => $document_section,
    ];
  }
}
