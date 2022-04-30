import React, { useEffect, useState } from 'react';
import { Badge, Box } from '@material-ui/core';
import { BadgeAvatar, ChatContent } from '../Sidebar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: '0 2px 10px 0 rgba(88,133,196,0.05)',
    marginBottom: 10,
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      cursor: 'grab',
    },
    notificationBadge: {},
  },
}));

const Chat = ({
  conversation,
  user,
  setActiveChat,
  activeConversation,
  handleMessageSeen,
}) => {
  const classes = useStyles();
  const { otherUser, messages } = conversation;
  const [otherUserMessages, setOtherUserMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    let currentUnreadCount = 0;
    messages.forEach((message) => {
      if (
        message.senderId !== user.id &&
        message.conversationId === conversation.id
      ) {
        const userHasSeen = message.seenBy.some((seen) => seen.id === user.id);
        if (!userHasSeen) {
          currentUnreadCount += 1;
        }
      }
    });
    setUnreadCount(currentUnreadCount);
  }, [messages, conversation, user]);

  useEffect(() => {
    if (activeConversation && activeConversation.id !== user.id) {
      handleMessageSeen(messages);
      if (activeConversation.id === otherUser.id) {
        setUnreadCount(0);
      }
    }
  }, [messages, activeConversation, otherUser, handleMessageSeen, user]);

  const handleClick = (conversation) => {
    setActiveChat(conversation.otherUser.id, conversation.otherUser.username);
  };

  return (
    <Box onClick={() => handleClick(conversation)} className={classes.root}>
      <BadgeAvatar
        photoUrl={otherUser.photoUrl}
        username={otherUser.username}
        online={otherUser.online}
        sidebar={true}
      />
      <ChatContent
        conversation={conversation}
        user={user}
        unreadCount={unreadCount}
        otherUserMessages={otherUserMessages}
        setOtherUserMessages={setOtherUserMessages}
        setUnreadCount={setUnreadCount}
      />
      <Badge
        className={classes.notificationBadge}
        badgeContent={unreadCount}
        color="primary"
        max={99}
      />
    </Box>
  );
};

export default Chat;
