/**
 * @file
 * The editor initialization.
 */
var editors = {};

(function ($, Drupal) {

  'use strict';


  Drupal.editors.ckeditor5_sections = {
    attach: function attach(element, format) {
      init(element, format).then(editor => {
        editors[element.id] = editor;
        editor.model.document.on('change', () => {
          $(element).val(editor.getData());
          $(element).attr('data-editor-value-is-changed', 'true');
        });
        // Quick hack to attach inspector
        setTimeout(function() { CKEditorInspector.attach( editor ); });
      }).catch(error => {
        console.error(error.stack);
      });
    },
    detach: function (element, format, trigger) {
      if (trigger !== 'serialize') {
        editors[element.id].destroy();
      }
    },
    onChange: function (element, callback) {
    }
  };

  /**
   * Returns a promise to initialize an editor instance.
   *
   * @param element
   *   The target input element.
   * @param format
   *   Text format settings.
   * @returns {editor}
   */
  function init(element, format) {
    var editorSettings = format.editorSettings;
    $(element).hide();

    var editor = document.createElement('div');

    editor.addEventListener('ck-editor:show-errors', function (event) {
      event.respond(drupalSettings && drupalSettings.sections && drupalSettings.sections.errors);
    });

    editor.classList.add('ck-editor');
    $(editor).insertAfter(element);
    editor.innerHTML = $(element).val();

    var currentCallback = null;

    var $updateButton = $('<button/>').attr('data-media-library-widget-update', $(element).attr('id'));
    var $updateValue = $('<input/>').attr('data-media-library-widget-value', $(element).attr('id'));

    $updateButton.insertAfter(element);
    $updateValue.insertAfter(element);

    $updateButton.hide();
    $updateValue.hide();

    $updateButton.mousedown(function (event) {
      event.preventDefault();
      if (currentCallback) {
        currentCallback($updateValue.val());
        currentCallback = null;
      }
    });

    $(window).on('editor:dialogsave', function (e, values) {
      if (values.attributes.fragment && values.attributes.fragment !== '_none') {
        values.attributes.href += '#' + values.attributes.fragment;
      }
      currentCallback(values.attributes);
    });

    editor.addEventListener('ck-editor:available-sections', function (event) {
      var sections = Object.keys(editorSettings.templates).map(id => ({
        id: id,
        label: editorSettings.templates[id].label,
        icon: editorSettings.templates[id].icon
      }));
      event.respond(sections)
    });

    var handleSelect = function (event, operation) {

      if (!(event.detail.type && event.detail.type.includes(':'))) {
        return;
      }

      var type = event.detail.type.split(':')[0];
      var bundle = event.detail.type.split(':')[1];

      currentCallback = function (response) {
        event.respond(response);
        currentCallback = null;
      };

      var typeFilter = '';
      var selectedType = '';

      if (type === 'media') {
        var path = (operation === 'add') ? 'sections/dialog?upload_form=1' : 'sections/dialog?upload_form=0';

        // Filter allowed media types.
        if (typeof bundle != 'undefined') {
          bundle.split(' ').forEach((item) => {
            if (!selectedType) {
              selectedType = item;
            }
            typeFilter += '&media_library_allowed_types[' + item + ']=' + item;
          });
        }

        Drupal.ajax({
          url: Drupal.url(path + '&field_id=' + $(element).attr('id') + typeFilter + '&return_type=uuid&media_library_selected_type=' + selectedType + '&media_library_remaining=1'),
          dialogType: 'modal',
          dialog: {
            dialogClass: 'media-library-widget-modal',
            heigh: '75%',
            width: '75%',
            title: 'Media library',
          }
        }).execute();
      }
      else {

        // Filter allowed node types.
        if (typeof bundle != 'undefined') {
          bundle.split(' ').forEach((item) => {
            if (!selectedType) {
              selectedType = item;
            }
            typeFilter += '&content_library_allowed_types[' + item + ']=' + item;
            typeFilter += '&media_library_allowed_types[' + item + ']=' + item;
          });
        }

        Drupal.ajax({
          url: Drupal.url('admin/content/content-widget?field_id=' + $(element).attr('id') + '&content_library_widget_id=' + $(element).attr('id') + typeFilter + '&return_type=uuid&media_library_selected_type=' + selectedType + '&media_library_remaining=1' ),
          dialogType: 'modal',
          dialog: {
            dialogClass: 'media-library-widget-modal',
            heigh: '75%',
            width: '75%',
            title: 'Content library',
          }
        }).execute();
      }

    };

    editor.addEventListener('ck-editor:media-select', function (event) {
      handleSelect(event, 'select');
    });

    editor.addEventListener('ck-editor:media-upload', function (event) {
      handleSelect(event, 'add');
    });

    editor.addEventListener('ck-editor:media-edit', function (event) {
      handleSelect(event, 'edit');
    });

    editor.addEventListener('ck-editor:media-preview', function (event) {
      if (!(event.detail.type && event.detail.type.includes(':'))) {
        return;
      }

      var type = event.detail.type.split(':')[0];

      $.ajax(Drupal.url('sections/' + (type === 'media' ? 'media' : 'content') + '-preview/' + event.detail.uuid + '/' + event.detail.display || 'default' ))
          .done(function (preview) { event.respond(preview); });
    });

    editor.addEventListener('ck-editor:select-link', function (event) {
      currentCallback = function (response) {
        event.respond(response);
        currentCallback = null;
      };

      var dialogSettings = {
        title: event.detail.target ? Drupal.t('Edit link') : Drupal.t('Add link'),
        dialogClass: 'editor-link-dialog'
      };

      var editorObject = event.detail;
      if (editorObject['link-target']) {
        editorObject['link-target'] = editorObject['link-target'].split('#')[0];
      }

      editorObject['href'] = editorObject['link-target'];

      var classes = dialogSettings.dialogClass ? dialogSettings.dialogClass.split(' ') : [];
      dialogSettings.dialogClass = classes.join(' ');
      dialogSettings.autoResize = window.matchMedia('(min-width: 600px)').matches;
      dialogSettings.width = 'auto';

      var AjaxDialog = Drupal.ajax({
        dialog: dialogSettings,
        dialogType: 'modal',
        selector: '.ckeditor-dialog-loading-link',
        url:  Drupal.url('editor/dialog/link/' + format.format),
        progress: { type: 'throbber' },
        submit: {
          editor_object: editorObject
        }
      });
      AjaxDialog.execute();
    });


    window.ckeditor5_sections_builds = window.ckeditor5_sections_builds || {};

    if (!window.ckeditor5_sections_builds[editorSettings.editorBuild]) {
      console.error('Editor build ' + editorSettings.editorBuild + " not available.");
      return;
    }

    return window.ckeditor5_sections_builds[editorSettings.editorBuild].create(editor, Object.assign({
      masterTemplate: element.getAttribute('data-sections-template'),
      templates: editorSettings.templates,
      templateAttributes: editorSettings.templateAttributes,
      templateSession: editorSettings.templateSession,
      mention: prepareMentionSettings(editorSettings.mention)
    }, editorSettings.advanced || {}));
  }

  /**
   * Registry of factory functions returning a item renderer.
   *
   * @type {{}}
   */
  Drupal.editors.ckeditor5_sections.mentionItemRendererFactories = Drupal.editors.ckeditor5_sections.mentionItemRendererFactories || {};

  /**
   * Returns a item renderer.
   *
   * @param mentionFeed
   * @returns {function(*): HTMLSpanElement}
   */
  Drupal.editors.ckeditor5_sections.mentionItemRendererFactories.templateItemRenderer = function(mentionFeed) {
    var template = mentionFeed.template;

    return function(item) {
      var span = document.createElement( 'span' );
      var values = {};
      for (var property in item) {
        if (item.hasOwnProperty(property) && item[property] !== null) {
          values['@' + property] = item[property];
          values['%' + property] = item[property];
        }
      }
      span.innerHTML = Drupal.t(template, values);
      return span;
    }
  };

  /**
   * Converts strings representing URLs to functions fetching JSON from Drupal endpoint. Adds custom item renderer if
   * template property present.
   *
   * @param mentionSettings
   * @returns {{feeds}}
   */
  function prepareMentionSettings(mentionSettings) {
    if (mentionSettings && mentionSettings.feeds && Array.isArray(mentionSettings.feeds)) {
      mentionSettings.feeds.forEach(function(mentionFeed) {
        // If we have a string let's wrap it in a URL fetcher.
        if (typeof mentionFeed.feed === 'string') {
          var url = mentionFeed.feed;
          mentionFeed.feed = function(query) {
            return new Promise(function(resolve, reject) {
              $.getJSON(url, {
                'q': query
              }, function(data) {
                resolve(data);
              }).fail(function(e) {
                reject(e);
              });
            });
          };
        }

        // If there's template defined in the mention feed definition use the template item renderer.
        if (typeof mentionFeed.template === 'string' && mentionFeed.template) {
          mentionFeed.itemRenderer = Drupal.editors.ckeditor5_sections.mentionItemRendererFactories.templateItemRenderer(mentionFeed);
        }
      });
    }
    return mentionSettings;
  };

}(jQuery, Drupal));
