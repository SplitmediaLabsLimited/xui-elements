/* globals Polymer */
'use strict';

    /**
    * Creates a checkbox
    * 
    * @example
    *     <xui-checkbox label="Checkbox Label"></xui-checkbox>
    */
Polymer({
  is: 'xui-checkbox',
  properties: {
  /**
   * Label for the checkbox
   *
   * @attribute   label
   * @type        String
   */
    label: {
      type: String,
      value: '',
      reflectToAttribute: true
    },

      /**
     * Checks/unchecks the checkbox
     *
     * @attribute   checked
     * @type        Boolean
     * @default     false
     */
    checked: {
      type: Boolean,
      reflectToAttribute: true
    },
    /**
     * Disables/enables the checkbox
     *
     * @attribute   disabled
     * @type        Boolean
     * @default     false
     */
    disabled: {
      type: Boolean,
      value: false,
      reflectToAttribute: true
    },

  },

  checkedChanged: function()
  {
    this.checked ?
        this.$.check.setAttribute('checked', true) :
        this.$.check.removeAttribute('checked');
  },

  disabledChanged: function()
  {
    this.disabled ?
        this.$.check.setAttribute('disabled', true) :
        this.$.check.removeAttribute('disabled');
  }
});