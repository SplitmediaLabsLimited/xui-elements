'use strict';

/**
`<xui-tab></xui-tab>`, this element needs to be inserted  `<xui-tabs></xui-tabs>`

You can also customize tabs by inserting these attributes: 

 - name - name of the tab,

 - class:
    - selected - makes the tab selected.
    - disabled - make the tab disabled.
    - hidden   - make the tab hidden.

 - icon - icon link to specify an icon inside the tab.

 - iconheight - icon height.

 - iconwidth - icon width.

 - label - tab label.

 - tooltip - title.

Example: 

    <xui-tabs>
      <xui-tab name="tab1" label="Tab 1" tooltip="This is Tab 1" class="selected">Contents for Tab 1</xui-tab>
      <xui-tab name="tab2" label="Tab 2">Contents for Tab 2</xui-tab>
    </xui-tabs>

@demo .../../demos/xui-theme-xbc/components/xui-tab.html  A Cool Demo.
@demo .../../demos/xui-tabs/demo.html  Another Demo.

*/
Polymer({
  is: 'xui-tab',

  properties: {

    /** Title of the tab */
    tooltip: {
      type: String,
          reflectToAttribute: true
    },

    /** Label for the tab */
    label: {
      type: String,
      reflectToAttribute: true
    },

    /** Name of the tab */
    name: {
      type: String,
      reflectToAttribute: true
    },

    /** Tab's icon */
    icon: {
      type: String,
      reflectToAttribute: true
    },

    /** Tab's icon height */
    iconheight: {
      type: Number,
      reflectToAttribute: true
    },

    /** Tab's icon width */
    iconwidth: {
      type: Number,
      reflectToAttribute: true
    }
  },
  
  /** Initiate the default property values and apply to the element.  */
  ready: function() {
    this.selected = this.classList.contains('selected');
    this.disabled = this.classList.contains('disabled');
    this.hidden = this.classList.contains('hidden');
    this.$.body.innerHTML = this.innerHTML;
    this.classList.add(this.name);
  },

  /**
  Check if `selected` class exist.
  
  @param {className} .
  @return {String}. if true, return 'selected'.
  */
  isSelected: function(val) {
    if (val === true) {
      return 'selected';
    }
  },

  /**
  Check if `disabled` class exist.
  
  @param {className} .
  @return {String}. if true, return 'disabled'.
  */
  isDisabled: function(val) {
    if (val === true) {
      return 'disabled';
    }
  },

  /**
  Check if `hidden` class exist.
  
  @param {className} .
  @return {String}. if true, return 'hidden'.
  */
  isHidden: function(val) {
    if (val === true) {
      return 'hidden';
    }
  }

});