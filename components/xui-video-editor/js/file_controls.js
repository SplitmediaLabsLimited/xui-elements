/* globals */

(function()
{
    Polymer(
    {
        ready: function()
        {
            this.shadowRoot.addEventListener(
                "click", this.clickHandler.bind(this)
            );
            
            this.removeEnabledChanged();
            this.splitEnabledChanged();
        },
        
        /**
         * Event triggered on change of remove enabled
         */
        removeEnabledChanged: function()
        {
            this.$.remove.disabled = !this.removeEnabled;
        },
        
        /**
         * Event triggered on change of split enabled
         */
        splitEnabledChanged: function()
        {
            this.$.split.disabled = !this.splitEnabled;
        },
        
        /**
         * Event triggered on change of undo enabled
         */
        undoEnabledChanged: function()
        {
            this.$.undo.disabled = !this.undoEnabled;
        },

        /**
         * Event triggered on change of save enabled
         */
        saveEnabledChanged: function()
        {
            this.$.save.disabled = !this.saveEnabled;
        },
        
        /**
         * Handles click events
         * @param {Object} event
         */
        clickHandler: function(event)
        {
            switch(event.target)
            {
                case this.$.add:
                    this.fire("addvideo");
                    break;

                case this.$.split:
                    this.fire("splitvideo");
                    break;

                case this.$.remove:
                    this.fire("removevideo");
                    break;

                case this.$.undo:
                    this.fire("undo");
                    break;

                case this.$.save:
                    this.fire("savevideo");
                    break;
            }
        }
    });
})();