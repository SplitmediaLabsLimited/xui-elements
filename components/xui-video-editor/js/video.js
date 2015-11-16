/* globals document, Polymer, XML */

(function()
{
    "use strict";

    var MAX_UPDATE_FREQUENCY = 5; // 5 updates per second 
    
    /**
     * Creates an instance of XVEVideo
     */
    function XVEVideo()
    {
        this.id          = 0;
        this.start       = 0;
        this.offsetStart = 0;
        this.duration    = 0;
        this.stop        = 0;
        this.offsetStop  = 0;
        
        this.$.leftslider.addEventListener(
            "mousedown", this.startResize.bind(this)
        );
        
        this.$.rightslider.addEventListener(
            "mousedown", this.startResize.bind(this)
        );
        
        this.boundResize     = this.resize.bind(this);
        this.boundStopResize = this.stopResize.bind(this);
        
        this.addEventListener("dragstart", this.moveStart, false);
        this.addEventListener("dragenter", this.moveEnter, false);
        this.addEventListener("dragover",  this.moveOver,  false);
        this.addEventListener("dragleave", this.moveLeave, false);
        this.addEventListener("drop",      this.moveDrop,  false);
        this.addEventListener("dragend",   this.moveEnd,   false);
    }
    
    XVEVideo.prototype = 
    {
        ready: XVEVideo,
        
        /**
         * Event triggered on change of start
         */
        startChanged: function()
        {
            this.widthChanged();
        },
        
        /**
         * Event triggered on change of stop
         */
        stopChanged: function()
        {
            this.widthChanged();
        },
        
        /**
         * Updates the video thumbnails
         * @param {String} frame left / right / both
         */
        updateThumbnail: function(frame)
        {
            switch (frame)
            {
                case "left":
                    this.positionChanged(this.start, "left");
                    break;
                    
                case "right":
                    this.positionChanged(this.stop, "right");
                    break;
                    
                default:
                    this.positionChanged(this.start, "left");
                    this.positionChanged(this.stop, "right");
                    break;
            }
        },

        positionChanged: function(position, frame)
        {
            this.fire("videopositionchanged",
                { position: position, frame: frame, video: this }
            );
        },
        
        /**
         * Event triggered on change of width
         */
        widthChanged: function()
        {
            this.style.width = (this.stop - this.start).toFixed(9) + "em";
        },
        
        /**
         * Event triggered on change of metadata
         */
        metadataChanged: function()
        {
            this.cuepoints = [];
            
            if (!this.metadata)
            {
                return;
            }
            
            // scans the metadata for xsplit elements
            var scanMetaData = function()
            {
                var metaJSON = XML.toJSON(this.metadata),
                    parent   = metaJSON[0],
                    children = parent.children;

                if (parent && children)
                {
                    scanXSplitTagFunc.call(this, parent, children);
                }
            };
            
            // scans the xsplit tag from metadata
            var scanXSplitTagFunc = function(parent, children)
            {
                while (parent && children)
                {
                    if (!/xsplit:/.test(parent.tag))
                    {
                        parent   = children[0];
                        children = parent.children;
                        
                        continue;
                    }
                    
                    break;
                }
                
                if (!children) 
                {
                    return;
                }
                
                for (var i = 0; i < children.length; i++)
                {
                    var child = children[i];

                    if (child.children &&
                        /(onResume|onSceneChange)/.test(child.name))
                    {
                        pushCuePoints.call(this, child);
                    }
                }
            };
            
            var pushCuePoints = function(cuepointsParent)
            {
                for (var j = 0; j < cuepointsParent.children.length; j++)
                {
                    var cuepointTag = cuepointsParent.children[j],
                        cuepoint    = {};
                    
                    if (cuepointTag.name !== "timestamp")
                    {
                        continue;
                    }

                    cuepoint.type = cuepointsParent.name
                                        .replace("on", "")
                                        .toLowerCase();
                    cuepoint.timestamp = Number(cuepointTag.value) * 1000;
                    
                    this.cuepoints.push(cuepoint);
                }
            };
            
            try
            {
                scanMetaData.call(this);
            }
            catch (e) {}
        },
        
        /**
         * Event triggered on click of cuepoints
         * @param {Object} event
         */
        cuepointClicked: function(event)
        {
            var cuepoint  = event.target,
                timestamp = Number(cuepoint.getAttribute("timestamp"));
            
            this.fire("cuepoint-clicked", 
            { 
                video: this,
                timestamp: timestamp
            });
        },
        
        startResize: function(event)
        {
            event.preventDefault();
            
            if (event.which !== 1)
            {
                return;
            }
            
            this.prevx = event.x;
            
            this.pixelsPerTime = this.offsetWidth / (this.stop - this.start);
            this.resizeDirection = 
                (event.target === this.$.leftslider) ? "left" : "right";   
            
            document.addEventListener("mousemove", this.boundResize);
            document.addEventListener("mouseup", this.boundStopResize);
            
            this.previousState = {};
            this.previousState.start = this.start;
            this.previousState.stop  = this.stop;
            
            this.fire("video-resize-started", { video: this });
        },
        
        resize: function(event)
        {
            var timeChange = (event.x - this.prevx) / this.pixelsPerTime;
            
            this.prevx = event.x;
            
            if (this.resizeDirection === "left")
            {
                
                var newStart = this.start + timeChange;
                
                newStart = (newStart < 0) ? 0 : newStart;
                newStart = (newStart > this.stop - this.timePerFrame) ? 
                    this.stop - this.timePerFrame : newStart;
                
                this.start = Math.round(newStart);
            }
            else
            {
                var newStop = this.stop + timeChange;
                
                newStop = (newStop < this.start + this.timePerFrame) ? 
                    this.start + this.timePerFrame : newStop;
                newStop = (newStop > this.duration) ?
                    this.duration : newStop;
                
                this.stop = Math.round(newStop);
            }
            
            var configUpdateFunc = function()
            {
                this.updateThumbnail(this.resizeDirection);
                this.fire("configchanged", { flag: 2 });
            };

            clearTimeout(this.configTimeout);
            this.configTimeout = setTimeout(
                configUpdateFunc.bind(this), 1000 / MAX_UPDATE_FREQUENCY
            );

            this.fire("video-resized", { video: this });
        },
        
        stopResize: function()
        {
            document.removeEventListener("mousemove", this.boundResize);
            document.removeEventListener("mouseup", this.boundStopResize);
            
            var args = {};
            args.id = this.id;
            
            if (this.previousState.start !== this.start)
            {
                args.prevStart = this.previousState.start;
            }
            
            if (this.previousState.stop !== this.stop)
            {
                args.prevStop = this.previousState.stop;
            }
            
            clearTimeout(this.configTimeout);
            this.updateThumbnail(this.resizeDirection);
            this.fire("configchanged", { flag: 2 });    

            this.fire("video-resize-stopped", args);
        },
        
        focus: function()
        {
            this.classList.add("focused");
            this.fire("video-focused", { video: this });
        },
        
        unFocus: function()
        {
            this.classList.remove("focused");
        },
        
        moveStart: function(event)
        {
            this.style.opacity = "0.5";
            this.classList.add("moving");
            
            event.dataTransfer.effectAllowed = "move";
        },
        
        moveOver: function(event, side)
        {
            event.preventDefault();
            event.dataTransfer.dropEffect = "move";

            if (!side)
            {
                side = "left";
            }
            
            if (
                !this.classList.contains("moving") &&
                (
                    side !== "left" ||
                    !this.previousElementSibling || 
                    !this.previousElementSibling.classList.contains("moving")
                ))
            {
                this.classList.add("over");
                this.classList.add(side);
            }
            
            return false;
        },
        
        moveEnter: function()
        {    
        },
        
        moveLeave: function()
        {
            this.classList.remove("over");
            this.classList.remove("left");
            this.classList.remove("right");
        },
        
        moveDrop: function(event)
        {
            event.preventDefault();
            event.stopPropagation();
        },
        
        moveEnd: function()
        {
            this.style.opacity = "";
            this.classList.remove("moving");
            
            this.fire("video-moved", { video: this });
        }
    };
    
    Polymer.call(this, XVEVideo.prototype);
})();