const Sequelize = require('sequelize')
const db = require('../db')
const User = require('./user')
const Conversation = require('./conversation')

const UserConversations = db.define('user_conversations', {
    UserId: {
        type: Sequelize.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    ConversationId: {
        type: Sequelize.INTEGER,
        references: {
            model: Conversation,
            key: 'id'
        }
    }
})

module.exports = UserConversations