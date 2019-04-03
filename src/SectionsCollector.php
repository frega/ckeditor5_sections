<?php

namespace Drupal\ckeditor5_sections;

use Drupal\Core\Config\ConfigFactory;

/**
 * Sections collector service class.
 */
class SectionsCollector implements SectionsCollectorInterface {

  /**
   * The config factory service.
   * @var \Drupal\Core\Config\ConfigFactory
   */
  protected $configFactory;

  /**
   * SectionsCollector constructor.
   * @param \Drupal\Core\Config\ConfigFactory $config_factory
   */
  public function __construct(ConfigFactory $config_factory) {
    $this->configFactory = $config_factory;
  }

  /**
   * {@inheritdoc}
   */
  public function collectSections($directory = NULL) {
    if (empty($directory)) {
      // @todo: this needs to be changed so that it will check all the editors
      // which have the ckeditor5_sections plugin enabled.
      $directory = $this->configFactory->get('editor.editor.sections')->get('settings.templateDirectory');
    }
    $files = file_scan_directory($directory, '/.*.yml/');
    $sections = [];
    foreach ($files as $file => $fileInfo) {
      $info = \Symfony\Component\Yaml\Yaml::parseFile($file);
      $sections[$fileInfo->name] = [
        'label' => array_key_exists('label', $info) ? $info['label'] : $fileInfo->name,
        'icon' => array_key_exists('icon', $info) ? $info['icon'] : 'text',
        'template' => file_get_contents(dirname($fileInfo->uri) . '/' . $fileInfo->name . '.html'),
      ];
    }
    return $sections;
  }

}
