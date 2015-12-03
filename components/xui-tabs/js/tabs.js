'use strict';

/**

`<xui-tabs></xui-tabs>` is a container of all the tabs.

Just put an `<xui-xui-tabs></xui-xui-tabs>` anywhere inside your body.

You also need to insert the `<xui-tab></xui-tab>` inside the `<xui-tabs></xui-tabs>`

Example: 

    <xui-tabs>
      <xui-tab name="tab1" label="Tab 1" tooltip="This is Tab 1" class="selected">Contents for Tab 1</xui-tab>
      <xui-tab name="tab2" label="Tab 2">Contents for Tab 2</xui-tab>
    </xui-tabs>

@demo .../../demos/xui-theme-xbc/components/xui-tab.html  A Cool Demo.
@demo .../../demos/xui-tabs/demo.html  Another Demo.

*/
Polymer({
  is: 'xui-tabs',

    /** checking the <xui-tab> children **/
    attached: function() {
      this.async(function() {
      this.tabs = [];
      for (var i = 0; i < this.children.length; i++)
      {
       if (this.children[i].tagName == 'XUI-TAB')
       {
        this.$.headers.appendChild(this.children[i].$.head);
        this.$.contents.appendChild(this.children[i].$.body);
       }
      }

       this.$.headers.addEventListener('click', this.selectTab.bind(this));
      });
    },

    /**
    Make the tab Selected.

    @param {xui-tab}
    @return {Boolean} or make the tab selected 
    */
    selectTab: function(event) {
      if (!event.target.classList.contains('canselect') ||
      event.target.classList.contains('disabled')) {
        return false;
      }
      var evetarget = event.target;
      var siblings = evetarget.parentNode.children;

      if (evetarget.classList.contains('img')) {
        evetarget = evetarget.parentNode;
        siblings = evetarget.parentNode.parentNode.children;
      }
      var contents = this.$.contents.children;

      for (var i = 0; i < siblings.length; i++) {
        siblings[i].classList.remove('selected');
        contents[i].classList.remove('selected');

        if (contents[i].classList.contains(evetarget.getAttribute('name')))
        {
        evetarget.classList.add('selected');
        contents[i].classList.add('selected');
        }
      }

    },

    /**
    Get the list of tabs
    
    @return {HTMLElement} xui-tabs.
    */
    getTabs: function()
    {
     return this.tabs;
    }
});