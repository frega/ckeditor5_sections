<?php

namespace Drupal\ckeditor5_sections\TypedData;

use Drupal\Core\TypedData\DataDefinition;
use Drupal\Core\TypedData\ListDataDefinition;
use Drupal\Core\TypedData\MapDataDefinition;

/**
 * Data definition class for the DocumentSection typed data plugins.
 */
class DocumentSectionDataDefinition extends MapDataDefinition {

  /**
   * {@inheritdoc}
   */
  public static function create($section_type = NULL) {
    if (!empty($section_type)) {
      $data_type = "section:{$section_type}";
      $values = \Drupal::typedDataManager()->getDefinition($data_type);
      $definition = new static(is_array($values) ? $values : []);
      $definition->setDataType($data_type);
      $definition->setSectionType($section_type);
      return $definition;
    }
    return new static([]);
  }

  /**
   * {@inheritdoc}
   */
  public static function createFromDataType($data_type) {
    $parts = explode(':', $data_type);
    if ($parts[0] != 'section') {
      throw new \InvalidArgumentException('Data type must be in the form of "section:SECTION_TYPE".');
    }
    return static::create(
      isset($parts[1]) ? $parts[1] : NULL
    );
  }

  /**
   * Sets the SectionType constraint.
   *
   * @param string $section_type
   * @return \Drupal\ckeditor5_sections\TypedData\DocumentSectionDataDefinition
   */
  public function setSectionType($section_type) {
    return $this->addConstraint('SectionType', $section_type);
  }

  /**
   * Returns the current SectionType constraint.
   *
   * @return string|NULL
   */
  public function getSectionType() {
    return isset($this->definition['constraints']['SectionType']) ? $this->definition['constraints']['SectionType'] : NULL;
  }

  /**
   * {@inheritdoc}
   */
  public function getPropertyDefinitions() {
    if (!isset($this->propertyDefinitions)) {
      $this->propertyDefinitions = [];
      if ($section_type = $this->getSectionType()) {
        $templates = $this->getAvailableTemplates();
        $section_types = [];
        foreach ($templates as $template) {
          $section_types = array_merge($section_types, $this->getSectionsDefinitionFromTemplate($template['template']));
        }
        if (!empty($section_types[$section_type])) {
          foreach ($section_types[$section_type]['fields'] as $field_name => $field) {
            if (!empty($field['cardinality']) && $field['cardinality'] === 'multiple') {
              $this->propertyDefinitions[$field_name] = ListDataDefinition::create($field['type'])
                ->setLabel($field['label']);
            }
            else {
              $this->propertyDefinitions[$field_name] = DataDefinition::create($field['type'])
                ->setLabel($field['label']);
            }
          }
        }
      }
    }
    return $this->propertyDefinitions;
  }

  /**
   * Returns an array with all the available templates from the system.
   *
   * @return array
   *  An array of all the available sections.
   */
  protected function getAvailableTemplates() {
    return \Drupal::getContainer()->get('ckeditor5_sections.sections_collector')->collectSections();
  }

  /**
   * Extracts the sections definitions (fields and possibly other metadata) from
   * a template.
   *
   * @param string $template
   * @return array
   */
  protected function getSectionsDefinitionFromTemplate($template) {
    // @todo: Properly implement this method.
    return[
      'section:teaser' => [
        'fields' => [
          'layout' => [
            'label' => 'layout',
            'type' => 'string,'
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
    ];
  }
}
