/* globals window, document, Polymer, XVEVideo */

(function()
{
    "use strict";

    // private
    var videoAutoIncrementalID = 0;
    
    /**
     * Creates an instance of the XVETimeline class
     */
    function XVETimeline()
    {
        this.videos            = {};
        this.videoBoundaries   = {};
        this.rulerIntervals    = [];
        this.timeInterval      = 0;
        this.pixelInterval     = 0;
        this.updateInterval    = 0;
        this.zoom              = 1;
        this.length            = 4 * XVETimeline.ONE_HOUR;
        this.paused            = true;
        this.currenttime       = 0;
        this.duration          = 0;
        this.currentResolution = "--";
        this.currentAudioSetting = "--";
    }
    
    // microseconds to one second
    XVETimeline.ONE_SECOND = 1000 * 1000; 
    
    // microseconds to one minute
    XVETimeline.ONE_MINUTE = XVETimeline.ONE_SECOND * 60; 
    
    // microseconds to one hour
    XVETimeline.ONE_HOUR = XVETimeline.ONE_MINUTE * 60; 
    
    XVETimeline.ZOOM_CONFIG = 
    [
        [15 * XVETimeline.ONE_MINUTE, 180],
        [5 * XVETimeline.ONE_MINUTE,  120],
        [5 * XVETimeline.ONE_MINUTE,  240],
        [1 * XVETimeline.ONE_MINUTE,  96],
        [30 * XVETimeline.ONE_SECOND, 90],
        [15 * XVETimeline.ONE_SECOND, 90],
        [15 * XVETimeline.ONE_SECOND, 195],
        [5 * XVETimeline.ONE_SECOND,  130],
        [5 * XVETimeline.ONE_SECOND,  260],
        [1 * XVETimeline.ONE_SECOND,  96]
    ];

    XVETimeline.prototype =
    {
        ready: XVETimeline,
        
        /**
         * Event triggered on change of length
         */
        lengthChanged: function()
        {
            if (this.timeInterval)
            {
                var intervalCount =  Math.ceil(
                    this.length / this.timeInterval
                );

                this.rulerIntervals = [];

                for (var i = 1; i <= intervalCount; i++)
                {
                    this.rulerIntervals.push(i);
                }
            }
        },
        
        /**
         * Event triggered on change of zoom
         */
        zoomChanged: function()
        {
            if (this.zoom > XVETimeline.ZOOM_CONFIG.length)
            {
                this.zoom = XVETimeline.ZOOM_CONFIG.length;
            }

            if (this.zoom <= 0)
            {
                this.zoom = 1;
            }

            this.updateInterval = (1 / this.zoom) * XVETimeline.ONE_SECOND;

            this.timeInterval = XVETimeline.ZOOM_CONFIG[this.zoom - 1][0];
            this.pixelInterval = XVETimeline.ZOOM_CONFIG[this.zoom - 1][1];

            this.lengthChanged();
            this.pausedChanged();
            
            /*
             * Compatibility fixes for Chromium 33
             */
            if (this.timeInterval === 0)
            {
                return;
            }
            
            var STYLE_TEMPLATE = 
                "* /deep/ xve-timeline, " +
                "* /deep/ xve-timeline /deep/ #fileList xve-video, " +
                "* /deep/ xve-timeline /deep/ #fileList xve-video /deep/ #cuepoints li, " +
                "* /deep/ xve-timeline /deep/ #pin " +
                "{ " +
                "    font-size: %pixelsPerTime%; " +
                "} " +
                "xve-timeline, " +
                "xve-timeline #fileList xve-video, " +
                "xve-timeline #fileList xve-video #cuepoints li, " +
                "xve-timeline #pin " +
                "{ " +
                "    font-size: %pixelsPerTime%; " +
                "}";
            
            var pixelsPerTime = this.pixelInterval / this.timeInterval;
            
            var fontSizeStyle = STYLE_TEMPLATE.replace(
                /%pixelsPerTime%/g, pixelsPerTime.toFixed(9) + "px"
            );
            
            var fontSizeStyleElement = document.getElementById("fontSizeStyle");
            
            if (!fontSizeStyleElement)
            {
                fontSizeStyleElement = document.createElement("style");
                fontSizeStyleElement.setAttribute("id", "fontSizeStyle");
                
                document.head.appendChild(fontSizeStyleElement);
            }
            
            fontSizeStyleElement.innerHTML = fontSizeStyle;
            
            this.$.ruler.style.paddingLeft = (this.pixelInterval / 2) + "px";
        },

        /**
         * Event triggered on change of paused
         */
        pausedChanged: function()
        {
            // BEGIN DEBUG
            
            window.clearInterval(this.pausedInterval);
            
            if (this.paused)
            {
                return;
            }
            
            var timeline = this;

            function updateTime()
            {
                var newTime = timeline.currenttime + timeline.updateInterval;
                
                if (newTime > timeline.duration)
                {
                    newTime = timeline.duration;
                    
                    timeline.paused = true;
                }
                
                timeline.currenttime = newTime;
            }
            
            this.pausedInterval = window.setInterval(
                updateTime, this.updateInterval / 1000 
            );
            
            // END DEBUG
        },
        
        /**
         * Event triggered on change of current time
         */
        currenttimeChanged: function()
        {
            this.$.pin.style.left = this.currenttime + "em";
            
            var prevBoundary;

            for (var boundary in this.videoBoundaries)
            {
                if (!isNaN(boundary) && boundary > this.currenttime)
                {
                    var video = this.videoBoundaries[prevBoundary];
                    this.highlightVideo(video);
                    break;
                }

                prevBoundary = boundary;
            }

            var viewportRight = this.scrollLeft + this.clientWidth,
                pinLocation   = this.$.pin.offset().left;

            if (pinLocation > viewportRight + 10)
            {
                this.scrollLeft = viewportRight - 10;
            }

            if (pinLocation < this.scrollLeft + 10)
            {
                this.scrollLeft = this.scrollLeft - this.clientWidth + 10;    
            }
        },
        
        /**
         * Event triggered on click of the ruler
         * @param {Object} event
         */
        rulerClicked: function(event)
        {
            var x = event.offsetX + event.target.offset().left -      
                this.$.ruler.offset().left;
            
            var pixelsPerTime = this.pixelInterval / this.timeInterval,
                currenttime   = x / pixelsPerTime;
            
            if (currenttime > this.duration)
            {
                return;
            }
            
            this.currenttime = currenttime;
            
            this.fire("positionchanged", { position : this.currenttime });

            this.$.pin.startSlide.call(this.$.pin, event);
        },
        
        /**
         * Event triggered on click of cuepoints
         * @param {[[Type]]} event [[Description]]
         */
        cuepointClicked: function(event)
        {
            var video        = event.detail.video,
                timestamp    = event.detail.timestamp,
                currentVideo = video,
                position     = timestamp - video.start;
            
            while (currentVideo.previousSibling)
            {
                currentVideo = currentVideo.previousSibling;
                
                position += currentVideo.stop - currentVideo.start;
            }
            
            this.currenttime = position;
            
            this.fire("positionchanged", { position : position });
        },
        
        /**
         * Adds video to the video editor
         * @param {String} filename
         * @param {Number} duration (in microseconds)
         * @param {Number} timerPerFrame
         * @param {Number} width
         * @param {Number} height
         * @param {String} audioSetting
         * @param {String} metadata
         */
        addVideo: function(filename, duration, 
            timePerFrame, width, height, audioSetting, metadata)
        {
            var fileVideo           = new XVEVideo();
            fileVideo.id            = ++videoAutoIncrementalID;
            fileVideo.filename      = filename;
            fileVideo.duration      = duration;
            fileVideo.stop          = duration;
            fileVideo.timePerFrame  = Math.round(timePerFrame);
            fileVideo.width         = width;
            fileVideo.height        = height;
            fileVideo.audioSetting  = audioSetting;
            fileVideo.metadata      = metadata;

            if (this.duration === 0)
            {
            	// detect appropriate zoom level
            	var appropriateZoom = 1;

                for (var i = 0; i < XVETimeline.ZOOM_CONFIG.length; i++)
                {
                    var config        = XVETimeline.ZOOM_CONFIG[i],
                        timeInterval  = config[0],
                        pixelInterval = config[1],
                        viewportDuration =  timeInterval * this.offsetWidth / 
                            pixelInterval;

                    if (fileVideo.duration < viewportDuration)
                    {
                        appropriateZoom = i + 1;

                        continue;
                    }

                    break;
                }

                this.job("set-zoom", function()
                {
                	this.zoom = appropriateZoom;
                }, 100);
            }

            this.$.fileList.appendChild(fileVideo);

            if (this.focusedVideo === undefined)
            {
                fileVideo.focus();
            }
            
            this.configChanged();
            
            fileVideo.updateThumbnail();
            
            return fileVideo;
        },
        
        /**
         * Highlights the given video
         * @param {Number} id / video object
         */
        highlightVideo: function(id)
        {
            for (var _id in this.videos)
            {
                var video = this.videos[_id];
                
                if (_id === id || video === id)
                {
                    this.currentVideo = video;
                    
                    this.currentAudioSetting = video.audioSetting;
                    this.currentResolution = video.width + " x " + video.height;
                    
                    video.focus();

                    break;
                }
            }
        },
        
        videoFocused: function(event)
        {
            this.focusedVideo = event.detail.video;
            
            for (var key in this.videos)
            {
                var video = this.videos[key];
                
                if (video !== this.focusedVideo)
                {
                    video.unFocus();
                }
            }
        },
        
        /**
         * Event triggered on change of config
         */
        configChanged: function(flag)
        {
            // reset videos and boundaries
            this.videos = {};
            this.videoBoundaries = {};
            this.duration = 0;
            this.durationFrame = 0;
            this.currentResolution = "--";
            this.currentAudioSetting = "--";
            
            var video = this.$.fileList.firstChild;
 
            while (video)
            {
                this.videos[video.id] = video;

                video.offsetStart = this.duration;
                video.offsetStartFrame = this.durationFrame;
                video.offsetStop  = video.offsetStart + 
                    video.stop - video.start;

                this.duration = video.offsetStop;

                var boundaryStart = video.offsetStart === 0 ? 
                        0 : video.offsetStart;

                this.videoBoundaries[boundaryStart] = video;
                this.videoBoundaries[video.offsetStop - video.timePerFrame] = video;

                video = video.nextElementSibling;
            }
            
            if (this.currenttime > this.duration)
            {
                // BEGIN DEBUG
                this.currenttime = this.duration;
                // END DEBUG
                
                this.fire("positionchanged", { position : this.duration });
            }
            
            this.currenttimeChanged();

            if (flag !== false)
            {
                this.fire("configchanged", { flag: flag });    
            }
        },
        
        /**
         * Event triggered on change of duration
         */
        durationChanged: function()
        {
            var durationHours = 
                    Math.round(this.duration / XVETimeline.ONE_HOUR),
                newLength = (durationHours + 1) * XVETimeline.ONE_HOUR;
            
            if (newLength > this.length)
            {
                this.length = newLength;
            }
        },
        
        /**
         * Removes the focused video
         */
        removeVideo: function()
        {
            if (!this.focusedVideo)
            {
                return false;
            }

            var sibling = this.focusedVideo.nextElementSibling;
            
            if (sibling === null)
            {
                sibling = this.focusedVideo.previousElementSibling;
            }
            
            var video = Object.create(this.focusedVideo),
                next  = this.focusedVideo.nextElementSibling;
            
            next = next ? Object.create(next) : next;
            
            this.focusedVideo.remove();
            
            if (sibling !== null)
            {
                sibling.focus();
            }
            else
            {
                this.focusedVideo = undefined;    
            }
            
            this.configChanged(1); // delete flag
            
            return { video: video, next: next };
        },
        
        /**
         * Splits the current video
         */
        splitVideo: function()
        {
            if (!this.currentVideo || 
                this.currentVideo !== this.focusedVideo ||
                this.currenttime === 0 ||
                this.videoBoundaries[this.currenttime] !== undefined)
            {
                return false;
            }
            
            var history = {};
            
            var fileVideo           = new XVEVideo();
            fileVideo.id            = ++videoAutoIncrementalID;
            fileVideo.filename      = this.currentVideo.filename;
            fileVideo.duration      = this.currentVideo.duration;
            fileVideo.timePerFrame  = this.currentVideo.timePerFrame;
            fileVideo.width         = this.currentVideo.width;
            fileVideo.height        = this.currentVideo.height;
            fileVideo.audioSetting  = this.currentVideo.audioSetting;
            fileVideo.metadata      = this.currentVideo.metadata;
            fileVideo.firstframe    = this.currentVideo.firstframe;
            this.currentVideo.firstframe = "";

            var offsetTime = this.currenttime - this.currentVideo.offsetStart,
                remainder  = offsetTime % this.currentVideo.timePerFrame;

            offsetTime -= remainder;
            remainder = Math.round(remainder / this.currentVideo.timePerFrame);
            remainder = remainder * this.currentVideo.timePerFrame;
            offsetTime += remainder;
            offsetTime = Math.round(offsetTime);

            this.currenttime = this.currentVideo.offsetStart + offsetTime;
            
            history.currentId  = this.currentVideo.id;
            history.splittedId = fileVideo.id;
            
            this.currentVideo.parentNode.insertBefore(
                fileVideo, this.currentVideo
            );
            
            fileVideo.stop = this.currentVideo.start + offsetTime;
            fileVideo.updateThumbnail("right");
            
            fileVideo.start = this.currentVideo.start;
            this.currentVideo.start = fileVideo.stop;

            var jobArgs = 
            { 
                currentVideo: this.currentVideo, 
                fileVideo: fileVideo 
            };
            
            this.job("updatethumbnail", (function()
            {
                if (this.fileVideo.lastframe)
                {
                    this.currentVideo.firstframe = this.fileVideo.lastframe;
                }
                else
                {
                    this.currentVideo.updateThumbnail("left");
                }
            }).bind(jobArgs), 500);
            
            this.configChanged(4); // split event
            
            return history;
        },
        
        /**
         * Event triggered on move of a video
         * 
         * @param  {Object} event
         */
        videoMoved: function(event)
        {
            var droppedVideo = this.$.fileList.querySelector(".over");
            
            if (droppedVideo)
            {
                droppedVideo.classList.remove("over");
             
                if (droppedVideo.classList.contains("left"))
                {
                    this.$.fileList.insertBefore(
                        event.detail.video, droppedVideo
                    );    
                }
                else
                {
                    this.$.fileList.appendChild(event.detail.video);
                }

                droppedVideo.classList.remove("left");
                droppedVideo.classList.remove("right");
                
                this.configChanged(3); // move event
            }
        },
        
        /**
         * Event triggered on start of video resize
         */
        videoResizeStarted: function()
        {
            this.recentPausedState = this.paused;
            
            this.paused = true;
        },

        /**
         * Event triggered during resize of a video
         */
        videoResized: function()
        {
            this.configChanged(false);
        },
        
        /**
         * Event triggered on stop of video resize
         */
        videoResizeStopped: function()
        {
            this.paused = this.recentPausedState;
        },

        /**
         * Event triggered on click of a video
         * 
         * @param  {Object} event
         */
        videoClicked: function(event)
        {
            if (
                event.target instanceof XVEVideo &&
                this.paused)
            {
                event.target.focus();
            }
        },

        /**
         * Event triggerd during dragging of videos
         */
        draggedOver: function(event)
        {
            if (event.path[0] !== this.$.fileList)
            {
                return;
            }

            var videos    = this.$.fileList.children,
                lastVideo = videos[videos.length - 1];

            lastVideo.moveOver.call(lastVideo, event, "right");
        }
    };
    
    Polymer.call(this, XVETimeline.prototype);
})();