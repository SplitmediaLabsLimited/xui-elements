'use strict';
const t = document.querySelector('#t');

t.addEventListener('dom-change', function() {

  const tabs = document.querySelector('xui-tabs');

  window.Selectfontcolor = function() {
    const val = tabs.querySelector('#fontcolor').color;
    // const oldval = tabs.querySelector('#contenttext').getAttribute('inputstyle');
    // tabs.querySelector('#contenttext').setAttribute('inputstyle', oldval + ' color:' + val + ';');
    tabs.querySelector('#contenttext').setAttribute('colorstyle', val);
  };

  window.customscriptTick = function() {
    const check = tabs.querySelector('#chk_custom');
    const btn = tabs.querySelector('#btn_edtscript');
    console.log(check.checked);
    if (!check.checked) {
      btn.removeAttribute('disabled');
    } else{
      btn.setAttribute('disabled', true);
    }
  };

  window.fontSelect = function() {
    const val = tabs.querySelector('#slct_font').value;
    // const oldval = tabs.querySelector('#contenttext').getAttribute('inputstyle');

    if (val === 'lucida') {
    tabs.querySelector('#contenttext').setAttribute('fontstyle', 'Lucida Sans Unicode, Lucida Grande, sans-serif');
      // tabs.querySelector('#contenttext').setAttribute('inputstyle', oldval + 'font-family: Lucida Sans Unicode, Lucida Grande, sans-serif;');
    } else if (val === 'comicsans') {
    tabs.querySelector('#contenttext').setAttribute('fontstyle', 'Comic Sans MS, Comic Sans, cursive');
      // tabs.querySelector('#contenttext').setAttribute('inputstyle', oldval + 'font-family: Comic Sans MS, Comic Sans, cursive;');
    } else if (val === 'roboto') {
    tabs.querySelector('#contenttext').setAttribute('fontstyle', 'Roboto');
      // tabs.querySelector('#contenttext').setAttribute('inputstyle', oldval + 'font-family: Roboto;');
    }
  };

});