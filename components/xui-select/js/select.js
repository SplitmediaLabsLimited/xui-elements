/*global Polymer*/
'use strict';

/**
`<xui-select></xui-select>` inserts a customized dropdown into your page.

Just put an `<xui-select></xui-select>` anywhere inside your body.

You can also customize it, by adding these attributes:

 - name - dropdown name.

 - labelstyle - custom style for dropdown's label.

 - selectstyle - custom style for the dropdown.

  - Note: putting selectstyle and labelstyle attributes on the element should be in JSON format. 
  - Note: Please notice how we use singlequotes outside and doublequotes inside. 
  - prop - the name of the css property. 
  - val - the value of the css property. 
   
  Example:
    
       `<xui-select height="30" selectstyle='[{ "prop": "background-color", "val": "red" }, { "prop": "font-size", "val": "30px"}]' label="asd" class="outlineselect">
          <xui-option value="none" label="None"></xui-option>
          <xui-option value="thin" label="Thin"></xui-option>
          <xui-option value="thick" label="Thick"></xui-option>
        </xui-select>`

 - disabled - to disabled the dropdown.

 - icon - icon link to specify an icon beside the dropdown.

 - iconheight - icon height.

 - iconwidth - icon width.

 - label - dropdown label. 

 - height - dropdown height. 

 - width - dropdown width. 

Example: 

    `<xui-select name="country" label="Country" icon="https://orbitprint.com/images/colour-enhance.png" iconwidth="20" iconheight="20"></select>`

You also need to insert the `<xui-option></xui-option>` to define an option inside the select element. 

You can customize the opotion element by adding these attributes to the `<xui-option>` tag: 

 - value - value of the option element. 

 - label - the text label of the option element. 

 - disabled - specify if the option element is disabled. 

Example: 

    <xui-select name="country" label="Country">
      <xui-option value="RW" label="Rwanda"></xui-option>
      <xui-option value="IT" label="Italy"></xui-option>
    </xui-select>


If you wanted to have an option-group instead of option, you can 
insert the `<xui-option-group></xui-option-group>` 
inside the select element and put the
`<xui-option></xui-option>` inside it. 

You can customize the option group by adding these attributes to 
`<xui-option-group>` tag:

 - label - the text label of the option-group element. 

 - disabled - specify if the whole group will be disabled. 

Example: 

    <xui-select name="country" label="Disabled Select" disabled>
      <xui-option-group label="Asia" disabled>
        <xui-option value="PH" label="Philippines"></xui-option>
        <xui-option value="TJ" label="Tajikistan" disabled></xui-option>
      </xui-option-group>
    </xui-select>

@demo .../../demos/xui-theme-xbc/components/xui-select.html  A Cool Demo.
@demo .../../demos/xui-select/demo.html  Another Demo.
*/

