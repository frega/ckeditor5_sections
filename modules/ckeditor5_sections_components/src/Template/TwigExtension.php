<?php

namespace Drupal\ckeditor5_sections_components\Template;

use Drupal\ckeditor5_sections\DocumentSection;
use Drupal\Core\Render\RendererInterface;

/**
 * A class providing Drupal Twig extensions.
 *
 * This provides a Twig extension that registers various Drupal-specific
 * extensions to Twig, specifically Twig functions, filter, and node visitors.
 *
 * @see \Drupal\Core\CoreServiceProvider
 */
class TwigExtension extends \Twig_Extension {

  /**
   * The URL generator.
   *
   * @var \Drupal\Core\Routing\UrlGeneratorInterface
   */
  protected $urlGenerator;


  /**
   * Constructs \Drupal\Core\Template\TwigExtension.
   *
   * @param \Drupal\Core\Render\RendererInterface $renderer
   *   The renderer.
   */
  public function __construct(RendererInterface $renderer) {
    $this->renderer = $renderer;
  }

  /**
   * {@inheritdoc}
   */
  public function getFunctions() {
    return [
      new \Twig_SimpleFunction('render_section', [$this, 'renderSection']),
      new \Twig_SimpleFunction('build_section', [$this, 'buildSection']),
    ];
  }

  /**
   * @param DocumentSection|DocumentSection[] $section
   *
   * @return array render array
   */
  public function buildSection($section) {
    // @note: at the "root" of a DocumentSection we can have an array ... :/
    if (is_array($section)) {
      $render = [];
      foreach ($section as $key => $s) {
        if ($s instanceof DocumentSection) {
          $render[] = $this->buildSection($s);
        }
      }
      return $render;
    }
    if ($section instanceof DocumentSection) {
      return [
        '#theme' => 'section',
        '#section' => str_replace('section:', '', $section->getType()),
        '#document_section' => $section
      ];
    }
  }

  /**
   * @param DocumentSection|DocumentSection[] $section
   *
   * @return \Drupal\Component\Render\MarkupInterface
   */
  public function renderSection($section) {
    $build = $this->buildSection($section);
    return $this->renderer->render($build);
  }

}
