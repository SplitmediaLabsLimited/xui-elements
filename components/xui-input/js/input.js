/* globals Polymer */
  'use strict';

  /**
   * Private function for assigning the correct input type based on 
   * mode attribute if xui-input type is range (based on specs)
   */
  const _rangeType = function()
  {
    if (this.type === 'range')
    {
      switch(this.mode)
      {
        case 'spinner':
          this.$.input.type = 'number';
          break;
        case 'slider':
          this.$.input.type = 'range';
          break;
      }
    }
  };

  let tooltipTimeout;

  /**
   * XUI Input Class connects the published attributes and the internal
   * element that it uses to render the actual inputbox UI.
   *
   * runs during `ready`;
   *
   * @class  XUIInput
   */
  function XUIInput()
  {
    this.patternRegex       = /./;
    
    this.$.input.type = this.type;
    this.$.input.style.width = this.width + 'px';
    this.$.input.style.height = this.height + 'px';
    this.$.input.step = this.step;
    this.$.input.min = this.min;
    this.$.input.max = this.max;
    this.$.input.placeholder = this.placeholder;

    // Let's overwrite the tooltip and tooltip-description
    if (this.children.length > 0)
    {
      let tooltip = this.children[0];

      if (tooltip.localName === 'xui-tooltip')
      {
        this.tooltip = tooltip.title;
        this.tooltipdescription = tooltip.innerHTML;
      }
    }

    if (this.tooltip)
    {
      this.$.tooltip.removeAttribute('hide');
    }
  }

