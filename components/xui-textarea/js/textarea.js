/*globals Polymer*/
'use strict';

/**
`<xui-textarea></xui-textarea>` inserts a customized textarea into your page.
Just put an `<xui-textarea></xui-textarea>` anywhere inside your body.

You can also customize it, by adding these attributes:

 - name - range name.

 - rows - number of rows.

 - cols - number of columns.

 - disabled - to disabled the range.

 - maxlength - maximum number of characters.

 - icon - icon link to specify an icon beside the range.

 - iconheight - icon height.

 - iconwidth - icon width.

 - label - range text label. 

 - readonly - makes the textarea value unchangeable but not disabled. 

 - placeholder - Placeholder of the textarea. 

 - resize - 
    - none - cannot be resized
    - horizontal - can be resize horizontally only
    - verical - can be resize vertically only

Example: 

    `<xui-textarea resize="horizontal" name = "textarea" label = "Description" rows = "10" cols = "100" maxlength = "100"  
    icon="https://orbitprint.com/images/colour-enhance.png" iconwidth="16" iconheight="16">
    The quick brown fox jumps over the lazy dogs.
    </xui-textarea>`

@demo .../../demos/xui-theme-xbc/components/xui-textarea.html  A Cool Demo.
@demo .../../demos/xui-textarea/demo.html  Another Demo.
 */
Polymer({
  is: 'xui-textarea',

properties: {

  /** Name of the textarea */
  name: {
    type: String,
    reflectToAttribute: true
  },

  /** Make the Textarea's value unchangeable */
  readonly: {
    type: Boolean,
    value: false
  },

  /** Label of the textarea */
  label: {
    type: String,
    reflectToAttribute: true
  },

  /** Placeholder of the textarea */
  placeholder: {
    type: String,
    reflectToAttribute: true
  },

  /** Number of rows */
  rows: {
    type: Number,
    reflectToAttribute: true
  },

  /** Number of columns */
  cols: {
    type: Number,
    reflectToAttribute: true
  },

  /** Maximum number of characters */
  maxlength: {
    type: Number,
    reflectToAttribute: true
  },

  /** Enables/Disables the textarea */
  disabled: {
    type: Boolean,
    reflectToAttribute: true
  },

  /** Resize property of the textarea can be none, horizontal, vertical */
  resize: {
    type: String,
    reflectToAttribute: true
  }
},

  /**
  * Initiate the default property values and apply to the element. 
  * 
  */
  attached: function() {
     this.async(function() {
      this.$.textarea.style.resize = this.resize;
      this.maxlength = this.maxlength !== null ? 1000 : this.maxlength;
      this.disabled = this.getAttribute('disabled') !== null ? true : false;
      this.$.textarea.innerHTML = this.innerHTML;

      if (this.disabled)
      {
        this.shadowRoot.children[1].children[0].setAttribute('disabled', true);
      }
     });
  },
  
});