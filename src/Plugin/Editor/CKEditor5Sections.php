<?php

namespace Drupal\ckeditor5_sections\Plugin\Editor;

use Drupal\Core\Extension\ModuleHandlerInterface;
use Drupal\ckeditor\CKEditorPluginManager;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Language\LanguageManagerInterface;
use Drupal\Core\Render\RendererInterface;
use Drupal\editor\Plugin\EditorBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\editor\Entity\Editor;
use Symfony\Component\DependencyInjection\ContainerInterface;

// TODO: Apply linkit conditionally.

// TODO: Make the default root work.

// TODO: Remove all unused services from this file.

/**
 * Defines a CKEditor5-based text editor for Drupal.
 *
 * @Editor(
 *   id = "ckeditor5_sections",
 *   label = @Translation("CKEditor5 Sections"),
 *   supports_content_filtering = FALSE,
 *   supports_inline_editing = TRUE,
 *   is_xss_safe = FALSE,
 *   supported_element_types = {
 *     "textarea",
 *     "textfield",
 *   }
 * )
 */
class CKEditor5Sections extends EditorBase implements ContainerFactoryPluginInterface {

  /**
   * The module handler to invoke hooks on.
   *
   * @var \Drupal\Core\Extension\ModuleHandlerInterface
   */
  protected $moduleHandler;

  /**
   * The language manager.
   *
   * @var \Drupal\Core\Language\LanguageManagerInterface
   */
  protected $languageManager;

  /**
   * The CKEditor plugin manager.
   *
   * @var \Drupal\ckeditor\CKEditorPluginManager
   */
  protected $ckeditorPluginManager;

  /**
   * The renderer.
   *
   * @var \Drupal\Core\Render\RendererInterface
   */
  protected $renderer;

  /**
   * Constructs a \Drupal\ckeditor\Plugin\Editor\CKEditor object.
   *
   * @param array $configuration
   *   A configuration array containing information about the plugin instance.
   * @param string $plugin_id
   *   The plugin_id for the plugin instance.
   * @param mixed $plugin_definition
   *   The plugin implementation definition.
   * @param \Drupal\ckeditor\CKEditorPluginManager $ckeditor_plugin_manager
   *   The CKEditor plugin manager.
   * @param \Drupal\Core\Extension\ModuleHandlerInterface $module_handler
   *   The module handler to invoke hooks on.
   * @param \Drupal\Core\Language\LanguageManagerInterface $language_manager
   *   The language manager.
   * @param \Drupal\Core\Render\RendererInterface $renderer
   *   The renderer.
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, CKEditorPluginManager $ckeditor_plugin_manager, ModuleHandlerInterface $module_handler, LanguageManagerInterface $language_manager, RendererInterface $renderer) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->ckeditorPluginManager = $ckeditor_plugin_manager;
    $this->moduleHandler = $module_handler;
    $this->languageManager = $language_manager;
    $this->renderer = $renderer;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->get('plugin.manager.ckeditor.plugin'),
      $container->get('module_handler'),
      $container->get('language_manager'),
      $container->get('renderer')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function getDefaultSettings() {
    return [
      'rootElement' => '',
      'enabledSections' => [],
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function settingsForm(array $form, FormStateInterface $form_state, Editor $editor) {
    $settings = $editor->getSettings();
    $sections = $this->collectSections();

    $form['rootElement'] = [
      '#type' => 'select',
      '#title' => t('Root Element'),
      '#options' => ['default' => t('Default Root Element')] + array_map(function ($section) {
          return $section['label'];
        }, $sections),
      '#default_value' => $settings['rootElement'],
    ];

    $form['enabledSections'] = [
      '#type' => 'checkboxes',
      '#title' => t('Enabled sections'),
      '#options' => array_map(function ($section) {
        return $section['label'];
      }, $sections),
      '#default_value' => $settings['enabledSections'],
      '#min' => 1,
      '#states' => [
        'required' => [
          'select[name*="rootElement"]' => ['value' => 'default'],
        ],
        'visible' => [
          'select[name*="rootElement"]' => ['value' => 'default'],
        ],
      ],
    ];

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function getLibraries(Editor $editor) {
    return ['ckeditor5_sections/editor'];
  }

  /**
   * {@inheritdoc}
   */
  public function getJSSettings(Editor $editor) {
    $sections = $this->collectSections();
    $settings = $editor->getSettings();
    $enabledSections = array_filter(array_values($settings['enabledSections']));
    $rootElement = $settings['rootElement'];

    if ($rootElement == 'default') {
      $sections['_root'] = [
        'label' => $this->t('Document root'),
        'template' => '<div class="root" ck-type="container" ck-contains="' . implode(' ', $enabledSections) . '"></div>',
      ];
      $settings['masterTemplate'] = '_root';
    }
    else {
      $settings['masterTemplate'] = $rootElement;
    }

    /** @var \Drupal\Core\Extension\ModuleHandlerInterface $moduleHandler */
    $moduleHandler = \Drupal::service('module_handler');
    $moduleHandler->alter('ckeditor5_sections_attributes', $templateAttributes);

    $settings['templates'] = $sections;
    $settings['templateAttributes'] = $templateAttributes;
    $settings['enabled_drupal_modules'] = array_keys($moduleHandler->getModuleList());

    $moduleHandler->alter('ckeditor5_sections_editor_settings', $settings);

    return $settings;
  }

  /**
   * Returns a list of all available sections.
   *
   * @return array
   */
  protected function collectSections() {
    $sections = [];
    $this->moduleHandler->alter('ckeditor5_sections', $sections);
    return $sections;
  }

}
