var Chat = Em.Application.create();

Chat.Message = Em.Object.extend({
  text: null,
  created_date: null,
  created_by: null,
  room_id: null
});

Chat.User = Em.Object.extend({
  user_name: null,
  room_id: null
});

Chat.Room = Em.Object.extend({
  room_id: null,
  room_name: null
});

Chat.currentUser = Em.Object.create({
  user: null
});

Chat.messagesDataController = Em.ArrayProxy.create({
  content: [],
  add: function(message){
    var modelMessage = Chat.Message.create(message);
    this.addObject(modelMessage);
  }
});

Chat.usersDataController = Em.ArrayProxy.create({
  content: [],
  add: function(user){
    var exists = this.filterProperty('user_name', user.user_name).length,
                                      modelUser = Chat.User.create(user);
    if(exists === 0){
      this.addObject(modelUser);
    }
    return modelUser;
  },
  addMany: function(users){
    for(var x=0; x < users.length; x++){
      this.add(users[x]);
    }
  },
  remove: function(user){
    var targetUser = this.findProperty('user_name', user.user_name);
    this.removeObject(targetUser);
  }
});

Chat.roomsDataController = Em.ArrayProxy.create({
  content: [],
  add: function(room){
    var modelRoom = Chat.Room.create(room);
    this.addObject(modelRoom);
  }
});