<?php

namespace Drupal\ckeditor5_sections\Field;

use Drupal\ckeditor5_sections\DocumentSection;
use Drupal\Core\TypedData\TypedData;

/**
 * Computed field property implementation to extract typed sections data.
 */
class SectionsProcessedDataField extends TypedData {

  /**
   * {@inheritdoc}
   */
  public function getValue() {
    $item = $this->getParent();
    $text = $item->json;

    $filterFormat = $item->getFieldDefinition()->getSetting('filter_format');

    if ($filterFormat) {
      $build = [
        '#type' => 'processed_text',
        '#text' => $text,
        '#format' => $filterFormat,
        '#filter_types_to_skip' => [],
        '#langcode' => $item->getLangcode(),
      ];
      // Capture the cacheability metadata associated with the processed text.
      // TODO: Handle caching properly?
      $text = \Drupal::service('renderer')->renderPlain($build);
    }


    /* @var \Drupal\ckeditor5_sections\DocumentConverterInterface $parser */
    $sections = DocumentSection::fromValue(json_decode($text, TRUE));

    // Invoke alter hooks before returning data.
    if ($sections) {
      \Drupal::moduleHandler()->alter('section_data', $sections, $item);
    }
    return $sections;
  }

  public function setValue($value, $notify = TRUE) {
    if ($value) {
      if (is_array($value)) {
        $this->parent->setValue(json_encode($value));
      }
      if ($value instanceof DocumentSection) {
        $this->parent->setValue(json_encode($value->getValue()));
      }
    }
  }


}
