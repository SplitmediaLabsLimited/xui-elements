'use strict';
 /**
* Creates a tab
*
* @class  XUITab
* @constructor
* 
* @example
*     <xui-tab label='Tab Label'></xui-tab>
*/
Polymer({
  is: 'xui-tab',
    ready: function() {
        this.selected = this.classList.contains('selected');
        this.disabled = this.classList.contains('disabled');
        this.hidden = this.classList.contains('hidden');

        this.$.body.innerHTML = this.innerHTML;
    },

    isSelected: function(val) {
        if (val === true) {
            return 'selected';
        }
    },

    isDisabled: function(val) {
        if (val === true) {
            return 'disabled';
        }
    },

    isHidden: function(val) {
        if (val === true) {
            return 'hidden';
        }
    }

});