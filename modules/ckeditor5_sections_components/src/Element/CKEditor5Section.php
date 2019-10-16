<?php

namespace Drupal\ckeditor5_sections_components\Element;

use Drupal\Core\Render\Element\RenderElement;

/**
 * Provides a render element for a ckeditor5_section.
 *
 * Properties:
 * - #item:
 * - #section: Section name/id.
 * - #data: data
 *
 * Usage Example:
 * @code
 * $build['section'] = [
 *   '#type' => 'section',
 *   '#item' => instance of SectionsItem,
 *   '#section' => 'id',
 *   '#data' => []
 * ];
 * @endcode
 *
 * @RenderElement("ckeditor5_section")
 */
class CKEditor5Section extends RenderElement {

  /**
   * {@inheritdoc}
   */
  public function getInfo() {
    return [
      '#pre_render' => [
        [get_class($this), 'preRenderEntityElement'],
      ],
      '#item' => NULL,
      '#section' => '',
      '#data' => [],
      '#langcode' => NULL,
    ];
  }

  /**
   * Entity element pre render callback.
   *
   * @param array $element
   *   An associative array containing the properties of the entity element.
   *
   * @return array
   *   The modified element.
   */
  public static function preRenderEntityElement(array $element) {
    if (!empty($element['#item'])) {
      /** @var \Drupal\ckeditor5_sections\Plugin\Field\FieldType\SectionsItem $item */
      $item = $element['#item'];
      $settings = $item->getFieldDefinition()->getSettings();
      $section = $settings['template'];
      $document_section = $item->sections_processed;
      $data = $item->sections_processed->getValue();
    }
    else {
      if (!empty($element['#section'])) {
        $section = $element['#section'];
      }
      else {
        throw new \InvalidArgumentException('You must provide either #item OR #section');
      }

      if (!empty($element['#document_section'])) {
        $document_section = $element['#document_section'];
      }
      else {
        throw new \InvalidArgumentException('You must provide either #item OR #document_section');
      }
    }

    return [
      '#theme' => 'section',
      '#section' => $section,
      '#document_section' => $document_section,
    ];
  }

}
