<?php

namespace Drupal\ckeditor5_sections;

use Drupal\Core\DependencyInjection\ContainerInjectionInterface;
use Drupal\Core\StringTranslation\StringTranslationTrait;
use Symfony\Component\DependencyInjection\ContainerInterface;

class MentionProviderPermissions implements ContainerInjectionInterface {
  use StringTranslationTrait;

  /**
   * Mention Provider plugin manager.
   *
   * @var \Drupal\ckeditor5_sections\MentionProviderPluginManager
   */
  protected $mentionProviderPluginManager;

  /**
   * MentionProviderController constructor.
   *
   * @param \Drupal\ckeditor5_sections\MentionProviderPluginManager $mentionProviderPluginManager
   *   MentionProviderPluginManager.
   */
  public function __construct(MentionProviderPluginManager $mentionProviderPluginManager) {
    $this->mentionProviderPluginManager = $mentionProviderPluginManager;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('plugin.manager.ckeditor5_sections.mention_provider')
    );
  }

  /**
   * Get permissions for CKEditor5 Sections Mention Provider.
   *
   * @return array
   *   Permissions array.
   *
   * @throws
   */
  public function permissions() {
    $permissions = [];

    foreach ($this->mentionProviderPluginManager->getDefinitions() as $plugin_id => $definition) {
      /** @var \Drupal\ckeditor5_sections\MentionProvider\MentionProviderInterface $mentionProvider */
      $mentionProvider = $this->mentionProviderPluginManager->createInstance($plugin_id);
      $permissions += [
        'access ckeditor5 sections mention provider ' . $plugin_id => [
          'title' => $this->t('Access CKEditor5 Sections mention provider %title', array('%title' => $mentionProvider->getPluginDefinition()['title'])),
        ]
      ];
    }

    return $permissions;
  }

}
