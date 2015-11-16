  'use strict';
  /**
  * Creates a option
  *
  * @class  XUIOption
  * @constructor
  * 
  * @example
  *   <xui-option></xui-option>
  */  
  Polymer({ 
  ready: function() {
    this.disabled = this.getAttribute('disabled') !== null ? true : false;
    if (this.disabled)
      this.$.option.classList.add('disabled');
  },
  properties: {
   value: {},
   label: {},
   icon: {},
   disabled: {}
  },

});