<?php

namespace Drupal\Tests\ckeditor5_sections\Kernel;

use Drupal\ckeditor5_sections\DocumentSection;
use Drupal\Tests\UnitTestCase;

/**
 * Class DocumentSectionTest
 *
 * @group ckeditor5_sections
 */
class DocumentSectionTest extends UnitTestCase {
  public function testConstructorAndAccessors() {
    $section = new DocumentSection('foo', [
      'bar' => 'baz',
    ]);

    $this->assertEquals('foo', $section->getType());
    $this->assertEquals('baz', $section->get('bar'));
    $this->assertEquals([
      'bar' => 'baz',
    ], $section->getFields());
  }

  public function testMagicSettersAndGetters() {
    $section = new DocumentSection('foo');
    $section->bar = 'baz';
    $this->assertEquals('baz', $section->bar);
  }

  public function testUnsetField() {
    $section = new DocumentSection('foo', [
      'bar' => 'baz',
    ]);
    $section->set('bar', NULL);
    $this->assertEquals([], $section->getFields());
  }

  public function testSetComplexData() {
    $section = new DocumentSection('foo');
    $section->set('bar', [
      '__type' => 'baz',
    ]);
    $value = $section->get('bar');
    $this->assertInstanceOf(DocumentSection::class, $value);
    $this->assertEquals('baz', $value->getType());
  }

  public function testSetList() {
    $section = new DocumentSection('foo');
    $section->set('bar', ['a', 'b', 'c']);
    $this->assertEquals([
      'bar' => ['a', 'b', 'c'],
    ], $section->getFields());
  }

  public function testFromPrimitiveValue() {
    $section = DocumentSection::fromValue('x');
    $this->assertEquals('x', $section);
  }

  public function testFromListValue() {
    $section = DocumentSection::fromValue([
      [
        '__type' => 'baz',
      ]
    ]);

    $this->assertTrue(is_array($section));
    $this->assertInstanceOf(DocumentSection::class, $section[0]);
    $this->assertEquals('baz', $section[0]->getType());
  }

  public function testFromComplexValue() {
    $section = DocumentSection::fromValue([
      '__type' => 'foo',
    ]);
    $this->assertInstanceOf(DocumentSection::class, $section);
    $this->assertEquals('foo', $section->getType());
  }

  public function testFromNestedValue() {
    $section = DocumentSection::fromValue([
      '__type' => 'foo',
      'bar' => [
        '__type' => 'baz',
      ],
    ]);
    $this->assertInstanceOf(DocumentSection::class, $section);
    $this->assertEquals('foo', $section->getType());
    $this->assertInstanceOf(DocumentSection::class, $section->bar);
    $this->assertEquals('baz', $section->bar->getType());
  }
}
