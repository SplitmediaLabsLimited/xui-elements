/* globals Polymer */
'use strict';

/**
`<xui-range></xui-range>` inserts a customized range into your page.

Just put an `<xui-range></xui-range>` anywhere inside your body.

You can also customize it, by adding these attributes:

 - name - range name.

 - max - maximum value for the range.

 - min - minimum value for range.

 - disabled - to disabled the range.

 - value - default value of range (the position of range bar).

 - icon - icon link to specify an icon beside the range.

 - iconheight - icon height.

 - iconwidth - icon width.

 - label - range text label. 

 - height - range height. 

 - width - range width. 

 - readonly - makes the range value unchangeable but not disabled. 

Example: 

    `<xui-range value="75" min="0" label="Range 1 (disabled)" max="100" disabled></xui-range>`

@demo .../../demos/xui-theme-xbc/components/xui-range.html  A Cool Demo.
@demo .../../demos/xui-range/demo.html  Another Demo.

*/
Polymer({
  is: 'xui-range',

  /**
  Initiate the default property values and apply to the element.  
  */
  ready: function() {
    this.$.range.style.width = this.width + 'px';
    this.$.newval.style.height = (this.height+6) + 'px';
    this.$.range.style.height = this.height + 'px';
    this.$.range.setAttribute('value', this.value);
    const rangewidth = Number(this.width) + Number(30);
    this.$.rangeholder.style.width = rangewidth + 'px';
  },

  listeners: {

    /**
    Fired when `#minus` or the (-) sign was clicked
    
    @event minusTap
    */
    'minus.tap': 'minusTap',

    /**
    Fired when `#plus` or the (+) sign was clicked
    
    @event plusTap
    */
    'plus.tap': 'plusTap',

    /**
    When the range bar was dragged
    
    @event rangeTrack
    */
    'range.track': 'rangeTrack'
  },

  properties: {

  /** Label for the range */
    label: {
      type: String,
      reflectToAttribute: true
    },

  /** Disables/enables the range */
    disabled: {
      type: Boolean,
      value: false,
      reflectToAttribute: true
    },

    /** Makes the Range Textbox's value unchangeable */
    readonly: {
      type: Boolean,
      value: false
    },

    /** Value for range */
    value: {
      type: Number,
      value: 0,
      reflectToAttribute: true
    },

    /** Width for the range holder */
    width: {
      type: Number,
      value: 200,
      reflectToAttribute: true
    },

    /** Height for the range holder */
    height: {
      type: Number,
      value: 20,
      reflectToAttribute: true
    },

    /** Name of the range */
    name: {
      type: String,
      reflectToAttribute: true
    },

    /** Minimum value of the range */
    min: {
      type: Number,
      reflectToAttribute: true
    },

    /** Maximum value of the range */
    max: {
      type: Number,
      reflectToAttribute: true
    },

    /** Range's icon */
    icon: {
      type: String,
      reflectToAttribute: true
    },

    /** Range's icon height */
    iconheight: {
      type: Number,
      reflectToAttribute: true
    },

    /** Range's icon width */
    iconwidth: {
      type: Number,
      reflectToAttribute: true
    }

  },

  /** Change the value while the range bar was dragged */
  rangeTrack: function(e) {
      this.$.newval.value = this.$.range.value;
      this.value = this.$.range.value;
  },

  /** Minus 1 when the minus was clicked */
  minusTap: function () {
    if (!this.$.range.hasAttribute('disabled') && !this.$.range.hasAttribute('readonly')) {
      if (this.min < Number(this.value)) {
      this.value = Number(this.value) - 1;
      }
    }
  },

  /** Plus 1 when the plus was clicked */
  plusTap: function () {
    if (!this.$.range.hasAttribute('disabled') && !this.$.range.hasAttribute('readonly')) {
      if (this.max > Number(this.value)) {
        this.value = Number(this.value) + 1;
      }
    }
  },


  /** When you want to enter a value in the textbox and hit enter key */
  valueEnter: function(e){
     var key = e.which || e.keyCode;
    if (key === 13) { 
      this.value = this.$.newval.value;
    }
  }
});