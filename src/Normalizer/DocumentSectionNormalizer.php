<?php

namespace Drupal\ckeditor5_sections\Normalizer;

use Drupal\ckeditor5_sections\DocumentSection;
use Drupal\serialization\Normalizer\NormalizerBase;
use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;

/**
 * Normalizer class for document section objects.
 */
class DocumentSectionNormalizer extends NormalizerBase implements DenormalizerInterface {

  protected $supportedInterfaceOrClass = 'Drupal\ckeditor5_sections\DocumentSection';

  public function normalize($object, $format = NULL, array $context = []) {
    //$value = parent::normalize($object, $format, $context);
    $value['section_type'] = $object->getType();
    $value['fields'] = array_map(function($item) use ($format, $context) {
      if ($item instanceof DocumentSection || is_array($item)) {
        return $this->serializer->normalize($item, $format, $context);
      }
      return $item;
    }, $object->getFields());
    return $value;
  }

  /**
   * {@inheritdoc}
   */
  public function denormalize($data, $class = NULL, $format = NULL, array $context = []) {
    if (is_array($data) && empty($data['section_type'])) {
      return array_map(function ($item) use ($class, $format, $context) {
        return $this->serializer->denormalize($item, $class, $format, $context);
      }, $data);
    } elseif (is_array($data) && !empty($data['section_type'])) {
      $section = new DocumentSection($data['section_type']);
      if (!empty($data['fields'])) {
        foreach ($data['fields'] as $field_name => $field_value) {
          if (is_array($field_value)) {
            $section->set($field_name, $this->serializer->denormalize($field_value, $class, $format, $context));
          }
          else {
            $section->set($field_name, $field_value);
          }
        }
      }
      return $section;
    }
    throw new InvalidArgumentException('The data must be either an array of sections or an array with the section information.');
  }
}
