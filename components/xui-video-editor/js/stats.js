/* globals Polymer */

(function()
{
	"use strict";

	function XVEStats()
	{
		this.currenttime   = 0;
		this.duration      = 0;
		this.orderedVideos = [];
		this.videos        = {};
	}

	XVEStats.prototype = 
	{
		ready: XVEStats,

		videosChanged: function()
		{
			this.orderedVideos = [];

			for (var id in this.videos)
			{
				this.orderedVideos.push(this.videos[id]);
			}

			this.orderedVideos.sort(function(a, b)
			{
				return a.offsetStart - b.offsetStart;
			});
		},

		formatTimeFrame: function(time)
		{
			var centiSeconds = time / (10 * 1000),
	            seconds      = centiSeconds / 100,
	            minutes      = seconds / 60,
	            hours        = parseInt(minutes / 60);

	        // parse and get modulo
	        seconds       = parseInt(seconds % 60);
	        minutes       = parseInt(minutes % 60);
	        hours         = parseInt(hours).toString();

	        // pad
	        seconds       = String("00" + seconds).slice(-2);
	        minutes       = String("00" + minutes).slice(-2);
	        hours         = hours.toString().length >= 2 ? hours :
	                            String("00" + hours).slice(-2);

	        // calculate frames
	        var ONE_SECOND    = 1000 * 1000,
	        	frames        = 0,
	        	timeSecond    = Math.floor(time / ONE_SECOND) * ONE_SECOND,
	        	timeSecondEnd = timeSecond + ONE_SECOND;

	        var i = 0;

	        for (;this.orderedVideos && i < this.orderedVideos.length; i++)
	        {
	        	var video = this.orderedVideos[i];

	        	if (timeSecond > video.offsetStop)
	        	{
	        		continue;
	        	}

	        	if (time < video.offsetStart)
	        	{
	        		break;
	        	}

	        	var remainder = 0;

	        	// time range is within
	        	if (
	        		timeSecond >= video.offsetStart && 
	        		timeSecondEnd <= video.offsetStop
	        	)
	        	{
	        		remainder = time - timeSecond;		
	        	}
	        	// time range is partially at the start of video
	        	else if (timeSecond < video.offsetStart)
	        	{
	        		remainder = time - video.offsetStart;
	        	}
	        	// time range is partially at the stop of the video
	        	else
	        	{
	        		if (time <= video.offsetStop)
	        		{
	        			remainder = time - timeSecond;
	        		}
	        		else
	        		{
	        			remainder = video.offsetStop - timeSecond;
	        		}
	        	}

	        	frames += Math.floor(remainder / video.timePerFrame);
	        }

	        frames        = String("00" + frames).slice(-2);

	        return hours + ":" + minutes + ":" + seconds + ":" + frames;
		}
	};

    Polymer.call(this, XVEStats.prototype);
})();
