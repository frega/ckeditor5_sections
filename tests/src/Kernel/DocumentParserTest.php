<?php

namespace Drupal\Tests\ckeditor5_sections\Unit;

use Drupal\ckeditor5_sections\Normalizer\DocumentSectionNormalizer;
use Drupal\KernelTests\KernelTestBase;

/**
 * Tests for the Document parser class.
 */
class DocumentParserTest extends KernelTestBase {

  public static $modules = [
    'ckeditor5_sections',
    'editor',
    'filter',
    'serialization'
  ];

  /**
   * @var \Symfony\Component\Serializer\Normalizer\NormalizerInterface
   */
  protected $normalizer;

  protected function setUp() {
    parent::setUp();
    $this->installConfig(['ckeditor5_sections']);
  }


  protected function loadTestAssets($directory) {
    $data = [];
    $dir = dirname(__FILE__) . '/' . $directory;
    foreach (scandir($dir) as $file) {
      if (substr($file, -5) !== '.json') {
        continue;
      }

      $name = substr($file, 0, -5);
      $data[$name] = [
        file_get_contents($dir . '/' . $name . '.html'),
        json_decode(file_get_contents($dir . '/' . $file), TRUE),
      ];
    }
    return $data;
  }

  /**
   * @covers \Drupal\ckeditor5_sections\DocumentParser::extractSectionDefinitions
   * @dataProvider extractSectionDefinitionsProvider
   */
  public function testExtractSectionDefinitions($template, $result) {
    $documentParser = $this->container->get('ckeditor5_sections.document_parser');
    $this->assertEquals($result, $documentParser->extractSectionDefinitions($template));
  }

  /**
   * Data provider for testExtractSectionDefinitions().
   */
  public function extractSectionDefinitionsProvider() {
    return $this->loadTestAssets('assets/definitions');
  }

  /**
   * @covers \Drupal\ckeditor5_sections\DocumentParser::extractSectionData
   * @dataProvider extractSectionDataProvider
   */
  public function testExtractSectionData($document, $result) {
    /** @var \Symfony\Component\Serializer\Normalizer\NormalizerInterface $normalizer */
    $normalizer = new DocumentSectionNormalizer();;
    $documentParser = $this->container->get('ckeditor5_sections.document_parser');
    /** @var \Drupal\ckeditor5_sections\DocumentSection $data */
    $data = $documentParser->extractSectionData($document)[0];
    $this->assertEquals($result, $normalizer->normalize($data, 'json'));
  }

  /**
   * @covers \Drupal\ckeditor5_sections\DocumentParser::extractSectionData
   * @dataProvider extractSectionDataProvider
   */
  public function testNormalization($document, $result) {
    /** @var \Symfony\Component\Serializer\Normalizer\NormalizerInterface $normalizer */
    $normalizer = new DocumentSectionNormalizer();;
    $documentParser = $this->container->get('ckeditor5_sections.document_parser');
    /** @var \Drupal\ckeditor5_sections\DocumentSection $data */
    $data = $documentParser->extractSectionData($document)[0];
    $this->assertEquals($data, $normalizer->denormalize($normalizer->normalize($data)));
  }

  public function extractSectionDataProvider() {
    return $this->loadTestAssets('assets/data');
  }

}
