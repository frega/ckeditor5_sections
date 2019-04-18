<?php

namespace Drupal\ckeditor5_sections\Form;

use Drupal\Core\Ajax\AjaxResponse;
use Drupal\Core\Ajax\CloseDialogCommand;
use Drupal\Core\Ajax\InvokeCommand;
use Drupal\Core\Form\FormStateInterface;
use Drupal\media_library\Form\FileUploadForm;
use Drupal\media\MediaInterface;
use Drupal\media_library\Plugin\Field\FieldWidget\MediaLibraryWidget;
use Drupal\Core\Url;
use Drupal\Core\Form\FormBuilderInterface;

/**
 * Alter media upload form.
 */
class SectionsMediaLibraryUploadForm extends FileUploadForm {

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $formState) {
    $form = parent::buildForm($form, $formState);

    $params = $this->getMediaLibraryState($formState)->all();
    $return_type = $this->getRequest()->query->get('return_type');
    if ($return_type) {
      $params['return_type'] = $return_type;
    }

    $form['#action'] = Url::fromRoute('media_library.ui', [], [
      'query' => $params,
    ])->toString();
    return $form;
  }

  /**
   * Processes an upload (managed_file) element.
   *
   * @param array $element
   *   The upload element.
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   *   The form state.
   *
   * @return array
   *   The processed upload element.
   */
  public function processUploadElement(array $element, FormStateInterface $form_state) {
    $element = parent::processUploadElement($element, $form_state);
    $query = $this->getMediaLibraryState($form_state)->all() + [
      FormBuilderInterface::AJAX_FORM_REQUEST => TRUE,
      'return_type' => $this->getRequest()->query->get('return_type'),
    ];
    $element['upload_button']['#ajax']['options']['query'] = $query;

    return $element;
  }

  /**
   * {@inheritdoc}
   */
  public function updateWidget(array &$form, FormStateInterface $formState) {
    if ($formState::hasAnyErrors()) {
      return $form;
    }

    $opener_id = $this->getMediaLibraryState($formState)->getOpenerId();
    if ($field_id = MediaLibraryWidget::getOpenerFieldId($opener_id)) {
      $return_type = $this->getRequest()->query->get('return_type');
      $current_media_ids = array_map(function (MediaInterface $media) use ($return_type) {
        if ($return_type == 'uuid') {
          return $media->uuid();
        }
        return $media->id();
      }, $this->getCurrentMediaItems($formState));
      // Pass the selection to the field widget based on the current widget ID.
      return (new AjaxResponse())
        ->addCommand(new InvokeCommand("[data-media-library-widget-value=\"$field_id\"]", 'val', [implode(',', $current_media_ids)]))
        ->addCommand(new InvokeCommand("[data-media-library-widget-update=\"$field_id\"]", 'trigger', ['mousedown']))
        ->addCommand(new CloseDialogCommand());
    }
  }

}
