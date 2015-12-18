/* globals Polymer */
'use strict';

/**
`<xui-checkbox></checkbox>` inserts a customized button into your page.

Just put an `<xui-checkbox></checkbox>` anywhere inside your body.

You can also customize it, by adding these attributes:

 - name - the name of the checkbox.

 - labelstyle - custom style for checkbox's label.

  - Note: putting labelstyle attributes on the element should be in JSON format. 
  - Note: Please notice how we use singlequotes outside and doublequotes inside. 
  - prop - the name of the css property. 
  - val - the value of the css property. 
   
  Example:

       `<xui-checkbox label="Use Custom Script" labelstyle='[{ "prop": "color", "val": "red" }, { "prop": "font-size", "val": "30px"}]'></xui-checkbox>`

 - icon - icon link to specify an icon beside the checkbox.

 - iconheight - icon height.

 - iconwidth - icon width.

 - disabled - to make the checkbox disabled.

 - checked - to make the checkbox checked by default.

 - value - default value of the checkbox.

 - label - specify the text label of the checkbox.

Example: 

    `<xui-checkbox label="Checkbox with icon" icon="http://m.hiapphere.com/data/icon/201409/HiAppHere_com_kov.theme.lumos.png" iconwidth="20" iconheight="20" checked disabled></xui-checkbox>`

@demo .../../demos/xui-theme-xbc/components/xui-checkbox.html  A Cool Demo.
@demo .../../demos/xui-checkbox/demo.html  Another Demo.

*/
Polymer({
  is: 'xui-checkbox',

  properties: {

    /** Label text of checkbox */
    label: {
      type: String,
      value: '',
      reflectToAttribute: true
    },

    /** Inserts a custom css style to the checkbox's label */
    labelstyle: {
      type: Object,
      value: function() { return {}; },
      reflectToAttribute: true
    },

    /** Checkbox default value */
    value: {
      type: String,
      value: '',
      reflectToAttribute: true
    },

    /** Checks/unchecks the checkbox */
    checked: {
      type: Boolean,
      value: false,
      reflectToAttribute: true
    },

    /** Disables/enables the checkbox */
    disabled: {
      type: Boolean,
      value: false,
      reflectToAttribute: true
    },

    /** Checkbox's icon */
    icon: {
      type: String,
      reflectToAttribute: true
    },

    /** Checkbox's icon height */
    iconheight: {
      type: Number,
      reflectToAttribute: true
    },

    /** Checkbox's icon width */
    iconwidth: {
      type: Number,
      reflectToAttribute: true
    },

    /** Chckbox's name */
    name: {
      type: String,
      reflectToAttribute: true
    }

  },

  listeners: {

    /**
    Fired when the anything in the
     `xui-checkbox` was tapped
    
    @event checkTap
    */
    'tap': 'checkTap'
  },


  /** Sets/removes the checked attribute and class */
  checkTap: function() {
    if (!this.$.check.disabled) {
      if (this.$.check.checked) {
        this.setAttribute('checked', true);
        this.$.label1.classList.add('checked');
        this.$.label1.classList.remove('unchecked');
      } else {
        this.removeAttribute('checked');
        this.$.label1.classList.remove('checked');
        this.$.label1.classList.add('unchecked');
      }
    }
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