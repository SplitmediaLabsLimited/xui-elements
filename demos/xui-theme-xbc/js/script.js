'use strict';
const t = document.querySelector('#t');

t.addEventListener('dom-change', function() {

  const tabs = document.querySelector('xui-tabs');

  window.Selectfontcolor = function() {
    let temparr = [];
    const val = tabs.querySelector('#fontcolor').color;
    const oldval = tabs.querySelector('#contenttext').getAttribute('inputstyle');
    let myobj = JSON.parse(oldval);

    if (oldval !== '') {
      for (let i = 0; i < myobj.length; i++) {
        if (myobj[i].prop !== 'color') {
          temparr.push({'prop': myobj[i].prop, 'val': myobj[i].val});
        }
      }
    }

    temparr.push({'prop': 'color', 'val': val});
    console.log(JSON.stringify(temparr));
    tabs.querySelector('#contenttext').setAttribute('inputstyle', JSON.stringify(temparr));
  };

  window.customscriptTick = function() {
    const check = tabs.querySelector('#chk_custom');
    const btn = tabs.querySelector('#btn_edtscript');
    if (!check.checked) {
      btn.removeAttribute('disabled');
    } else{
      btn.setAttribute('disabled', true);
    }
  };

  window.fontSelect = function() {
    let temparr = [];
    const val = tabs.querySelector('#slct_font').value;
    const oldval = tabs.querySelector('#contenttext').getAttribute('inputstyle');

    let myobj = JSON.parse(oldval);

    if (oldval !== '') {
      for (let i = 0; i < myobj.length; i++) {
        if (myobj[i].prop !== 'font-family') {
          temparr.push({'prop': myobj[i].prop, 'val': myobj[i].val});
        }
      }
    }

    if (val === 'lucida') {
    temparr.push({'prop': 'font-family', 'val': 'Lucida Sans Unicode, Lucida Grande, sans-serif'});
    } else if (val === 'comicsans') {
    temparr.push({'prop': 'font-family', 'val': 'Comic Sans MS, Comic Sans, cursive'});
    } else if (val === 'roboto') {
    temparr.push({'prop': 'font-family', 'val': 'Roboto'});
    }

    tabs.querySelector('#contenttext').setAttribute('inputstyle', JSON.stringify(temparr));

  };

});