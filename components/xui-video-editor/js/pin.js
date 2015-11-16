/* globals document, Polymer */

(function()
{
    /**
     * Creates an instance of XVEPin
     */
    function XVEPin()
    {
        this.boundSlide     = this.slide.bind(this);
        this.boundStopSlide = this.stopSlide.bind(this);
        
         this.$.handle.addEventListener(
            "mousedown", this.startSlide.bind(this)
        );
    }
    
    XVEPin.prototype = 
    {
        ready: XVEPin,
        
        startSlide: function(event)
        {
            if (event.which !== 1)
            {
                return;
            }
            
            this.startx        = event.x;
            this.starttime     = this.currenttime;
            this.pixelsPerTime = this.pixelInterval / this.timeInterval;
            
            this.startstate    = this.paused;
            this.paused        = true;

            document.addEventListener("mousemove", this.boundSlide);
            document.addEventListener("mouseup", this.boundStopSlide);
        },
        
        slide: function(event)
        {
            var timeChange = (event.x - this.startx) / this.pixelsPerTime,
                newTime    = this.starttime + timeChange;
            
            // newTime must not be greater than duration
            newTime = (newTime > this.duration) ? this.duration : newTime;
            
            // newTime must not be less than 0
            newTime = (newTime < 0) ? 0 : newTime;
            console.log(this.duration);
            
            this.currenttime = newTime;
            
            this.fire("positionchanged", { position : this.currenttime });
        },
        
        stopSlide: function(event)
        {
            document.removeEventListener("mousemove", this.boundSlide);
            document.removeEventListener("mouseup", this.boundStopSlide);
            
            this.paused = this.startstate;
        }
    };
    
    Polymer(XVEPin.prototype);
})();