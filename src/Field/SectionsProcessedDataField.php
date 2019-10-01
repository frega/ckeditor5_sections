<?php

namespace Drupal\ckeditor5_sections\Field;

use Drupal\ckeditor5_sections\DocumentSection;
use Drupal\ckeditor5_sections\DocumentSectionProcessor;
use Drupal\Core\TypedData\TypedData;

/**
 * Computed field property implementation to extract typed sections data.
 */
class SectionsProcessedDataField extends TypedData {

  /**
   * {@inheritdoc}
   */
  public function getValue() {
    $documentSectionsProcessor = DocumentSectionProcessor::createFromSectionsItem($this->getParent());
    $processed_section = $documentSectionsProcessor->processDocumentSection();
    \Drupal::moduleHandler()->alter('section_data', $processed_section, $item);
    return $processed_section;
  }

  /**
   * {@inheritdoc}
   */
  public function setValue($value, $notify = TRUE) {
    // @todo: given that this is a computed field should we remove this setter?
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
