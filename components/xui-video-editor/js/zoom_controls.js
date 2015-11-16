/* globals Polymer */

(function()
{
    "use strict";

    function XVEZoomControls()
    {
        this.MAX_ZOOM = 10;
        
        this.shadowRoot.addEventListener(
            "click", this.buttonClicked.bind(this)
        );
        
        this.$.rangeInput.addEventListener(
            "change", this.rangeInputChanged.bind(this)
        );
    }
    
    XVEZoomControls.prototype =
    {
        ready: XVEZoomControls,
        
        /**
         * Event triggered on clicked of the buttons
         * @param {Object} event
         */
        buttonClicked: function(event)
        {
            switch (event.target)
            {
                case this.$.zoomIn:
                    this.zoom = this.zoom == this.MAX_ZOOM ? 
                        this.MAX_ZOOM : Number(this.zoom) + 1;
                    break;

                case this.$.zoomOut:
                    this.zoom = this.zoom == 1 ? 
                        1 : Number(this.zoom) - 1;
                    break;
            }
        },
        
        /**
         * Event triggered on change of the range input
         */
        rangeInputChanged: function()
        {
            this.zoom = Number(this.$.rangeInput.value);
        },
        
        /**
         * Event triggered on change of zoom
         * @param {Object} event
         */
        zoomChanged: function()
        {
            this.$.rangeInput.value = this.zoom;
        }
    };
    
    Polymer.call(this, XVEZoomControls.prototype);
})();