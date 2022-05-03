const Conversation = require("./conversation");
const User = require("./user");
const UserConversations = require("./userConversations");
const Message = require("./message");

// Many-to-many relationship between users table and conversations table
User.belongsToMany(Conversation, { through: UserConversations, as: "users" });
Conversation.belongsToMany(User, { through: UserConversations });

User.hasMany(Conversation);
Message.belongsTo(Conversation);
Conversation.hasMany(Message);

module.exports = {
	User,
	Conversation,
	Message,
	UserConversations,
};
