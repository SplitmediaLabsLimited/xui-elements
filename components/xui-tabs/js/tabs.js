'use strict';    
/**
* Creates a tabs
*
* @class  XUITabs
* @constructor
* 
* @example
*     <xui-tabs>contents</xui-tabs>
*/
Polymer({
  is: 'xui-tabs',

  ready: function() {
    
    //  
  },

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

    selectTab: function(event) {
        if (!event.target.classList.contains('head') ||
            event.target.classList.contains('disabled'))
        {
            return false;
        }

        var siblings = event.target.parentNode.children;
        var contents = this.$.contents.children;

        for (var i = 0; i < siblings.length; i++)
        {
            siblings[i].classList.remove('selected');
            contents[i].classList.remove('selected');

            if (contents[i].classList.contains(event.target.getAttribute('name')))
            {
                event.target.classList.add('selected');
                contents[i].classList.add('selected');
            }
        }

    },

    getTabs: function()
    {
        return this.tabs;
    }
});