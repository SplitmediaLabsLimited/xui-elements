'use strict';
  Polymer({ 
    is: 'twitch-notification',

    ready: function(){

      this.$.avatar.style.opacity = this.opacity;
      if (this.theme === '1') {
        this.$.notificationWrap.style
        .borderColor = 'rgba(68, 68, 68, ' + this.opacity + ')';
        this.$.notifyHeader.style
        .borderColor = 'rgba(68, 68, 68, ' + this.opacity + ')';
        this.$.notifyBodyWrap.style
        .borderColor = 'rgba(68, 68, 68, ' + this.opacity + ')';
        this.$.overlapBorderFix.style
        .borderColor = 'rgba(68, 68, 68, ' + this.opacity + ')';
        this.$.notifyHeader.style
        .backgroundColor = 'rgba(0, 0, 0, ' + this.opacity + ')';
        this.$.notifyMessage.style
        .backgroundColor = 'rgba(0, 0, 0, ' + this.opacity + ')';
        this.$.notifyUsername.style
        .backgroundColor = 'rgba(33, 33, 33, ' + this.opacity + ')';

      } else if (this.theme === '2') {

        this.$.notificationWrap.style
        .borderColor = 'rgba(238, 238, 238, ' + this.opacity + ')';
        this.$.notifyHeader.style
        .borderColor = 'rgba(238, 238, 238, ' + this.opacity + ')';
        this.$.notifyBodyWrap.style
        .borderColor = 'rgba(238, 238, 238, ' + this.opacity + ')';
        this.$.overlapBorderFix.style
        .borderColor = 'rgba(238, 238, 238, ' + this.opacity + ')';
        this.$.notifyHeader.style
        .backgroundColor = 'rgba(170, 170, 170, ' + this.opacity + ')';
        this.$.notifyMessage.style
        .backgroundColor = 'rgba(170, 170, 170, ' + this.opacity + ')';
        this.$.notifyUsername.style
        .backgroundColor = 'rgba(238, 238, 238, ' + this.opacity + ')';

      this.$.notifyHeader.style
      .color = 'rgba(85, 85, 85, ' + this.opacity + ')';
      this.$.notifyMessage.style
      .color = 'rgba(85, 85, 85, ' + this.opacity + ')';
      this.$.notifyUsername.style
      .color = 'rgba(85, 85, 85, ' + this.opacity + ')';

      } else if (this.theme === '3') {

        this.$.notificationWrap.style
        .borderColor = 'rgba(0, 154, 168, ' + this.opacity + ')';
        this.$.notifyHeader.style
        .borderColor = 'rgba(0, 154, 168, ' + this.opacity + ')';
        this.$.notifyBodyWrap.style
        .borderColor = 'rgba(0, 154, 168, ' + this.opacity + ')';
        this.$.overlapBorderFix.style
        .borderColor = 'rgba(0, 154, 168, ' + this.opacity + ')';
        this.$.notifyHeader.style
        .backgroundColor = 'rgba(0, 103, 115, ' + this.opacity + ')';
        this.$.notifyMessage.style
        .backgroundColor = 'rgba(0, 103, 115, ' + this.opacity + ')';
        this.$.notifyUsername.style
        .backgroundColor = 'rgba(0, 154, 168, ' + this.opacity + ')';

      } else if (this.theme === '4') {

        this.$.notificationWrap.style
        .borderColor = 'rgba(159, 52, 99, ' + this.opacity + ')';
        this.$.notifyHeader.style
        .borderColor = 'rgba(159, 52, 99, ' + this.opacity + ')';
        this.$.notifyBodyWrap.style
        .borderColor = 'rgba(159, 52, 99, ' + this.opacity + ')';
        this.$.overlapBorderFix.style
        .borderColor = 'rgba(159, 52, 99, ' + this.opacity + ')';
        this.$.notifyHeader.style
        .backgroundColor = 'rgba(104, 17, 55, ' + this.opacity + ')';
        this.$.notifyMessage.style
        .backgroundColor = 'rgba(104, 17, 55, ' + this.opacity + ')';
        this.$.notifyUsername.style
        .backgroundColor = 'rgba(159, 52, 99, ' + this.opacity + ')';

      } else if (this.theme === '5') {

        this.$.notificationWrap.style
        .borderColor = 'rgba(131, 0, 196, ' + this.opacity + ')';
        this.$.notifyHeader.style
        .borderColor = 'rgba(131, 0, 196, ' + this.opacity + ')';
        this.$.notifyBodyWrap.style
        .borderColor = 'rgba(131, 0, 196, ' + this.opacity + ')';
        this.$.overlapBorderFix.style
        .borderColor = 'rgba(131, 0, 196, ' + this.opacity + ')';
        this.$.notifyHeader.style
        .backgroundColor = 'rgba(23, 0, 34, ' + this.opacity + ')';
        this.$.notifyMessage.style
        .backgroundColor = 'rgba(23, 0, 34, ' + this.opacity + ')';
        this.$.notifyUsername.style
        .backgroundColor = 'rgba(131, 0, 196, ' + this.opacity + ')';

      } else if (this.theme === '6') {

        this.$.notificationWrap.style
        .borderColor = 'rgba(61, 237, 0, ' + this.opacity + ')';
        this.$.notifyHeader.style
        .borderColor = 'rgba(61, 237, 0, ' + this.opacity + ')';
        this.$.notifyBodyWrap.style
        .borderColor = 'rgba(61, 237, 0, ' + this.opacity + ')';
        this.$.overlapBorderFix.style
        .borderColor = 'rgba(61, 237, 0, ' + this.opacity + ')';
        this.$.notifyHeader.style
        .backgroundColor = 'rgba(35, 98, 13, ' + this.opacity + ')';
        this.$.notifyMessage.style
        .backgroundColor = 'rgba(35, 98, 13, ' + this.opacity + ')';
        this.$.notifyUsername.style
        .backgroundColor = 'rgba(0, 0, 0, ' + this.opacity + ')';

      }


      this.$.notifyHeader.style
      .color = 'rgba(255, 255, 255, ' + this.opacity + ')';
      this.$.notifyMessage.style
      .color = 'rgba(255, 255, 255, ' + this.opacity + ')';
      this.$.notifyUsername.style
      .color = 'rgba(255, 255, 255, ' + this.opacity + ')';

      this.$.notificationWrap.style
      .top=this.top + 'px';
      this.$.notificationWrap.style
      .left=this.left + 'px';
      this.$.notificationWrap.style
      .width=this.width + 'px';
      this.$.notificationWrap.style
      .height=this.height + 'px';

      this.widthChanged();
    },

    /* BEGIN DEBUG */
    sizeTest : function()
    {
      this.width = 180;

      setInterval(function()
      {
        var temp = parseInt(this.width) + 1;
        if (temp == 854)
        {
          temp = 180;
        }
        this.width = temp;
      }.bind(this), 5);
    },

    themeTest : function()
    {
      this.theme = 1;

      setInterval(function()
      {
        var temp = parseInt(this.theme) + 1;
        if (temp > 6)
        {
          temp = 1;
        }
        this.theme = temp;
      }.bind(this), 800);
    },

    typeTest : function()
    {
      this.type = 'follower';

      setInterval(function()
      {
        if (this.type === 'follower')
        {
          this.type = 'subscriber';
        }
        else
        {
          this.type = 'follower';
        }
      }.bind(this), 1400);
    },

    opacityTest : function()
    {
      this.opacity = 1;

      setInterval(function()
      {
        var temp = this.opacity + 0.01;
        if (temp > 1)
        {
          temp = 0.01;
        }
        this.opacity = temp;
      }.bind(this), 30);
    },
    /* END DEBUG */

    properties:
    {
      type : {
        type : String,
        value : 'follower',
        reflectToAttribute : true
      },
      layout : {
        value : 1,
        reflectToAttribute : true
      },
      theme : {
        value : 1,
        reflectToAttribute : true
      },
      opacity : {
        value : 1,
        reflectToAttribute : true
      },
      top : {
        type : String,
        value : '0',
        reflectToAttribute : true
      },
      left : {
        type : String,
        value : '0',
        reflectToAttribute : true
      },
      width : {
        type : String,
        value : '180',
        reflectToAttribute : true
      },
      height : {
        type : String,
        value : '72',
        reflectToAttribute : true
      }
    },

    recalculateSizes : function()
    {
      var width = this.width;

      var header = this.$.notifyHeader;
      var user = this.root.querySelector('#notifyUsername span');
      var message = this.root.querySelector('#notifyMessage span');
      // calculated from the samples from design,
      // to get close to the correct font size for that width
      header.style.fontSize = (width * 0.04215) + 'px';
      user.style.fontSize = (width * 0.05855) + 'px';
      message.style.fontSize = (width * 0.04447) + 'px';
    },

    rescale : function()
    {
      if (this.width > 854)
      {
        this.width = 854;
      }

      if (this.width < 180)
      {
        this.width = 180;
      }
      // aspect ratio of 180:72
      // w1/h1 = w2/h2 = 180/72 = newWidth/calculateHeight
      this.height = (72/180)*this.width;
    },

    widthChanged : function()
    {
      this.rescale();
      this.recalculateSizes();
    },

    setPosition : function(left, top)
    {
      this.setAttribute('left', left);
      this.setAttribute('top', top);
    },

    setSize : function(width, height)
    {
      this.setAttribute('width', width);
      // ignore height because we keep aspect ratio
    },

    setType : function(type)
    {
      this.type = type;

      var header = this.root.querySelector('#notifyHeader span');
      var user = this.root.querySelector('#notifyUsername span');
      var avatar = this.root.getElementById('avatar');
      var footer = this.root.querySelector('#notifyMessage span');

      if (type === 'follower')
      {
        header.textContent = this.followerHeaderText;

        this.layout = this.followerLayout;
        this.theme = this.followerTheme;
        this.opacity = this.followerOpacity;

        user.textContent = this.followerUser;

        avatar.style.backgroundImage = this.followerAvatar;

        footer.textContent = this.followerMessage;
      }
      else if (type === 'subscriber')
      {
        header.textContent = this.subscriberHeaderText;

        this.layout = this.subscriberLayout;
        this.theme = this.subscriberTheme;
        this.opacity = this.subscriberOpacity;

        user.textContent = this.subscriberUser;

        avatar.style.backgroundImage = this.subscriberAvatar;

        footer.textContent = this.subscriberMessage;
      }
    },

    setLayout : function(type, layout)
    {
      if (type === 'follower')
      {
        this.followerLayout = layout;
      }
      else if (type === 'subscriber')
      {
        this.subscriberLayout = layout;
      }

      if (this.type === type)
      {
        this.layout = layout;
      }
    },

    setTheme : function(type, theme)
    {
      if (type === 'follower')
      {
        this.followerTheme = theme;
      }
      else if (type === 'subscriber')
      {
        this.subscriberTheme = theme;
      }

      if (this.type === type)
      {
        this.theme = theme;
      }
    },

    setOpacity : function(type, opacity)
    {
      if (type === 'follower')
      {
        this.followerOpacity = opacity;
      }
      else if (type === 'subscriber')
      {
        this.subscriberOpacity = opacity;
      }

      if (this.type === type)
      {
        this.opacity = opacity;
      }
    },

    setVisibility : function(type, visibility)
    {
      if (type === 'follower')
      {
        this.followerVisibility = visibility;
      }
      else if (type === 'subscriber')
      {
        this.subscriberVisibility = visibility;
      }

      if (this.type === type)
      {
        if (visibility === '1')
        {
          this.show();
        }
        else if (visibility === '0')
        {
          this.hide();
        }
      }
    },

    show : function()
    {
      this.removeAttribute('hidden');
    },

    hide : function()
    {
      this.setAttribute('hidden', '');
    },

    // should only be called once. on startup, for localization
    setHeaderText : function(type, text)
    {
      if (type === 'follower')
      {
        this.followerHeaderText = text;
      }
      else if (type === 'subscriber')
      {
        this.subscriberHeaderText = text;
      }

      var header = this.root.querySelector('#notifyHeader span');
      header.textContent = text;
    },

    setUsername : function(type, username)
    {
      if (type === 'follower')
      {
        this.followerUser = username;
      }
      else if (type === 'subscriber')
      {
        this.subscriberUser = username;
      }

      if (this.type === type)
      {
        var user = this.root.querySelector('#notifyUsername span');
        user.textContent = username;
      }
    },

    setAvatar : function(type, image)
    {
      if (type === 'follower')
      {
        this.followerAvatar = image;
      }
      else if (type === 'subscriber')
      {
        this.subscriberAvatar = image;
      }

      if (this.type === type)
      {
        var avatar = this.root.getElementById('avatar');
        avatar.style.backgroundImage = image;
      }
    },

    setFooterText : function(type, text)
    {
      if (type === 'follower')
      {
        this.followerMessage = text;
      }
      else if (type === 'subscriber')
      {
        this.subscriberMessage = text;
      }

      if (this.type === type)
      {
        var footer = this.root.querySelector('#notifyMessage span');
        footer.textContent = text;
      }
    },

    getFooterElement : function(text)
    {
      var footer = this.root.querySelector('#notifyMessage span');
      return footer;
    },

    beginFooterEdit : function(text)
    {
      var footer = this.root.querySelector('#notifyMessage span');
      footer.setAttribute('contentEditable', 'plaintext-only');
      footer.focus();

      // move caret to end http://stackoverflow.com/questions/1125292/how-to-move-cursor-to-end-of-contenteditable-entity
      var range,selection;
      range = document.createRange();//Create a range (a range is a like the selection but invisible)
      range.selectNodeContents(footer);//Select the entire contents of the element with the range
      range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
      selection = window.getSelection();//get the selection object (allows you to change selection)
      selection.removeAllRanges();//remove any selections already made
      selection.addRange(range);//make the range you have just created the visible selection
    },

    endFooterEdit : function()
    {
      var footer = this.root.querySelector('#notifyMessage span');
      footer.removeAttribute('contentEditable');
      footer.blur();
    }
  });
