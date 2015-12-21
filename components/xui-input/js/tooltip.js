/* globals Polymer */
   'use strict';

/**
`<xui-tooltip></xui-tooltip>` inserts a customized tooltip into your page.

Just put an `<xui-tooltip></xui-tooltip>` anywhere inside your body.

You can also customize it, by adding these attributes:

 - title - tooltip Title.

 - tooltipdescription - tooltip description.

 - disabled - makes the tooltip disabled.

 - icon - icon link to specify an icon beside the tooltip.

 - iconheight - icon height.

 - iconwidth - icon width.

Example: 

    `<xui-tooltip title="Content" icon="https://orbitprint.com/images/colour-enhance.png" iconwidth="15" iconheight="15">
       Lorem ipsum dolor sit amet, 
     </xui-tooltip>`

XBC Theme Demo: <a href="demos/xui-theme-xbc/demo.html" target="_blank">XBC Theme (all elements)</a>

@demo .../../demos/xui-theme-xbc/components/xui-tooltip.html  Cool Demo.
*/
Polymer({
  is: 'xui-tooltip',

  ready: function() {
    this.tooltipdescription = this.innerHTML;
  },

  listeners: {

    /**
    When the tooltip was hovered
    
    @event toolHover
    */
    'tooltip.mouseover': 'toolHover'
  },

  properties: {

    /** XUI Tooltip title */
    title: {
      type: String,
      value: '',
      reflectToAttribute: true
    },


    /** XUI Tooltip description */
    tooltipdescription: {
      type: String,
      value: ''
    },

    /** Disables/enables the tooltip */
    disabled: {
      type: Boolean,
      reflectToAttribute: true
    },

    /** Tooltip's icon */
    icon: {
      type: String,
      reflectToAttribute: true
    },

    /** Tooltip's icon height */
    iconheight: {
      type: Number,
      reflectToAttribute: true
    },

    /** Tooltip's icon width */
    iconwidth: {
      type: Number,
      reflectToAttribute: true
    }
  },

  /** Shows the tooltip description and title */
  toolHover: function() {
    this.$.tooltip.style.cursor = 'pointer';
    this.async(function(){
      this.$.tooltip.style.cursor = 'default';
    }, 500);
  }
});
