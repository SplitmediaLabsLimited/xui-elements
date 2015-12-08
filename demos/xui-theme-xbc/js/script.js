'use strict';
const t = document.querySelector('#t');

t.addEventListener('dom-change', function() {

  const tabs = document.querySelector('xui-tabs');
  const fontcolor = tabs.querySelector('#fontcolor');
  const bordercolor = tabs.querySelector('#bordercolor');
  const outlineselect = tabs.querySelector('#outlineselect');
  const opacityrange = tabs.querySelector('#opacityrange');

  window.selectfontcolor = function() {
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
      tabs.querySelector('#contenttext').setAttribute('inputstyle', JSON.stringify(temparr));
    };

  window.selectbordercolor = function() {
      let temparr = [];
      const val = tabs.querySelector('#bordercolor').color;
      const border = tabs.querySelector('#outlineselect').value;
      const oldval = tabs.querySelector('#contenttext').getAttribute('inputstyle');
      let myobj = JSON.parse(oldval);

      if (oldval !== '') {
        for (let i = 0; i < myobj.length; i++) {
          if (myobj[i].prop !== 'border') {
            temparr.push({'prop': myobj[i].prop, 'val': myobj[i].val});
          }
        }
      }

      temparr.push({'prop': 'border', 'val': border + ' solid ' + val});
      tabs.querySelector('#contenttext').setAttribute('inputstyle', JSON.stringify(temparr));
    };

  fontcolor.addEventListener('keypress', function(e) {
    if (e.keyCode === 13 || e.keyCode === '13') {
      window.selectfontcolor(e);
    }
  });

  fontcolor.addEventListener('click', function(e) {
    window.selectfontcolor(e);
  });

  bordercolor.addEventListener('click', function(e) {
      window.selectbordercolor(e);
  });

  bordercolor.addEventListener('keypress', function(e) {
    if (e.keyCode === 13 || e.keyCode === '13') {
      window.selectbordercolor(e);
    }
  });

  outlineselect.addEventListener('mouseout', function(e) {
    window.borderSelect(e);
  });

  opacityrange.addEventListener('track', function(e) {
    window.opacityChange(e);
  });

  opacityrange.addEventListener('click', function(e) {
    window.opacityChange(e);
  });

  window.opacityChange = function() {
    let temparr = [];
    const opacity = tabs.querySelector('#opacityrange').value;
    const oldval = tabs.querySelector('#contenttext').getAttribute('inputstyle');
    let myobj = JSON.parse(oldval);

    if (oldval !== '') {
      for (let i = 0; i < myobj.length; i++) {
        if (myobj[i].prop !== 'opacity') {
          temparr.push({'prop': myobj[i].prop, 'val': myobj[i].val});
        }
      }
    }

    temparr.push({'prop': 'opacity', 'val': '.' + opacity});
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

  window.borderSelect = function() {
    let temparr = [];
    const val = tabs.querySelector('#outlineselect').value;
      const color = tabs.querySelector('#bordercolor').color;
    const oldval = tabs.querySelector('#contenttext').getAttribute('inputstyle');

    let myobj = JSON.parse(oldval);

    if (oldval !== '') {
      for (let i = 0; i < myobj.length; i++) {
        if (myobj[i].prop !== 'border') {
          temparr.push({'prop': myobj[i].prop, 'val': myobj[i].val});
        }
      }
    }
    temparr.push({'prop': 'border', 'val': val+ ' solid ' + color});

    tabs.querySelector('#contenttext').setAttribute('inputstyle', JSON.stringify(temparr));

  };

});