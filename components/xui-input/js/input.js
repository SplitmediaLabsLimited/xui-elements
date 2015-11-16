/* globals Polymer */
  'use strict';

  /**
   * Private function for assigning the correct input type based on 
   * mode attribute if xui-input type is range (based on specs)
   */
  var _rangeType = function()
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

  var tooltipTimeout;

  /**
   * XUI Input Class connects the published attributes and the internal
   * element that it uses to render the actual inputbox UI.
   *
   * @class  XUIInput
   * @constructor
   * 
   * @example
   *   <xui-input type='text'></xui-input>
   */
  function XUIInput()
  {
    this.patternRegex       = /./;
    
    this.$.input.type       = this.type;
    this.$.input.step       = this.step;
    this.$.input.min      = this.min;
    this.$.input.max      = this.max;
    this.$.input.placeholder  = this.placeholder;

    // Let's overwrite the tooltip and tooltip-description
    if (this.children.length > 0)
    {
      var tooltip = this.children[0];

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

Polymer({
  is: 'xui-input',
    ready: XUIInput,

    properties: {
      /**
       * XUI input type
       * 
       * __Possible values:__
       * - text (default)
       * - password
       * - range
       * 
       * *Default html input types are also supported*
       * 
       * @attribute  type
       * @type    String
       * @default   ''
       */
      type: {
        type: String,
        value: ''
      },

      /**
       * XUI input default value
       *
       * @attribute  value
       * @type    String
       * @default   ''
       */
      value: {
        type: String,
        value: ''
      },

      /**
       * XUI input steps. This is used to specify how much will be added
       * or subtracted on each spinner/slider step change.
       * - Only use when type is `range` or `number`
       *
       * @attribute  step
       * @type    String
       * @default   ''
       */
      step: {
        type: String,
        value: ''
      },

      /**
       * XUI input minimum value
       * - Only use when type is `range` or `number`
       *
       * @attribute  min
       * @type    String
       * @default   ''
       */
      min: {
        type: String,
        value: ''
      },

      /**
       * XUI input maximum value
       * - Only use when type is `range` or `number`
       *
       * @attribute  max
       * @type    String
       * @default   ''
       */
      max: {
        type: String,
        value: ''
      },

      /**
       * XUI input placeholder value
       *
       * @attribute  placeholder
       * @type    String
       * @default   ''
       */
      placeholder: {
        type: String,
        value: ''
      },

      /**
       * XUI input mode
       * - Only use when type is range
       *
       * @attribute  mode
       * @type    String
       * @default   ''
       */
      mode: {
        type: String,
        value: ''
      },

      /**
       * XUI input valid patterns. XUI input will fire an `error` event
       * on blur if user input does not pass the pattern test.
       *
       * @attribute  pattern
       * @type    Regular Expression
       * @default   ''
       */
      pattern: {
        value: ''
      },

      /**
       * XUI Default label text
       *
       * @attribute  label
       * @type    String
       * @default   ''
       */
      label: {
        type: String,
        value: ''
      },

      /**
       * XUI tooltip title
       *
       * @attribute  tooltip
       * @type    String
       * @default   ''
       */
      tooltip: {
        type: String,
        value: ''
      },

      tooltipdescription: {
        type: String,
        value: ''
      },

      /**
       * XUI tooltip description
       *
       * @attribute  tooltip-description
       * @type    String
       * @default   ''
       */
      'tooltip-description': {
        type: String,
        value: ''
      }
    },

    listeners:
    {
      blur: 'blurHandler',
      keyup: 'keyupHandler'
    },

    typeChanged: function()
    {
      if (this.type !== '' &&
        this.type !== null)
      {
        this.type = this.type.toLowerCase();
      }

      _rangeType.apply(this, []);
    },

    modeChanged: function()
    {
      if (this.mode !== '' &&
        this.mode !== null)
      {
        this.mode = this.mode.toLowerCase();
      }

      _rangeType.apply(this, []);
    },

    patternChanged: function()
    {
      var modifiers = '';

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

    attributeChanged: function(attr, oldVal, newVal)
    {
      this.$.input[attr] = newVal;
    },

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

    tooltipHover: function()
    {
      clearTimeout(tooltipTimeout);

      tooltipTimeout = setTimeout(function()
      {
        this.$.tooltip.setAttribute('show', true);
      }.bind(this), 500);
    },

    tooltipBlur: function()
    {
      clearTimeout(tooltipTimeout);

      this.$.tooltip.removeAttribute('show');
    }
});
