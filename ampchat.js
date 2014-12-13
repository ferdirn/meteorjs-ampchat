// Initialize database
Chats = new Mongo.Collection("chats");

if (Meteor.isClient) {

  Template.chatList.helpers({
    'chats' : function() {
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
    }
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