Polymer({ 
  is: 'xui-select',

  /**
  * Initiate the default property values and apply to the element. 
  * 
  */
  ready: function() {
    let opt;
    let optgrpchild;

    this.$.init.style.width = this.width + 'px';
    this.$.init.style.height = (Number(this.height)+3) + 'px';

    if (this.children.length > 0) {
      for (let i = this.children.length - 1; i >= 0; i--) {
        opt = this.children[i];
        if (opt.localName === 'xui-option') {
          this.opt = true;
          this.optvalue = opt.getAttribute('value');
          this.optlabel = opt.getAttribute('label');
          this.optname = 'single';
          this.optdisabled = opt.getAttribute('disabled') !== null ? true : false;
          this.childval = [];
        }

        if (opt.localName === 'xui-option-group') {
          this.optgrp = true;
          this.optname = 'group';
          this.optlabel = opt.getAttribute('label');
              this.optvalue = opt.getAttribute('value');
          
          this.optdisabled = opt.getAttribute('disabled') !== null ? true : false;
            for (let o = opt.children.length - 1; o >= 0; o--) {
              optgrpchild = opt.children[o];
              this.childlabel = optgrpchild.getAttribute('label');
              this.childvalue = optgrpchild.getAttribute('value');
              this.grpdisabled = 
              optgrpchild.getAttribute('disabled') !== null ? true : false;

              if (optgrpchild.localName === 'xui-option') {
                this.push('childval',
                  {value: this.childvalue, label: this.childlabel,
                   disabled: this.grpdisabled}
                );
              } // end if orgrpchild = xui-option
            } // end for let o
        } // end if opt = xui-option-group
        this.push('optarray',
          {optname: this.optname, value: this.optvalue, 
            label: this.optlabel, childval: this.childval, 
            disabled: this.optdisabled }
        );
        this.childval = [];
      } // end for let i
    } // end if children length > 0
  },

  listeners: {

    /**
    Fired when `select` changes value.
    
    @event changeValue
    */
    'init.change': 'changeValue'
  },

  properties: {

    /** Name of the select form */
    name: {
      type: String,
      reflectToAttribute: true
    },

    /** Inserts a custom css style to the dropdown's label */
    labelstyle: {
      type: Object,
      value: function() { return {}; },
      reflectToAttribute: true
    },

    /** Inserts a custom css style to the dropdown */
    selectstyle: {
      type: Object,
      value: function() { return {}; },
      reflectToAttribute: true
    },

    /** an array that holds the options element */
    optarray: {
      type: Array,
      value: function() {
        return [];
      }
    },
    
    /** Label and value of option tags */
    childval: {
      type: Array,
      value: function() {
        return [];
      }
    },

    /** Option name (single = option), (group = optiongroup) */
    optname: {
      type: String,
      value: ''
    },

    /** Optiongroup (check if it exist) */
    optgrp: {
      type: Boolean,
      value: false
    },

    /** Option (check if it exist) */
    opt: {
      type: Boolean,
      value: false
    },

    /** Disables/enables the dropdown */
    disabled: {
      type: Boolean,
      value: false,
      reflectToAttribute: true
    },

    /** Disables/enables the option */
    optdisabled: {
      type: Boolean,
      value: false
    },

    /** value of option */
    optvalue: {
      type: String
    },


    /** label of option */
    optlabel:{
      type: String
    },

    /** current value of dropdown */
    value: {
      type: String,
      reflectToAttribute: true
    },

    /** value of the option inside the optiongroup */
    childvalue: {
      type: String
    },

    /** label of the option inside the optiongroup */
    childlabel:{
      type: String
    },

    /** width of the dropdown */
    width: {
      type: Number,
      reflectToAttribute: true
    },

    /** height of the dropdown */
    height: {
      type: Number,
      reflectToAttribute: true
    },

    /** Selects/Unselect the option */
    selected: {
      type: Boolean,
      reflectToAttribute: false
    },

    /** an array that holds the option where the user inserted (TEST only) */
    optionarr: {
      type: Array,
      value: function() {
        return [];
      }
    }
  },

  /** Adds a data which was inserted by user to be converted into an option element (TEST only) */
  _addOption: function() {
    const newlabel = this.$$('#txtaddoption').value;
    const newval = this.optionarr.length;
    if (newlabel !== '') {
      this.push('optionarr', {label: newlabel, value: newval});
    }
    this.$$('#txtaddoption').value = '';
    console.log(this.optionarr);
  },

  /** Removes a data from option element which has been added by the user (TEST only) */
  _removeOption: function() {
    const val = this.$$('#slct_option').value;
    console.log(val);
    this.splice('optionarr', val, 1);
    console.log(this.optionarr);
  },

  /** 
   Checks if the data is 'single' or not
     
   @param {string} optname inside optarray
   @return {Boolean} if it exist or not
   */
  _optsingle: function(name) {
    if (name === 'single') {
      return true;
    } else {
      return false;
    }
  },

  /** 
   Checks if the data is a 'group' or not
     
   @param {string} optname inside optarray
   @return {Boolean} if it exist or not
   */
  _optgroup: function(name) {
    if (name === 'group') {
      return true;
    } else {
      return false;
    }
  },

  /** Changes the Selected Value */
  changeValue: function() {
    this.value = this.$.init.value;
  },

  /** 
  Converts the selectstyle attribute JSON format into css format. 
  @param {HTMLAttribute} selectstyle attribute. 
  @return {string}, the css format. 
  */
  setStyle: function(val) {
    let myStyle = '';
    for (let i = 0; i < val.length; i++) {
      myStyle = myStyle + ' ' + this.selectstyle[i].prop + ': ' + this.selectstyle[i].val + ';';
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