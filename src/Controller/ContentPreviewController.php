<?php

namespace Drupal\ckeditor5_sections\Controller;

use Symfony\Component\HttpFoundation\Response;

/**
 * Class provides node preview controller.
 */
class ContentPreviewController extends MediaPreviewController {

  /**
   * Media preview callback.
   *
   * @param string $uuid
   *   UUID of the node entity.
   * @param string $display
   *   The display to use.
   *
   * @return \Symfony\Component\HttpFoundation\Response
   *   Response.
   *
   * @throws \Drupal\Core\Entity\EntityStorageException
   */
  public function preview($uuid, $display) {
    $node = $this->entityRepository->loadEntityByUuid("node", $uuid);
    if (!$node) {
      return "";
    }
    $build = $this->entityTypeManager()->getViewBuilder('node')->view($node, $display ?? 'default');
    $response = new Response();
    $response->setContent($this->renderer->render($build));
    return $response;
  }

}
