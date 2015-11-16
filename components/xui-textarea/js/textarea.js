/*globals Polymer*/
'use strict';
Polymer({
    is: 'xui-textarea',

properties: {
    name: {},
    label: {},
    rows: {},
    cols: {},
    maxlength: {},
    disabled: {}
},
    /**
    * Creates a textarea
    *
    * @class  XUITextarea
    * @constructor
    * 
    * @example
    *     <xui-textarea label='Label'>text</xui-textarea>
    */
attached: function() {
   this.async(function() {
        this.maxlength = this.maxlength !== null ? 1000 : this.maxlength;
        this.disabled = this.getAttribute('disabled') !== null ? true : false;
        this.shadowRoot.children[1].children[0].innerHTML = this.innerHTML;

        if (this.disabled)
        {
            this.shadowRoot.children[1].children[0].setAttribute('disabled', true);
        }
   });
},
    
});