<?php

namespace Drupal\ckeditor5_sections_components\Plugin\Field\FieldFormatter;

use Drupal\Core\Field\FieldItemListInterface;
use Drupal\text\Plugin\Field\FieldFormatter\TextDefaultFormatter;

/**
 * Plugin implementation of the 'sections_components' formatter.
 *
 * @FieldFormatter(
 *   id = "sections_components",
 *   label = @Translation("Sections Components"),
 *   field_types = {
 *     "sections",
 *   }
 * )
 */
class SectionsComponentsFormatter extends TextDefaultFormatter {
  /**
   * {@inheritdoc}
   */
  public function viewElements(FieldItemListInterface $items, $langcode) {
    $elements = [];

    foreach ($items as $delta => $item) {
      $elements[$delta] = [
        '#type' => 'ckeditor5_section',
        '#item' => $item,
        '#langcode' => $langcode,
      ];
    }

    return $elements;
  }

}
