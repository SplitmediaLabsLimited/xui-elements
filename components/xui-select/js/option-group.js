/*global Polymer, console*/
'use strict';
/**
* Creates a option group
*
* @class  XUIOptionGroup
* @constructor
* 
* @example
*   <xui-option-group></xui-option-group>
*/
Polymer({ 
  ready: function() {
    this.disabled = this.getAttribute('disabled') !== null ? true : false;
    if (this.disabled)
    {
      this.$.option.classList.add('disabled');
      for (var i = 0; i < this.$.option.children.length; i++)
      {
        console.log(this.$.option.children[i]);
      }
    }
    this.$.group.innerHTML = this.innerHTML;
  },
  
  properties: {
     label: {},
     icon: {},
     disabled: {}
  },
});