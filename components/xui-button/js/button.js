/* globals Polymer */
'use strict';

/**
  `<xui-button>Text</xui-button>` inserts a customized button into your page.

  Just put an `<xui-button></xui-button>` anywhere inside your body.

You can also customize it, by adding these attributes:

 - name - the name of the button.

 - type - button type.

  - `button`  The button is a clickable button
  - `submit`  The button is a submit button (submits form-data)
  - `reset` The button is a reset button (resets the form-data to its initial values)

 - disabled - to make the button disabled.

 - width - button width.

 - height - button height.

 - custstyle - custom style for button.

  - Note: putting custstyle attributes on the element should be in JSON format. 
  - Note: Please notice how we use singlequotes outside and doublequotes inside. 
  - prop - the name of the css property. 
  - val - the value of the css property. 
   
  Example:
    
       <xui-button custstyle='[{ "prop": "color", "val": "red" }, { "prop": "font-size", "val": "30px"}]'>Edit Script</xui-button>
   
 - icon - icon link to specify an icon inside the button.

 - iconheight - icon height.

 - iconwidth - icon width.

Example: 

    `<xui-button name="search" type="button" icon="https://cdn1.iconfinder.com/data/icons/free-98-icons/32/search-128.png" iconwidth="16" iconheight="16" disabled>Search</xui-button>`

@demo .../../demos/xui-theme-xbc/components/xui-button.html  Cool Demo.
@demo .../../demos/xui-button/demo.html  Another Demo.
*/

Polymer({
  is: 'xui-button',

  ready: function() {
    this.$.button.style.width = this.width + 'px';
    this.$.button.style.height = this.height + 'px';
  },

  properties: {

    /** Disables/enables the button */
    disabled: {
      type: Boolean,
      reflectToAttribute: true
    },

    /** Inserts a custom css style to the button */
    custstyle: {
      type: Object,
      value: function() { return {}; },
      reflectToAttribute: true
    },

    /** Button's width */
    width: {
      type: Number,
      reflectToAttribute: true
    },

    /** Button's height */
    height: {
      type: Number,
      reflectToAttribute: true
    },

    /** Button's icon */
    icon: {
      type: String,
      reflectToAttribute: true
    },

    /** Button's icon height */
    iconheight: {
      type: Number,
      reflectToAttribute: true
    },

    /** Button's icon width */
    iconwidth: {
      type: Number,
      reflectToAttribute: true
    },

    /** Button's name */
    name: {
      type: String,
      reflectToAttribute: true
    }
  },

  /** 
  Converts the custstyle attribute JSON format into css format. 
  @param {HTMLAttribute} custstyle attribute. 
  @return {string}, the css format. 
  */
  setStyle: function(val) {
    let myStyle = '';
    for (let i = 0; i < val.length; i++) {
    console.log(this.custstyle);
      myStyle = myStyle + ' ' + this.custstyle[i].prop + ': ' + this.custstyle[i].val + ';';
    }
    if (myStyle !== '') {
      return myStyle;
    }
  }
});
