/* globals Polymer */
'use strict';
Polymer({
  is: 'xui-checkbox-group',
  properties: {

    label: {
      type: String,
      value: '',
      reflectToAttribute: true
    },

    checked: {
      type: Boolean,
      value: false,
      reflectToAttribute: true
    },

    disabled: {
      type: Boolean,
      value: false,
      reflectToAttribute: true
    },

  },
});