<?php

namespace Drupal\ckeditor5_sections\Plugin\Field\FieldFormatter;

use Drupal\text\Plugin\Field\FieldFormatter\TextDefaultFormatter;

/**
 * Plugin implementation of the 'sections_html' formatter.
 *
 * @FieldFormatter(
 *   id = "sections_html",
 *   label = @Translation("Sections HTML"),
 *   field_types = {
 *     "sections",
 *   }
 * )
 */
class SectionsHtmlFormatter extends TextDefaultFormatter {

}
