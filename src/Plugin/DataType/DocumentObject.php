<?php

namespace Drupal\ckeditor5_sections\Plugin\DataType;

use Drupal\Core\TypedData\Plugin\DataType\Map;

/**
 * Defines the "document object" data type.
 *
 * @DataType(
 *   id = "document_object",
 *   label = @Translation("Document object"),
 *   description = @Translation("All kind of document objects."),
 *   deriver = "\Drupal\ckeditor5_sections\Plugin\DataType\Deriver\DocumentObjectDeriver",
 *   definition_class = "\Drupal\ckeditor5_sections\TypedData\DocumentObjectDataDefinition"
 * )
 */
class DocumentObject extends Map {

}
