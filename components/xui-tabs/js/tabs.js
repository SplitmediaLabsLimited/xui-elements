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

XBC Theme Demo: <a href="demos/xui-theme-xbc/demo.html" target="_blank">XBC Theme (all elements)</a>

@demo .../../demos/xui-theme-xbc/components/xui-tab.html  A Cool Demo.
@demo .../../demos/xui-tabs/demo.html  Another Demo.

*/
Polymer({
  is: 'xui-tabs',

    /** checking the <xui-tab> children **/
    attached: function() {
      this.async(function() {
      this.tabs = [];
      for (let i = 0; i < this.children.length; i++)
      {
       if (this.children[i].tagName == 'XUI-TAB')
       {
        this.$.headers.appendChild(this.children[i].$.head);
        this.$$('content').appendChild(this.children[i].$.body);
       }
      }


      let contents = this.$.test.getDistributedNodes();
      let xuicontents = [];

      for (let i = 0; i < contents.length; i++) {
        if (contents[i].tagName === 'XUI-TAB') {
          xuicontents.push(contents[i]);
        }
      }
      for (let i = 0; i < xuicontents.length; i++) {
        if (xuicontents[i].classList.contains('selected')) {
          xuicontents[i].style.display = '';
        } else {
          xuicontents[i].style.display = 'none';
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
      let evetarget = event.target;
      let siblings = evetarget.parentNode.children;

      if (evetarget.classList.contains('img')) {
        evetarget = evetarget.parentNode;
        siblings = evetarget.parentNode.parentNode.children;
      }
      let contents = this.$.test.getDistributedNodes();
      let xuicontents = [];

      for (let i = 0; i < contents.length; i++) {
        if (contents[i].tagName === 'XUI-TAB') {
          xuicontents.push(contents[i]);
        }
      }

      for (let i = 0; i < siblings.length; i++) {
        if (xuicontents[i].tagName === 'XUI-TAB') {
          siblings[i].classList.remove('selected');
          xuicontents[i].style.display = 'none';
          xuicontents[i].classList.remove('selected');
          if (xuicontents[i].classList.contains(evetarget.getAttribute('name')))
          {
            xuicontents[i].style.display = '';
            evetarget.classList.add('selected', 'selected');
            xuicontents[i].classList.add('selected');
          }
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
