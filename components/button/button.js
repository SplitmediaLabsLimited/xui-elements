/* globals Polymer */

(function() {
  'use strict';

  /**
   * Creates a button
   *
   * @class xui-button
   * @constructor
   *
   * @example
   *     <xui-button>text</xui-button>
   */

  Polymer({
    is: 'xui-button',
    properties: {
      disabled: {
        type: Boolean,
        reflectToAttribute: true
      }
    }
  });
})();
