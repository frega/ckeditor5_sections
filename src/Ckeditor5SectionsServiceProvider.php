<?php

namespace Drupal\ckeditor5_sections;

use Drupal\Core\DependencyInjection\ContainerBuilder;
use Drupal\Core\DependencyInjection\ServiceProviderBase;

/**
 * Dynamically add services for ckeditor5_sections.
 */
class Ckeditor5SectionsServiceProvider extends ServiceProviderBase {

  /**
   * {@inheritdoc}
   */
  public function register(ContainerBuilder $container) {
    // Dynamically add conflict resolution if (core) patch introducing this
    // functionality has been applied (@see https://www.drupal.org/node/2867707).
    if (class_exists('Drupal\Core\Conflict\ConflictResolution\MergeStrategyBase')) {
      $container
        ->register('conflict_resolution.merge_sections_documents', 'Drupal\ckeditor5_sections\ConflictResolution\MergeSectionsDocuments')
        ->addTag('event_subscriber');
    }
  }
}
