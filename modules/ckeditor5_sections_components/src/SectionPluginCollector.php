<?php

namespace Drupal\ckeditor5_sections_components;

use Drupal\ckeditor5_sections\SectionsCollectorInterface;
use Drupal\ckeditor5_sections_components\Plugin\SectionPluginInterface;
use Drupal\ckeditor5_sections_components\Plugin\SectionPluginManager;
use Drupal\Core\Config\ConfigEvents;
use Drupal\Core\Config\ConfigImporterEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class SectionPluginCollector implements SectionsCollectorInterface, EventSubscriberInterface {

  /**
   * @var \Drupal\ckeditor5_sections_components\Plugin\SectionPluginManager
   */
  protected $sectionPluginManager;

  /**
   * SectionsCollector constructor.
   */
  public function __construct(SectionPluginManager $sectionPluginManager) {
    $this->sectionPluginManager = $sectionPluginManager;
  }

  /**
   * @param null $directory
   *
   * @return array
   *
   * @todo refactor to return plugins.
   */
  public function getSections($directory = NULL) {
    /** @var SectionPluginInterface[] $definitions */
    $definitions = $this->sectionPluginManager->getDefinitions();
    $sections = [];
    // Using foreach as array_map cannot maintain associate array keys.
    foreach ($definitions as $id => $plugin) {
      $sections[$id] = $plugin->getSectionInfo();
    }
    return $sections;
  }

  /**
   * {@inheritDoc}
   */
  public function getSectionDefinitions($directory = NULL) {
    $definitions = $this->sectionPluginManager->getDefinitions();
    $sections_definitions = [];
    // Using foreach as array_map cannot maintain associate array keys.
    foreach ($definitions as $id => $definition) {
      /** @var SectionPluginInterface $plugin */
      $plugin = $this->sectionPluginManager->createInstance($id);
      $sections_definitions[$id] = $plugin->extractSectionDefinition();
    }
    return $sections_definitions;
  }

  /**
   * Fires after the configuration import.
   *
   * @param \Drupal\Core\Config\ConfigImporterEvent $event
   */
  public function afterConfigImport(ConfigImporterEvent $event) {
    foreach ($event->getChangelist() as $list) {
      foreach ($list as $item) {
        if (strpos($item, 'editor.editor.') === 0) {
          // Clear sections cache if there are changes in the editor config.
          $this->sectionPluginManager->clearCachedDefinitions();
          return ;
        }
      }
    }
  }

  /**
   * {@inheritdoc}
   */
  public static function getSubscribedEvents() {
    $events = [];
    $events[ConfigEvents::IMPORT][] = ['afterConfigImport'];
    return $events;
  }
}
