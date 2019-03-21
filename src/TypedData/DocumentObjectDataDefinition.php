<?php

namespace Drupal\ckeditor5_sections\TypedData;

use Drupal\Core\TypedData\DataDefinition;
use Drupal\Core\TypedData\MapDataDefinition;

/**
 * Data definition class for the DocumentObject typed data plugins.
 */
class DocumentObjectDataDefinition extends MapDataDefinition {

  /**
   * {@inheritdoc}
   */
  public static function create($object_type = NULL) {
    if (!empty($object_type)) {
      $data_type = "document_object:{$object_type}";
      $values = \Drupal::typedDataManager()->getDefinition($data_type);
      $definition = new static(is_array($values) ? $values : []);
      $definition->setDataType($data_type);
      $definition->setObjectType($object_type);
      return $definition;
    }
    return new static([]);
  }

  /**
   * {@inheritdoc}
   */
  public static function createFromDataType($data_type) {
    $parts = explode(':', $data_type);
    if ($parts[0] != 'document_object') {
      throw new \InvalidArgumentException('Data type must be in the form of "document_object:OBJECT_TYPE".');
    }
    return static::create(
      isset($parts[1]) ? $parts[1] : NULL
    );
  }

  /**
   * Sets the ObjectType constraint.
   *
   * @param string $object_type
   * @return \Drupal\ckeditor5_sections\TypedData\DocumentObjectDataDefinition
   */
  public function setObjectType($object_type) {
    return $this->addConstraint('ObjectType', $object_type);
  }

  /**
   * Returns the current ObjectType constraint.
   *
   * @return string|NULL
   */
  public function getObjectType() {
    return isset($this->definition['constraints']['ObjectType']) ? $this->definition['constraints']['ObjectType'] : NULL;
  }

  /**
   * {@inheritdoc}
   */
  public function getPropertyDefinitions() {
    if (!isset($this->propertyDefinitions)) {
      $this->propertyDefinitions = [];
      if ($object_type = $this->getObjectType()) {
        $templates = $this->getAvailableTemplates();
        $object_types = [];
        foreach ($templates as $template) {
          $object_types = array_merge($object_types, $this->getObjectsDefinitionFromTemplate($template['template']));
        }
        if (!empty($object_types[$object_type])) {
          foreach ($object_types[$object_type]['fields'] as $field_name => $field) {
            $this->propertyDefinitions[$field_name] = DataDefinition::create($field['type'])
              ->setLabel($field['label']);
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
   * Extracts the object definitions (fields and possibly other metadata) from
   * a template.
   *
   * @param string $template
   * @return array
   */
  protected function getObjectsDefinitionFromTemplate($template) {
    // @todo: Properly implement this method.
    return[
      'document_object:teaser' => [
        'fields' => [
          'layout' => [
            'label' => 'layout',
            'type' => 'string,'
          ],
          'image' => [
            'label' => 'image',
            'type' => 'document_object:image',
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
            'type' => 'document_object:button'
          ],
          'content' => [
            'label' => 'content',
            'type' => 'string',
          ]
        ],
      ],
      'document_object:image' => [
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
      'document_object:button' => [
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
