/* globals Polymer */

(function()
{
    /**
     * Creates an instance of XVEProgress
     */
    function XVEProgress()
    {
        this.progress = -1;
    }
    
    XVEProgress.prototype = 
    {
        ready: XVEProgress,
        
        /**
         * Event triggered on changed of progress
         */
        progressChanged: function()
        {
            this.style.display = 
                this.progress >= 0 || this.progress === "loading" ? 
                    "block" : "none";
        }
    };
    
    Polymer(XVEProgress.prototype);
})();