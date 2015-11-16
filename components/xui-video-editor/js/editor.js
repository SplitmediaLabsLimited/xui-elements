/* globals Polymer */

(function()
{
    "use strict";

    /**
     * Creates an instance of the Video Editor
     */
    function XUIVideoEditor()
    {
        this.justsaved = true;
        
        this.$.playbackControls.addEventListener(
            "previous", this.previousFrame.bind(this)
        );
        
        this.$.playbackControls.addEventListener(
            "next", this.nextFrame.bind(this)
        );
    }
    
    XUIVideoEditor.prototype =
    {
        ready: XUIVideoEditor,
        
        /**
         * Adds video to the video editor
         */
        addVideo: function()
        {
            var video = this.$.timeline.addVideo.apply(
                this.$.timeline, arguments
            );
            
            this.justsaved = false;
            this.$.history.push("add", { video : video });
            
            return video;
        },
        
        /**
         * Gets list of videos
         */
        getVideos: function()
        {
            return this.$.timeline.$.fileList.children;
        },
        
        /**
         * Gets the bounds of the preview area
         * @returns {Object} bounds (left, top, right, bottom)
         */
        getPreviewBounds: function()
        {
            var bounds      = {},
                contentRect = 
                    this.$.mainWindow.$.content.getBoundingClientRect(),
                cPanelRect  = this.$.controlPanel.getBoundingClientRect();
            
            bounds.left = contentRect.left;
            bounds.top = contentRect.top;
            bounds.right = contentRect.right;
            bounds.bottom = cPanelRect.top;
            
            return bounds;
        },
        
        /**
         * Moves position to next frame
         */
        previousFrame: function()
        {
            this.stepFrame(-1);
        },
        
        /**
         * Event triggered on change of paused
         */
        pausedChanged: function()
        {
            if (this.paused)
            {
                this.fire("pause");
            }
            else
            {
                this.fire("play");
            }
        },
        
        /**
         * Moves position to next frame
         */
        nextFrame: function()
        {
            this.stepFrame(1);
        },
        
        /**
         * Moves position to next / previous frame depending on given direction
         * @param {Number} dir
         */
        stepFrame: function(dir)
        {
            var now = (new Date()).getTime();

            if (this.stepFrameLastCall && now - this.stepFrameLastCall < 250)
            {
                return;
            }

            this.stepFrameLastCall = now;
            
            if (dir === undefined || dir === 0)
            {
                dir = 1;
            }
            
            dir = dir / Math.abs(dir); // normalize

            var video       = this.$.timeline.currentVideo,
                newPosition = this.currenttime + 
                    Math.round(dir * video.timePerFrame);

            this.currenttime = newPosition;

            this.async(function()
            {
                if (this.currentVideo !== video)
                {
                    newPosition = dir > 0 ? 
                        this.currentVideo.offsetStart : 
                        this.currentVideo.offsetStop - 
                            this.currentVideo.timePerFrame;
                }

                if (newPosition > this.duration)
                {
                    newPosition = this.duration;
                }
                
                if (newPosition < 0)
                {
                    newPosition = 0;
                }
                
                this.fire("positionchanged", { position : newPosition });
            });
        },
        
        /**
         * Removes the focused video
         */
        removeVideo: function()
        {
            var args = this.$.timeline.removeVideo();
            
            if (!args)
            {
                return false;
            }

            this.justsaved = false;
            this.$.history.push("remove", args);
        },
        
        /**
         * Cuts the focused video
         */
        splitVideo: function()
        {
            var args = this.$.timeline.splitVideo();

            if (!args)
            {
                return false;
            }
            
            this.justsaved = false;
            this.$.history.push("split", args);
        },
        
        currentVideoChanged: function()
        {
            this.updateSplitEnabled();
        },

        focusedVideoChanged: function()
        {
            this.updateSplitEnabled();  
        },

        currenttimeChanged: function()
        {
            this.updateSplitEnabled();  
        },

        updateSplitEnabled: function()
        {
            if (!this.currentVideo)
            {
                return;
            }
            
            var timePerFrame = this.currentVideo.timePerFrame,
                endBuffer = this.currentVideo.offsetStop - timePerFrame,
                startBuffer = this.currentVideo.offsetStart + timePerFrame;

            this.splitEnabled = this.focusedVideo !== undefined &&  
                this.focusedVideo === this.currentVideo &&
                this.currenttime >= startBuffer &&
                this.currenttime < endBuffer;
        },

        /**
         * Event trigged after resizing a video
         * @param {Object} event
         */
        videoResizeStopped: function(event)
        {
            this.justsaved = false;
            this.$.history.push("resize", event.detail);
        },
        
        /**
         * Shows a message
         * @param {String}   type
         * @param {String}   title
         * @param {String}   message
         * @param {Function} callback
         */
        showMessage: function(type, title, message, callback)
        {
            this.$.message.show(type, title, message, callback);
        },
        
        undo : function()
        {
            var event = this.$.history.pop(),
                type  = event.type,
                args  = event.args,
                video;
            
            switch (type)
            {
                case "add":
                    this.$.timeline.videos[args.video.id].remove();

                    this.$.timeline.configChanged(5);
                    break;
                    
                case "remove":
                    video = this.$.timeline.addVideo.apply(
                        this.$.timeline, 
                        [
                            args.video.filename,
                            args.video.duration,
                            args.video.timePerFrame,
                            args.video.width,
                            args.video.height,
                            args.video.metadata
                        ]
                    );

                    video.id = args.video.id;
                    video.start = args.video.start;
                    video.stop  = args.video.stop;
                    
                    if (args.next)
                    {
                        var next = this.$.timeline.videos[args.next.id];
                        
                        if (next)
                        {
                            next.parentNode.insertBefore(video, next);                            
                        }
                    }

                    video.updateThumbnail("left");

                    this.$.timeline.configChanged(5);
                    break;
                    
                case "split":
                    var currentVideo  = this.$.timeline.videos[args.currentId],
                        splittedVideo = this.$.timeline.videos[args.splittedId];
                    
                    currentVideo.start = splittedVideo.start;
                    currentVideo.updateThumbnail("left");
                    splittedVideo.remove();
                    
                    this.$.timeline.configChanged(5);
                    break;
                    
                case "resize":
                    video = this.$.timeline.videos[args.id];
                    
                    if (args.prevStart !== undefined)
                    {
                        video.start = args.prevStart;
                        video.updateThumbnail("left");
                    }
                    
                    if (args.prevStop !== undefined)
                    {
                        video.stop = args.prevStop;
                        video.updateThumbnail("right");
                    }
                    
                    this.$.timeline.configChanged(5);
                    break;
            }
        },
        
        isOverlayVisible: function()
        {
            return this.progress !== -1 || 
                this.$.message.style.display === "block";
        }
    };
    
    Polymer.call(this, XUIVideoEditor.prototype);
})();