// Initialize database
Chats = new Meteor.Collection('chats');

if (Meteor.isClient) {

  Meteor.setInterval(function() {
    Session.set('waktu', Date());
  }, 1000);

  Template.showTime.helpers({
    'waktu' : function() {
      return Session.get('waktu');
    }
  });

  Template.chatList.helpers({
    'chats' : function() {
      Session.get('waktu');
      return Chats.find();
    },
    'relativeTime' : function(dateTime) {
      return moment(dateTime).fromNow();
    }
  });

  Template.chatInput.events({
    'submit .form-chat' : function(event) {
      event.preventDefault();
      var text = event.target.text.value;
      // console.log(text);
      Chats.insert({
        text : text,
        createDate : new Date()
      });
      event.target.text.value = '';
      return false;
    },
    'keydown #text' : function(event) {
      if (event.which == 13) {
        event.preventDefault();
        $('.form-chat').submit();
      }
    }
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