/**
`<xui-input></xui-input>` inserts a customized textbox into your page.

Just put an `<xui-input></xui-input>` anywhere inside your body.

You can also customize it, by adding these attributes:

 - name - the name of the textbox.

 - label - textbox label.

 - width - textbox width.

 - height - textbox height.

 - disabled - makes the textbox disabled.

 - labelstyle - inserts a custom style for the label.

 - inputstyle - inserts a custom style for the textbox.

  - Note: putting inputstyle and labelstyle attributes on the element should be in JSON format. 
  - Note: Please notice how we use singlequotes outside and doublequotes inside. 
  - prop - the name of the css property. 
  - val - the value of the css property. 
   
  Example:
    
       `<xui-input label="Input Label" inputstyle='[{ "prop": "color", "val": "red" }, { "prop": "font-size", "val": "30px" }]'></xui-input>`
   
 - icon - icon link to specify an icon beside the textbox.

 - iconheight - icon height.

 - iconwidth - icon width.

 - value - default value of the textbox. 

 - placeholder - placeholder of the textbox. 

 - readonly - makes the textbox value unchangeable but not disabled. 

Example: 

    `<xui-input label="My Input" type="text" 
    icon="https://orbitprint.com/images/colour-enhance.png" iconwidth="20" iconheight="20">
    </xui-input>`

You can also include a tooltip beside the input element by adding the `<xui-tooltip></xui-tooltip>`
tag inside the xui-input tag. example: 

    `<xui-input label="My Input" type="text">
      <xui-tooltip title="Hello World">
        Details here...
      </xui-tooltip>
    </xui-input>`

XBC Theme Demo: <a href="demos/xui-theme-xbc/demo.html" target="_blank">XBC Theme (all elements)</a>

@demo .../../demos/xui-theme-xbc/components/xui-input.html  A Cool Demo.
@demo .../../demos/xui-input/demo.html  Another Demo.

*/
Polymer({
  is: 'xui-input',

  ready: XUIInput,

  properties: {

    /** XUI input type */
    type: {
      type: String,
      value: 'text'
    },

    /** XUI input width */
    width: {
      type: Number,
      reflectToAttribute: true
    },

    /** XUI custom style for textbox */
    inputstyle: {
      type: Object,
      value: function() { return {}; },
      reflectToAttribute: true
    },

    /** XUI custom style for label */
    labelstyle: {
      type: Object,
      value: function() { return {}; },
      reflectToAttribute: true
    },
    
    /** XUI input height */
    height: {
      type: Number,
      reflectToAttribute: true
    },

    /** XUI input value*/
    value: {
      type: String,
      value: ''
    },

    /** Makes the Textbox's value unchangeable */
    readonly: {
      type: Boolean,
      value: false
    },

    /** XUI input Placeholder value */
    placeholder: {
      type: String,
      value: ''
    },

    /** 
    XUI input valid patterns. 
    XUI input will fire an `error` event 
    on blur if user input does not pass 
    the pattern test. 

    @type String/Number
    */
    pattern: {
      value: ''
    },

    /** XUI input Default label text */
    label: {
      type: String,
      value: ''
    },

    /** XUI tooltip title */
    tooltip: {
      type: String,
      value: ''
    },

    /** XUI input name */
    name: {
      type: String,
      reflectToAttribute: true
    },

    /** XUI tooltip description */
    tooltipdescription: {
      type: String,
      value: ''
    },

    /** Disables/enables the XUI input */
    disabled: {
      type: Boolean,
      reflectToAttribute: true
    },

    /** XUI input icon */
    icon: {
      type: String,
      reflectToAttribute: true
    },

    /** XUI input icon height */
    iconheight: {
      type: Number,
      reflectToAttribute: true
    },

    /** XUI input icon width */
    iconwidth: {
      type: Number,
      reflectToAttribute: true
    }
  },

  listeners:
  {

    /**
    When `xui-input` is blurred.
    
    @event blurHandler
    */
    blur: 'blurHandler'
  },

  /** Converts the value type into lowercase */
  typeChanged: function()
  {
    if (this.type !== '' &&
      this.type !== null)
    {
      this.type = this.type.toLowerCase();
    }

    _rangeType.apply(this, []);
  },


  /** Converts the mdoe into lowercase */
  modeChanged: function()
  {
    if (this.mode !== '' &&
      this.mode !== null)
    {
      this.mode = this.mode.toLowerCase();
    }

    _rangeType.apply(this, []);
  },

  /** Changes the pattern. */
  patternChanged: function()
  {
    let modifiers = '';

    if (this.pattern === 'string' && this.pattern.length > 0)
    {
      // Fetch the modifiers if it exists
      this.pattern = this.pattern.split('/');

      if (this.pattern[2])
      {
        modifiers = this.pattern[2];
      }

      this.pattern = this.pattern[1]?this.pattern[1]:this.pattern[0];
    }

    this.patternRegex = new RegExp(this.pattern, modifiers);
  },

  /** XUI input is blurred */
  blurHandler: function()
  {
    // Validate value pattern
    if (!this.patternRegex.test(this.value))
    {
      this.fire('error', {
        type: 'pattern',
        message: 'Invalid Pattern'
      });
    }
  },



  /** When tooltip is hovered */
  tooltipHover: function()
  {
    clearTimeout(tooltipTimeout);

    tooltipTimeout = setTimeout(function()
    {
      this.$.tooltip.setAttribute('show', true);
    }.bind(this), 500);
  },

  /** Tool tip is blurred */
  tooltipBlur: function()
  {
    clearTimeout(tooltipTimeout);

    this.$.tooltip.removeAttribute('show');
  },

  /** 
  Converts the inputstyle attribute JSON format into css format. 
  @param {HTMLAttribute} inputstyle attribute. 
  @return {string}, the css format. 
  */
  setStyle: function(val) {
    let myStyle = '';
    for (let i = 0; i < val.length; i++) {
      myStyle = myStyle + ' ' + this.inputstyle[i].prop + ': ' + this.inputstyle[i].val + ';';
      
    }
    if (myStyle !== '') {
      return myStyle;
    }
  },

  /** 
  Converts the labelstyle attribute JSON format into css format. 
  @param {HTMLAttribute} labelstyle attribute. 
  @return {string}, the css format. 
  */
  setLabelStyle: function(val) {
    let myStyle = '';
    for (let i = 0; i < val.length; i++) {
      myStyle = myStyle + ' ' + this.labelstyle[i].prop + ': ' + this.labelstyle[i].val + ';';
    }
    if (myStyle !== '') {
      return myStyle;
    }
  }
});
