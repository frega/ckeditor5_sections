<?php

namespace Drupal\ckeditor5_sections\Plugin\Field\FieldWidget;

use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Field\Plugin\Field\FieldWidget\StringTextareaWidget;
use Drupal\Core\Form\FormStateInterface;

/**
 * Plugin implementation of the 'sections_editor' widget.
 *
 * @FieldWidget(
 *   id = "sections_editor",
 *   label = @Translation("Sections editor"),
 *   field_types = {
 *     "sections"
 *   }
 * )
 */
class SectionsEditorWidget extends StringTextareaWidget {

  /**
   * {@inheritdoc}
   */
  public function formElement(FieldItemListInterface $items, $delta, array $element, array &$form, FormStateInterface $form_state) {
    $main_widget = parent::formElement($items, $delta, $element, $form, $form_state);

    $element = $main_widget['value'];
    $element['#type'] = 'text_format';
    $element['#format'] = 'sections_data';
    $element['#base_type'] = $main_widget['value']['#type'];
    for ($i = 0; $i < $items->count(); $i++) {
      $element['#attached']['drupalSettings']['ckeditor5_sections']['masterTemplates'][$items->getName() . '[' . $i . '][value]'] = $items->getSetting('template');
    }
    return $element;
  }

}
