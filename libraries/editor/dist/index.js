/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./web/modules/custom/ckeditor5_sections/libraries/editor/src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./web/modules/custom/ckeditor5_sections/libraries/editor/src/index.js":
/*!*****************************************************************************!*\
  !*** ./web/modules/custom/ckeditor5_sections/libraries/editor/src/index.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * @file\n * The editor initialization.\n */\n(function ($, Drupal) {\n  'use strict';\n\n  var editors = {};\n  Drupal.editors.ckeditor5_sections = {\n    attach: function attach(element, format) {\n      init(element, format.editorSettings).then(function (editor) {\n        editors[element.id] = editor;\n        editor.model.document.on('change', function () {\n          $(element).val(editor.getData());\n        });\n        $(window).on('editor:dialogsave', function (e, values) {\n          editor.execute('link', values.attributes);\n        });\n      }).catch(function (error) {\n        console.error(error.stack);\n      });\n    },\n    detach: function detach(element, format, trigger) {\n      console.log('detach'); // if (trigger !== 'serialize') {\n      //   editors[element.id].toTextArea(element);\n      // }\n    },\n    onChange: function onChange(element, callback) {\n      console.log('change'); // editors[element.id].on('change', debounce(callback, 500));\n    }\n  };\n  /**\n   * Returns a promise to initialize an editor instance.\n   *\n   * @param element\n   *   The target input element.\n   * @param editorSettings\n   *   Editor settings.\n   * @returns {editor}\n   */\n\n  function init(element, editorSettings) {\n    $(element).hide();\n    var editor = document.createElement('div');\n    $(editor).insertAfter(element);\n    editor.innerHTML = $(element).val();\n    var currentCallback = null;\n    var $updateButton = $('<button/>').attr('data-media-library-widget-update', $(element).attr('id'));\n    var $updateValue = $('<input/>').attr('data-media-library-widget-value', $(element).attr('id'));\n    $updateButton.insertAfter(element);\n    $updateValue.insertAfter(element);\n    $updateButton.hide();\n    $updateValue.hide();\n    $updateButton.mousedown(function (event) {\n      event.preventDefault();\n\n      if (currentCallback) {\n        currentCallback($updateValue.val());\n        currentCallback = null;\n      }\n    });\n    return window.SectionsEditor.create(editor, {\n      masterTemplate: editorSettings.masterTemplate,\n      templates: editorSettings.templates,\n      templateAttributes: editorSettings.templateAttributes,\n      drupalMediaSelector: function drupalMediaSelector(type, operation, callback) {\n        currentCallback = callback;\n        var path = operation === 'add' ? '/admin/content/media-widget-upload' : '/admin/content/media-widget'; // Filter allowed media types.\n\n        var typeFilter = '';\n\n        if (typeof type != 'undefined') {\n          var types = type.split(' ');\n          types.forEach(function (item) {\n            typeFilter += '&media_library_allowed_types[' + item + ']=' + item;\n          });\n        }\n\n        Drupal.ajax({\n          url: path + '?media_library_widget_id=' + $(element).attr('id') + typeFilter + '&media_library_remaining=1&return_type=uuid',\n          dialogType: 'modal',\n          dialog: {\n            dialogClass: 'media-library-widget-modal',\n            heigh: '75%',\n            width: '75%',\n            title: 'Media library'\n          }\n        }).execute();\n      },\n      drupalMediaRenderer: function drupalMediaRenderer(uuid, display, callback) {\n        var display = display || 'default';\n        $.ajax('/sections/media-preview/' + uuid + '/' + display).done(callback);\n      },\n      drupalLinkSelector: function drupalLinkSelector(existingValues) {\n        var dialogSettings = {\n          title: existingValues ? Drupal.t('Edit link') : Drupal.t('Add link'),\n          dialogClass: 'editor-link-dialog'\n        };\n        var classes = dialogSettings.dialogClass ? dialogSettings.dialogClass.split(' ') : [];\n        dialogSettings.dialogClass = classes.join(' ');\n        dialogSettings.autoResize = window.matchMedia('(min-width: 600px)').matches;\n        dialogSettings.width = 'auto';\n        var AjaxDialog = Drupal.ajax({\n          dialog: dialogSettings,\n          dialogType: 'modal',\n          selector: '.ckeditor-dialog-loading-link',\n          url: Drupal.url('editor/dialog/link/sections'),\n          progress: {\n            type: 'throbber'\n          },\n          submit: {\n            editor_object: existingValues\n          }\n        });\n        AjaxDialog.execute();\n      }\n    });\n  }\n})(jQuery, Drupal);\n\n//# sourceURL=webpack:///./web/modules/custom/ckeditor5_sections/libraries/editor/src/index.js?");

/***/ })

/******/ });