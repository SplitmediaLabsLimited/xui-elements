'use strict';

const t = document.querySelector('#t');
// The dom-change event signifies when the template has stamped its DOM.
t.addEventListener('dom-change', function() {
// auto-binding template is ready.  
  const tabs = document.querySelector('xui-tabs');
  window.Selectfontcolor = function() {
    const val = tabs.$.contents.querySelector('#fontcolor').color;
    tabs.$.contents.querySelector('#contenttext::shadow #input').style.color = val;
  };

  window.Selectfontcolor = function() {
    const val = tabs.$.contents.querySelector('#fontcolor').color;
    tabs.$.contents.querySelector('#contenttext::shadow #input').style.color = val;
    // console.log(tabs.$.contents.querySelector('#test::shadow #input'));
  };

  window.customscriptTick = function() {
    const check = tabs.$.contents.querySelector('#chk_custom::shadow input');
    const btn = tabs.$.contents.querySelector('#btn_edtscript');
    if (check.checked) {
      btn.removeAttribute('disabled');
    } else{
      btn.setAttribute('disabled', true);
    }
  };

  window.fontSelect = function() {
    const val = tabs.$.contents.querySelector('#slct_font').value;

    if (val === 'lucida') {
    tabs.$.contents.querySelector('#contenttext::shadow #input').style.fontFamily = 'Lucida Sans Unicode, Lucida Grande, sans-serif';
    } else if (val === 'comicsans') {
    tabs.$.contents.querySelector('#contenttext::shadow #input').style.fontFamily = 'Comic Sans MS, Comic Sans, cursive';
    } else if (val === 'roboto') {
    tabs.$.contents.querySelector('#contenttext::shadow #input').style.fontFamily = 'Roboto';
    }
  } 

});