<?php

namespace Drupal\ckeditor5_sections\Plugin\DataType;

use Drupal\Core\TypedData\Plugin\DataType\Map;

/**
 * Defines the "document section" data type.
 *
 * @DataType(
 *   id = "section",
 *   label = @Translation("Document section"),
 *   description = @Translation("All kind of document sections."),
 *   deriver = "\Drupal\ckeditor5_sections\Plugin\DataType\Deriver\DocumentSectionDeriver",
 *   definition_class = "\Drupal\ckeditor5_sections\TypedData\DocumentSectionDataDefinition"
 * )
 */
class DocumentSectionAdapter extends Map {

}
