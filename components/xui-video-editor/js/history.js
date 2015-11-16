/* globals document, Polymer */

(function()
{
    /**
     * Creates an instance of XVEHistory
     */
    function XVEHistory()
    {
        this.history = [];
    }
    
    XVEHistory.prototype = 
    {
        ready: XVEHistory,
        
        push: function(type, args)
        {
            this.history.push({ type: type, args: args });
        },
        
        pop: function()
        {
            return this.history.pop();
        }
    };
    
    Polymer(XVEHistory.prototype);
})();