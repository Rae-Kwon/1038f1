const { Op } = require("sequelize");
const db = require("../db");
const Message = require("./message");
const Users = require("./user")

const Conversation = db.define("conversation", {});

// find conversation given two user Ids

Conversation.findConversation = async function () {
	const conversation = await Conversation.findAll({
		include: Users,
		as: 'users'
	})

	// return conversation or null if it doesn't exist
	return conversation;
};

module.exports = Conversation;
