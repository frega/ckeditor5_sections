<?php

namespace Drupal\ckeditor5_sections;

use Drupal\ckeditor5_sections\Plugin\Field\FieldType\SectionsItem;
use Drupal\Core\Entity\EntityInterface;

/**
 * Class DocumentSectionProcessor.
 *
 * Processes
 */
class DocumentSectionProcessor {
  /**
   * The section type.
   *
   * @var \Drupal\ckeditor5_sections\DocumentSection
   */
  protected $documentSection;

  /**
   * @var null|EntityInterface
   */
  protected $entity;

  /**
   * @var null|string
   */
  protected $filterFormat;

  /**
   * @var null|string
   */
  protected $langcode;

  /**
   * DocumentSectionProcessor constructor.
   *
   * @param \Drupal\ckeditor5_sections\DocumentSection $documentSection
   * @param \Drupal\Core\Entity\EntityInterface|NULL $entity
   * @param null $langcode
   * @param null $filterFormat
   */
  public function __construct(DocumentSection $documentSection, EntityInterface $entity = NULL, $langcode = NULL, $filterFormat = NULL) {
    $this->documentSection = $documentSection;
    $this->entity = $entity;
    $this->langcode = $langcode;
    $this->filterFormat = $filterFormat;
  }

  /**
   * Factory function for creating a DocumentSectionProcessor instance from a
   * Sections field.
   *
   * @param \Drupal\ckeditor5_sections\DocumentSection $documentSection
   *
   * @return \Drupal\ckeditor5_sections\DocumentSectionProcessor
   */
  static public function createFromSectionsItem(SectionsItem $item) {
    $text = $item->json;
    $section = DocumentSection::fromValue(json_decode($text, TRUE));
    return new static($section, $item->getEntity(), $item->getLangcode(), $item->getFieldDefinition()->getSetting('filter_format'));
  }

  /**
   * Processes a text-field value of a DocumentSection.
   *
   * @param string $text
   *
   * @return string
   */
  protected function getProcessedDocumentSectionValue($text) {
    if ($this->filterFormat) {
      // @todo: determine if we want to do this here, and if so, for which
      // modules (ckeditor5_sections_token and/or token_filter).
      if ($this->entity) {
        // Inject the entity context for the context-aware filters
        // 1. ckeditor5_sections_token
        $ckeditor5_sections_token_filter_entity = &drupal_static('ckeditor5_sections_token_filter_entity');
        $ckeditor5_sections_token_filter_entity = $this->entity;
        // @todo: also inject entity context for token_filter?
      }

      $build = [
        '#type' => 'processed_text',
        '#text' => $text,
        '#format' =>  $this->filterFormat,
        '#filter_types_to_skip' => [],
        '#langcode' => $this->langcode,
      ];

      // @todo: capture metadata, by executeInRenderContext and merge bubbling
      // cache dependencies in a property that can be passed on.
      $text = \Drupal::service('renderer')->renderPlain($build);
    }
    return $text;
  }

  /**
   * Process DocumentSection object by recursively applying filters to all
   * (text) fields.
   *
   * @param \Drupal\ckeditor5_sections\DocumentSection|null $documentSection
   *
   * @return \Drupal\ckeditor5_sections\DocumentSection
   */
  public function processDocumentSection(DocumentSection $documentSection = NULL) {
    if (!isset($documentSection)) {
      $documentSection = $this->documentSection;
    }

    foreach ($documentSection->getFields() as $key => $field) {
      if (is_array($field)) {
        $processed = array_map(function (DocumentSection $section) {
          return $this->processDocumentSection($section);
        }, $field);
      }
      else if ($field instanceof DocumentSection) {
        $processed = $this->processDocumentSection($field);
      }
      else {
        // @todo: filter out "non-fulltext-y" values (ids, attributes).
        // @todo: see if passing the Markup-instances makes more sense?
        $processed = (string) $this->getProcessedDocumentSectionValue($field);
      }

      $documentSection->set($key, $processed);
    }
    return $documentSection;
  }

}
