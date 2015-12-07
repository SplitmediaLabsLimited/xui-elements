/* globals Polymer */
'use strict';

/**
`<xui-radio></xui-radio>` inserts a customized radio button into your page.

Just put an `<xui-radio></xui-radio>` anywhere inside your body.

You can also customize it, by adding these attributes:

 - name - radio button name (radio buttons with thesame name are in one group).

 - disabled - to disabled the radio button.

 - labelstyle - custom style for radio button's label.

  - Note: putting labelstyle attributes on the element should be in JSON format. 
  - Note: Please notice how we use singlequotes outside and doublequotes inside. 
  - prop - the name of the css property. 
  - val - the value of the css property. 
   
  Example:

       `<xui-radio labelstyle='[{ "prop": "color", "val": "red" }, { "prop": "font-size", "val": "30px"}]' value="none" label="None" name="animation"></xui-radio>`

 - value - value of radio button.

 - checked - to make the radiobutton selected by default.

 - icon - icon link to specify an icon beside the radio button.

 - iconheight - icon height.

 - iconwidth - icon width.

 - label - radio button textr label. 

Example: 

    `<xui-radio value="hey" name="greetings" label="Radio 3 with icon" icon="https://orbitprint.com/images/colour-enhance.png" iconwidth="20" iconheight="20"></xui-radio>`

@demo .../../demos/xui-theme-xbc/components/xui-radio.html A Cool Demo.
@demo .../../demos/xui-radio/demo.html  Another Demo.

*/
Polymer({
  is: 'xui-radio',

  ready: function() {
    if (this.$.radio.checked) {
      this.checked = true;
    } else {
      this.checked = false;
    }

  },

  properties: {

    /** Label for the radio */
    label: {
      type: String,
      value: '',
      reflectToAttribute: true
    },

    /** Inserts a custom css style to the radio's' label */
    labelstyle: {
      type: Object,
      value: function() { return {}; },
      reflectToAttribute: true
    },

    /** Checks/unchecks the radio */
    checked: {
      type: Boolean,
      reflectToAttribute: true
    },

    /** Disables/enables the radio */
    disabled: {
      type: Boolean,
      value: false,
      reflectToAttribute: true
    },

    /* Radio button's Value */
    value: {
      type: String,
      value: false,
      reflectToAttribute: true
    },

    /** Radio button's name **/
    name: {
      type: String,
      reflectToAttribute: true
    },

    /** Radio button's icon **/
    icon: {
      type: String,
      reflectToAttribute: true
    },

    /** Radio button's icon height **/
    iconheight: {
      type: Number,
      reflectToAttribute: true
    },

    /** Radio button's icon width **/
    iconwidth: {
      type: Number,
      reflectToAttribute: true
    }
  },

  listeners: {    
    /**
    When the the `xui-radio` element was tapped

    @event radioTap
    */
    'tap': 'radioTap'
  },

  /** Refresh the style in the browser's background when radio was clicked */
  radioTap: function() {
    this.$.label1.style.display='none';
    this.$.label1.style.display='';
  },

  /** 
  Converts the labelstyle attribute JSON format into css format 
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