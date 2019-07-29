<?php

namespace Drupal\ckeditor5_sections\Field;

use Drupal\Core\TypedData\TypedData;

/**
 * Reconstruct the html document from data and templates.
 */
class SectionsHTMLField extends TypedData {
  /**
   * Cached sections.
   *
   * @var array|null
   */
  protected $document = NULL;

  /**
   * {@inheritdoc}
   */
  public function getValue() {
    $item = $this->getParent();
    // Check temporary storage for a merge result string.
    // TODO: Move document merge to json.
    if ($item->mergeResult) {
      return $item->mergeResult;
    }

    if ($this->document !== NULL) {
      return $this->document;
    }

    $data = $item->sections;

    /** @var \Drupal\ckeditor5_sections\DocumentConverter $documentConverter */
    $documentConverter = \Drupal::service('ckeditor5_sections.document_converter');

    if (!$data) {
      return '';
    }
    $this->document = $documentConverter->buildDocument($data);

    $this->document = $this->document->saveXML($this->document->documentElement);
    return $this->document;
  }

  public function setValue($value, $notify = TRUE) {
    if ($value) {
      /** @var \Drupal\ckeditor5_sections\DocumentConverter $documentConverter */
      $documentConverter = \Drupal::service('ckeditor5_sections.document_converter');
      $doc = $documentConverter->extractSectionData($value);
      $this->parent->setValue(json_encode($doc->getValue()));
    }
  }

}
