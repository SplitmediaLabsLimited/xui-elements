/*global Polymer, alert*/
'use strict';
  /**
  * Creates a select
  *
  * @class  XUISelect
  * @constructor
  * 
  * @example
  *   <xui-select>options</xui-select>
  */  
Polymer({ 
  ready: function() {
    this.$.select.innerHTML = this.$.select.innerHTML + this.innerHTML;
    this.shadowRoot.addEventListener('click', this.openMenu.bind(this));
  },

  properties: {
     name: {},
     multiple: {},
     disabled: {}
  },

  openMenu: function()
  {
    alert('test');
  }
});