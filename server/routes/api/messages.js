const router = require("express").Router();
const { Sequelize, Op } = require("sequelize");
const { Conversation, Message } = require("../../db/models");
const onlineUsers = require("../../onlineUsers");

// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post("/", async (req, res, next) => {
	try {
		if (!req.user) {
			return res.sendStatus(401);
		}
		const senderId = req.user.id;

		const { recipientId, text, conversationId, sender } = req.body;

		// if we already know conversation id, we can save time and just add it to message and return
		if (conversationId) {
			const message = await Message.create({
				senderId,
				text,
				conversationId,
				seenBy: [],
			});
			return res.json({ message });
		}
		// if we don't have conversation id, find a conversation to make sure it doesn't already exist
		let conversation = await Conversation.findConversation(
			senderId,
			recipientId
		);

		if (!conversation) {
			// create conversation
			conversation = await Conversation.create({
				user1Id: senderId,
				user2Id: recipientId,
			});
			if (onlineUsers.includes(sender.id)) {
				sender.online = true;
			}
		}
		const message = await Message.create({
			senderId,
			text,
			conversationId: conversation.id,
			seenBy: [],
		});
		res.json({ message, sender });
	} catch (error) {
		next(error);
	}
});

router.put("/", async (req, res, next) => {
	try {
		const { messages, otherUser, conversationId, user } = req.body;
		if (!req.user && !otherUser) {
			return res.sendStatus(404);
		}

		const message = await Promise.all(
			messages.map(async (msg) => {
				await Message.update(
					{ seenBy: msg.seenBy },
					{
						where: {
							conversationId,
							seenBy: [],
							senderId: { [Op.not]: user.id },
						},
					}
				);
			})
		);
		res.json({ message });
	} catch (error) {
		next(error);
	}
});

module.exports = router;
