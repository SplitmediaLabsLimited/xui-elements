/* globals Polymer */
  'use strict';
  Polymer({
    is: 'chat-source', 

    properties: {
      messages : [],
      pendingMessages : {},
      fontSize: {
        type: String,
        value: 'large',
        reflectToAttribute: true
      },
      viewerColor: {
        type: String,
        value: '#000',
        reflectToAttribute: true
      },
      messageColor: {
        type: String,
        value: '#000',
        reflectToAttribute: true
      },
      opacity: {
        type: Number,
        value: 1,
        reflectToAttribute: true
      },
      width: {
        type: Number,
        value: 10,
        reflectToAttribute: true
      },
      height: {
        type: Number,
        value: 10,
        reflectToAttribute: true
      },
      top: {
        type: Number,
        value: 0,
        reflectToAttribute: true
      },
      left: {
        type: Number,
        value: 0,
        reflectToAttribute: true
      }
    },

    ready: function(){
      this.$.chatWrap.style
        .border='1px solid rgba(0, 0, 0,' + this.opacity + ')';
      this.$.messageContainer
        .style.background='rgba(0, 0, 0,' + this.opacity + ')';
      /* BEGIN DEBUG */
      this.$.chatWrap.style.top=this.top;
      this.$.chatWrap.style.left=this.left;
      this.$.chatWrap.style.width=this.width;
      this.$.chatWrap.style.height=this.height;
      document.querySelector('.sender')
        .style.color=this.viewerColor;
      document.querySelector('.messageBody')
        .style.color=this.messageColor;
      /* END DEBUG */
    },

    messagesChanged : function()
    {
      // only scroll to bottom if we are already looking at the bottom
      var container = this.$.messageContainer;
      this.async(this.scrollToBottom);
    },

    scrollToBottom : function()
    {
      // scroll to new message
      var container = this.$.messageContainer;
      container.scrollTop = container.scrollHeight -
        container.offsetHeight;
    },

    addMessage : function(message)
    {
      this.messages.push(message);
    },

    addPendingMessage : function(message)
    {
      this.pendingMessages[message.id] = message;
    },

    showPendingMessage : function(id)
    {
      this.messages.push(this.pendingMessages[id]);
      delete this.pendingMessages[id];
    },

    setSize : function(width, height)
    {
      this.setAttribute('width', width);
      this.setAttribute('height', height);
    },

    setPosition: function(left, top)
    {
      this.setAttribute('left', left);
      this.setAttribute('top', top);
    },

    show: function()
    {
      this.removeAttribute('hidden');
    },

    hide: function()
    {
      this.setAttribute('hidden', '');
    },

    clearMessages : function()
    {
      this.messages = [];
      this.pendingMessages = {};
    }
  });