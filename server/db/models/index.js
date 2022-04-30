const Conversation = require("./conversation");
const User = require("./user");
const UserConversations = require('./userConversations')
const Message = require("./message");

// associations

User.hasMany(Conversation)
Conversation.belongsTo(User, { as: "user1" });
Conversation.belongsTo(User, { as: "user2" });
Message.belongsTo(Conversation);
Conversation.hasMany(Message);

// Many-to-many relationship between users table and conversations table
User.belongsToMany(Conversation, { through: UserConversations, as: "users" });
Conversation.belongsToMany(User, { through: UserConversations });

module.exports = {
  User,
  Conversation,
  Message,
  UserConversations
};
