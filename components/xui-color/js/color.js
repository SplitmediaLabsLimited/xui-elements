/* globals Polymer */
'use strict';

/**
`<xui-color></xui-color>` inserts a customized color picker into your page.

Just put an `<xui-color></xui-color>` anywhere inside your body.

You can also customize it, by adding these attributes:

 - name - the name of the checkbox.

 - width - color picker width.

 - labelstyle - custom style for color picker's label.

  - Note: putting labelstyle attributes on the element should be in JSON format. 
  - Note: Please notice how we use singlequotes outside and doublequotes inside. 
  - prop - the name of the css property. 
  - val - the value of the css property. 
   
  Example:

       `<xui-color labelstyle='[{ "prop": "color", "val": "red" }, { "prop": "font-size", "val": "30px"}]' label="Font" height="30" width="30"></xui-color>`

 - label - color picker text label.

 - height - color picker height.

 - icon - icon link to specify an icon beside the color picker.

 - iconheight - icon height.

 - iconwidth - icon width.

 - color - default color value of the color picker. 

Example: 

    `<xui-color width="30" label="Label " height="30" icon="https://orbitprint.com/images/colour-enhance.png" iconwidth="20" iconheight="20" color="#000000"></xui-color>`

@demo .../../demos/xui-theme-xbc/components/xui-color.html  A Cool Demo.
@demo .../../demos/xui-color/demo.html  Another Demo.

*/
Polymer({
  is: 'xui-color',

  /**
  * Initiate the default property values and apply to the element. 
  * 
  */
  ready: function() {
    const icnwidth = this.width * 0.5;
    const icnheight = this.height * 0.4;
    this.$.img.style.width = icnwidth + 'px';
    this.$.img.style.height = icnheight + 'px';
    this.$.colorcontainer.style.width = this.width + 'px';
    this.$.colorcontainer.style.height = this.height + 'px';
    this.$.colorcontainer.style.backgroundColor = this.color;
    this.$.valholder.style.border = '3px solid ' + this.color;
    this.$.paletteboard.style.top = this.height + 'px';
    this.$.colorcontainer.blur();
  },

  /**
  * Making the color palette. 
  * 
  */
  attached:function(){
    this.async(function() {
      for (let i = this.hexcolors.length - 1; i >= 0; i--) {
        let colorId = '#color_'+i;
        this.$$(colorId).style.backgroundColor = this.hexcolors[i].color;
      }
    }, 500);

  },

  listeners: {
    
    /**
    Fired when the `#colorcontainer` was tapped
    
    @event containerTap
    */
    'colorcontainer.tap': 'containerTap',

    /**
    Fired when the `#valholder` was focused
    
    @event valFocus
    */
    'valholder.focus': 'valFocus',

    /**
    Fired when the `#valholder` was blurred
    
    @event valBlur
    */
    'valholder.blur': 'valBlur',

    /**
    Fired when the `#valholder` is focused 
    and you pressed 'enter'.
    
    @event colorEnter
    */
    'valholder.keypress': 'colorEnter',

    'paletteboard.tap': 'testTap'
  },

  properties: {

    /** Color elemnt's label */
    label: {
      type: String,
      value: '',
      reflectToAttribute: true
    },

    /** Inserts a custom css style to the color element's label */
    labelstyle: {
      type: Object,
      value: function() { return {}; },
      reflectToAttribute: true
    },

    /** Color elemnt's width */
    width: {
      type: Number,
      value: 20,
      reflectToAttribute: true
    },

    /** Color elemnt's height */
    height: {
      type: Number,
      value: 20,
      reflectToAttribute: true
    },

    /** Disables/enables the color element */
    disabled: {
      type: Boolean,
      value: false,
      reflectToAttribute: true
    },

    /** color / value of the color element */
    color: {
      type: String,
      value: '#FFFFFF',
      reflectToAttribute: true
    },

    /** Temporary color, used only when hovering the palette board */
    tempcolor: {
      type: String,
      value: '#FFFFFF'
    },

    /** Defines if the palette contains the 'hidden' class */
    haveclass: {
      type: Boolean,
      value: false
    },

    /** Defines if the palette was clicked */
    paletteclicked: {
      type: Boolean,
      value: false
    },

    /** Defines if the textbox(in the palette) is focused */
    focused: {
      type: Boolean,
      value: false
    },

    /**  The color swatches that appears in the palette  */
    hexcolors: {
      type: Array,
      value: [
      {color: '#000000'}, {color: '#013380'}, {color: '#42018C'}, {color: '#60018C'}, {color: '#640064'}, {color: '#800000'}, {color: '#800133'}, {color: '#561F01'}, {color: '#412A01'}, {color: '#808000'}, {color: '#395001'}, {color: '#0F6501'}, {color: '#01422D'}, {color: '#013E45'},
      {color: '#121212'}, {color: '#0000C5'}, {color: '#5F01CC'}, {color: '#8B01CC'}, {color: '#800080'}, {color: '#B9014A'}, {color: '#BE0808'}, {color: '#7E2D01'}, {color: '#5F3D01'}, {color: '#988F01'}, {color: '#486401'}, {color: '#008000'}, {color: '#016042'}, {color: '#015A64'},
      {color: '#2C2C2C'}, {color: '#0000FF'}, {color: '#7700FF'}, {color: '#AE00FF'}, {color: '#960096'}, {color: '#E8015D'}, {color: '#E61010'}, {color: '#9D3801'}, {color: '#774C01'}, {color: '#B2A801'}, {color: '#587C01'}, {color: '#179D01'}, {color: '#017852'}, {color: '#008080'},
      {color: '#505050'}, {color: '#0B33FF'}, {color: '#861DFF'}, {color: '#B71DFF'}, {color: '#AB01AB'}, {color: '#FF1270'}, {color: '#FF0000'}, {color: '#C24601'}, {color: '#935E01'}, {color: '#C9BF01'}, {color: '#679101'}, {color: '#1BB801'}, {color: '#019565'}, {color: '#00A3A3'},
      {color: '#888888'}, {color: '#1F44FF'}, {color: '#9335FF'}, {color: '#BF35FF'}, {color: '#D403D4'}, {color: '#FF2C80'}, {color: '#FF3A3A'}, {color: '#E45101'}, {color: '#AC6E01'}, {color: '#DBD000'}, {color: '#79AA01'}, {color: '#1FD701'}, {color: '#01AE77'}, {color: '#00C1C1'},
      {color: '#C0C0C0'}, {color: '#3F63FF'}, {color: '#A253FF'}, {color: '#C853FF'}, {color: '#FF00FF'}, {color: '#FF4A92'}, {color: '#FF5656'}, {color: '#FF630D'}, {color: '#CA8101'}, {color: '#F3E700'}, {color: '#8BC301'}, {color: '#00FF00'}, {color: '#01CC8B'}, {color: '#00DEDE'},
      {color: '#FFFFFF'}, {color: '#627FFF'}, {color: '#B270FF'}, {color: '#D170FF'}, {color: '#FF36E5'}, {color: '#FF69A4'}, {color: '#FF7373'}, {color: '#FF7D36'}, {color: '#E79401'}, {color: '#FFFF00'}, {color: '#A2E501'}, {color: '#58FF3D'}, {color: '#01EAA0'}, {color: '#00FFFF'},
      ],
      reflectToAttribute: true
    },

    /** Color Element's textbox name */
    name: {
      type: String,
      reflectToAttribute: true
    }

  },

  /** Checks if the container is tapped to show/hide the palette board */
  containerTap: function() {
    const palette = this.$.paletteboard;
    const valholder = this.$.valholder;
    if (!this.haveclass) {
      palette.classList.remove('hidden');
      valholder.focus();
      this.focused = true;
      this.haveclass = true;
    } else {
      if (this.focused === false) {
        window.setTimeout(this.hid, 2000);
        valholder.blur();
        this.focused = false;
        this.haveclass = false;
      }
    }
  },

  testTap: function(e) {
    if (e.target.id === 'paletteboard') {
      this.paletteclicked = true;
    } else {
      this.paletteclicked = false;
    }
  },

  /** Set the focused to true if the textbox(inside the palette) was focused */
  valFocus: function() {
    this.focused = true;
    this.containerTap();
  },

  /** Set the focused to false if the textbox(inside the palette) was blurred out */
  valBlur: function() {
    // this.$.paletteboard.addEventListener('click', this.testTap);
    this.focused = false;
    this.haveclass = true;
    this.async(this.hid, 150);
  },

  /** Hides the palette board */
  hid: function() {
    if (!this.paletteclicked) {
      try {
        this.$.paletteboard.classList.add('hidden');
        this.$.valholder.style.border = '3px solid ' + this.color;
        this.$.colorcontainer.style.backgroundColor = this.color;
        this.$.valholder.value = this.color;
      } catch(err) {

      }
    }
  },

  /** When you entered a new color value in the textbox(inside the palette) */
  colorEnter: function(e) {
    const key = e.which || e.keyCode;
    if (key === 13) { 
      const isHex = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(this.$.valholder.value);
      if (isHex) {
        this.color = this.$.valholder.value;
        this.$.valholder.style.border = '3px solid ' + this.color;
        this.$.colorcontainer.style.backgroundColor = this.color;
      } else {
        this.$.valholder.value = this.color;
      }
    }
  },

  /** Sets the new color / value if you changed it */
  setColor: function(e) {
    const theid = e.target.id;
    const thenum = theid.replace( /^\D+/g, '');
    this.color = this.hexcolors[thenum].color;
    this.$.valholder.style.border = '3px solid ' + this.color;
    this.$.colorcontainer.style.backgroundColor = this.color;
  },


  /** Sets the teporary color / value to the textbox if you hovered it */
  colorHover: function(e) {
    const theid = e.target.id;
    const thenum = theid.replace( /^\D+/g, '');
    const thecolor = this.hexcolors[thenum].color;
    this.tempcolor = thecolor;
    this.$.valholder.value = this.tempcolor;
    this.$.valholder.style.border = '3px solid ' + this.tempcolor;
    this.$.colorcontainer.style.backgroundColor = this.tempcolor;
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
