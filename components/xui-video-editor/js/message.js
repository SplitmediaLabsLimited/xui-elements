/* globals Polymer */

(function()
{
    /**
     * Creates an instance of XVEMessage
     */
    function XVEMessage()
    {
    }
    
    XVEMessage.prototype = 
    {
        ready: XVEMessage,
        
        /**
         * Shows the message
         */
        show: function(type, title, message, callback)
        {
            this.type      = type;
            this.titletext = title;
            this.message   = message;
            this.callback  = callback;
            
            this.style.display = "block";
        },
        
        /**
         * Hides the message
         */
        hide: function()
        {
            this.style.display = "none";
            
            this.returnResult("cancel");
        },
        
        ok: function()
        {
            this.style.display = "none";
            
            this.returnResult("ok");
        },
        
        cancel: function()
        {
            this.style.display = "none";
            
            this.returnResult("cancel");
        },
        
        returnResult: function(result)
        {
            if (typeof this.callback === "function")
            {
                this.callback.call(this, result);
            }
        }
    };
    
    Polymer(XVEMessage.prototype);
})();