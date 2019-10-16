<?php

namespace Drupal\ckeditor5_sections_components;

use Drupal\ckeditor5_sections\DocumentConverterInterface;
use Drupal\ckeditor5_sections\DocumentSection;

class SectionPluginConverter implements DocumentConverterInterface {

  /**
   * @var \Drupal\ckeditor5_sections_components\SectionPluginCollector
   */
  protected $sectionPluginCollector;

  /**
   * @var \Drupal\ckeditor5_sections_components\SectionPluginDocumentParser
   */
  protected $documentParser;

  /**
   * @var \Drupal\ckeditor5_sections_components\SectionPluginDocumentBuilder
   */
  protected $documentBuilder;

  /**
   * @var \Drupal\Core\Extension\ModuleHandlerInterface
   */
  protected $moduleHandler;

  public function __construct(
    SectionPluginCollector $sectionPluginCollector,
    SectionPluginDocumentParser $documentParser,
    SectionPluginDocumentBuilder $documentBuilder
  ) {
    $this->sectionPluginCollector = $sectionPluginCollector;
    $this->documentParser = $documentParser;
    $this->documentBuilder = $documentBuilder;
  }

  /**
   * Retrieve all section type definitions
   *
   * @return array
   */
  public function getSectionTypeDefinitions() {
    // @note: currently \Drupal\ckeditor5_sections\SectionsCollector::getSectionDefinitions
    // duplicates \Drupal\ckeditor5_sections\DocumentConverter::getSectionTypeDefinitions
    return $this->sectionPluginCollector->getSectionDefinitions();
  }

  /**
   * {@inheritdoc}
   */
  public function extractSectionDefinitions($document) {
    return $this->documentParser->extractSectionDefinitions($document);
  }

  /**
   * {@inheritdoc}
   */
  public function extractSectionData($document) {
    // TODO: Implement extractSectionData() method.
    return $this->documentParser->extractSectionData($document);
  }

  /**
   * {@inheritdoc}
   */
  public function buildDocument(DocumentSection $section) {
    // TODO: Implement buildDocument() method.
    return $this->documentBuilder->buildDocument($section);
  }

}
