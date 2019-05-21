<?php

namespace Drupal\ckeditor5_sections_token\Plugin\MentionProvider;

use Drupal\ckeditor5_sections\MentionProvider\BaseMentionProvider;
use Drupal\ckeditor5_sections\MentionProvider\MentionProviderItem;
use Drupal\Component\Utility\Html;
use Drupal\Core\Entity\ContentEntityInterface;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\Core\Render\BubbleableMetadata;
use Drupal\Core\Utility\Token;
use Drupal\filter\FilterProcessResult;
use Drupal\token\TokenEntityMapperInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Provides a filter to render media elements.
 *
 * @MentionProvider(
 *   id = "token",
 *   prefix = "@",
 *   title = @Translation("Token mentions provider"),
 *   description = @Translation("Provides tokens."),
 *   type = Drupal\filter\Plugin\FilterInterface::TYPE_TRANSFORM_REVERSIBLE
 * )
 */
class TokenMentionProvider extends BaseMentionProvider implements ContainerFactoryPluginInterface {
  /**
   * Token.
   *
   * @var \Drupal\token\Token
   */
  protected $token;

  /**
   * Token entity mapper.
   *
   * @var \Drupal\token\TokenEntityMapperInterface
   */
  protected $tokenEntityMapper;

  /**
   * {@inheritdoc}
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, Token $token, TokenEntityMapperInterface $token_entity_mapper) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->token = $token;
    $this->tokenEntityMapper = $token_entity_mapper;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->get('token'),
      $container->get('token.entity_mapper')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function query($queryText) {
    $queryText = mb_strtolower($queryText);
    if (strpos($queryText, ':') !== FALSE) {
      list($queryGroup, $queryText) = explode(':', $queryText);
    }
    else {
      $queryGroup = FALSE;
    }

    $info = $this->token->getInfo();
    $results = [];
    $prefix = $this->getPluginDefinition()['prefix'];
    foreach ($info['tokens'] as $group => $tokens) {
      if (!$queryGroup || $queryGroup == $group) {
        foreach ($tokens as $token_key => $token) {
          if (
            // Matching the group name.
            ($queryText && mb_strpos($group, $queryText) !== FALSE) ||
            // Matching the token key.
            ($queryText && mb_strpos($token_key, $queryText) !== FALSE) ||
            // Or match all in the group, if there's a direct match on group.
            (empty($queryText) && $group === $queryGroup)
          ) {
            $id = $prefix . $group . ':' . $token_key;
            $results[$id] = new MentionProviderItem($id, (string) $token['name']);
          }
        }
      }
    }
    // @todo: sort and make sure only the most relevant (10?) are returned.
    return array_values($results);
  }

  /**
   * {@inheritdoc}
   */
  public function getValidMentionCharacters() {
    return ':-_a-zA-Z0-9À-ž';
  }

  /**
   * Returns the drupal token for mention value.
   *
   * @param string $mention
   *   Mention (e.g. "@example-token")
   *
   * @return string
   *   Token (e.g. "[example-token]").
   */
  public function getTokenFromMentionValue($mention) {
    if (substr($mention, 0, 1) === $this->getMentionPrefix()) {
      $mentionValue = substr($mention, 1);
    }
    else {
      $mentionValue = $mention;
    }

    return '[' . $mentionValue . ']';
  }

  /**
   * {@inheritdoc}
   */
  public function process($text, $langcode) {
    if (strpos($text, 'data-mention=') === FALSE) {
      return new FilterProcessResult($text);
    }

    $dom = Html::load($text);
    $xpath = new \DOMXPath($dom);
    $result = new FilterProcessResult();
    /** @var \DOMElement $element */
    foreach ($xpath->query($this->getXpathQueryForMentionElements()) as $element) {
      $element->textContent = $this->getTokenFromMentionValue($element->getAttribute('data-mention'));
      // @todo: clarify if we really want to strip these attributes?
      $element->removeAttribute('data-mention');
      $element->removeAttribute('class');
      // @todo: do we want to *convert* the <span>-element to something else?
    }

    // Serialize the altered DOM back to string representation.
    $text = Html::serialize($dom);

    // @note: this is copied from drupal/token_filter.
    $entity = drupal_static('ckeditor5_sections_token_filter_entity', NULL);
    if (!is_null($entity) && $entity instanceof ContentEntityInterface) {
      $token_type = $this->tokenEntityMapper->getTokenTypeForEntityType($entity->getEntityTypeId());
      $data[$token_type] = $entity;
    }

    // Prepare to gather cache-related metadata.
    $metadata = new BubbleableMetadata();
    $result->setProcessedText($this->token->replace($text, $data, ['clear' => TRUE], $metadata));

    // And pass the gathered cache-related metadata to the result.
    $result->addCacheableDependency($metadata);
    return $result;
  }

}
