/* globals Polymer */

(function()
{
    Polymer(
    {
        ready: function()
        { 
            this.shadowRoot.addEventListener(
                "click", this.clickHandler.bind(this)
            );
        },
        
        /**
         * Handles click events
         * @param {Object} event
         */
        clickHandler: function(event)
        {
            switch(event.target)
            {
                case this.$.previous:
                    this.fire("previous");
                    break;
                    
                case this.$.play:
                    this.paused = false;
                    break;
                    
                case this.$.pause:
                    this.paused = true;
                    break;
                    
                case this.$.next:
                    this.fire("next");
                    break;
            }
        },
        
        /**
         * Event triggered on change of paused
         */
        pausedChanged: function()
        {
            if (this.paused)
            {
                this.classList.add("paused");
            }
            else
            {
                this.classList.remove("paused");
            }
        },
    
        prevenabledChanged: function()
        {
            this.$.previous.disabled = !this.prevenabled;    
        },
        
        playenabledChanged: function()
        {
            this.$.play.disabled  = !this.playenabled;
            this.$.pause.disabled = !this.playenabled;
        },
        
        nextenabledChanged: function()
        {
            this.$.next.disabled = !this.nextenabled;    
        }
    
    });
})();