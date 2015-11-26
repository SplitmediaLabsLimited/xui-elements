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
  }
});
