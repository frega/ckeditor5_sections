<?php

namespace Drupal\Tests\ckeditor5_sections\Unit;

use Drupal\ckeditor5_sections\DocumentParser;
use Drupal\Tests\UnitTestCase;

/**
 * Tests for the Document parser class.
 */
class DocumentParserTest extends UnitTestCase {

  /**
   * @covers \Drupal\ckeditor5_sections\DocumentParser::extractSectionDefinitions
   * @dataProvider extractObjectDefinitionsProvider
   */
  public function testExtractObjectDefinitions($template, $result) {
    $documentParser = new DocumentParser();
    $this->assertArrayEquals($result, $documentParser->extractSectionDefinitions($template));
  }

  /**
   * Data provider for testExtractObjectDefinitions().
   */
  public function extractObjectDefinitionsProvider() {
    return [
      [
        <<<XML
<div class="teaser" itemtype="teaser" data-layout="">
  <div ck-type="drupal-media"
       data-media-type="image"
       data-media-uuid=""
       itemprop="image"
       itemtype="image"
       class="teaser__image"
  ></div>
  <div class="teaser__content">
    <h2 ck-type="text"
        itemprop="headline"
        class="teaser__headline"
    >Headline placeholder</h2>
    <div ck-type="text"
         itemprop="text"
         class="teaser__text"
    >Teaser content placeholder
    </div>
    <div itemprop="links" ck-type="container" ck-contains="button">
    </div>
    <a ck-type="button"
       itemtype="button"
       itemprop="link"
       class="teaser__link"
    >Link text placeholder</a>
  </div>
</div>
XML,
        [
          'section:teaser' => [
            'fields' => [
              'layout' => [
                'label' => 'layout',
                'type' => 'string'
              ],
              'image' => [
                'label' => 'image',
                'type' => 'section:image',
              ],
              'headline' => [
                'label' => 'headline',
                'type' => 'string'
              ],
              'text' => [
                'label' => 'text',
                'type' => 'string'
              ],
              'links' => [
                'label' => 'links',
                'type' => 'section',
                'cardinality' => 'multiple',
              ],
              'link' => [
                'label' => 'link',
                'type' => 'section:button'
              ],
              'content' => [
                'label' => 'content',
                'type' => 'string',
              ]
            ],
          ],
          'section:image' => [
            'fields' => [
              'mediaType' => [
                'label' => 'mediaType',
                'type' => 'string',
              ],
              'mediaUuid' => [
                'label' => 'mediaUuid',
                'type' => 'string',
              ],
              'content' => [
                'label' => 'content',
                'type' => 'string',
              ]
            ],
          ],
          'section:button' => [
            'fields' => [
              'content' => [
                'label' => 'content',
                'type' => 'string',
              ]
            ],
          ],
        ]
      ]
    ];
  }
}
