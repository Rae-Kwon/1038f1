import React, { useEffect, useState } from 'react';
import { Box } from '@material-ui/core';
import { BadgeAvatar, ChatContent } from '../Sidebar';
import { makeStyles } from '@material-ui/core/styles';
import UnreadMessages from './UnreadMessages';

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

  const handleClick = () => {
    setActiveChat(
      conversation.otherUser.id,
      conversation.otherUser.username,
      conversation.id
    );
  };

  useEffect(() => {
    if (
      activeConversation &&
      activeConversation.id !== user.id &&
      activeConversation.conversationId &&
      activeConversation.id === otherUser.id
    ) {
      handleMessageSeen(otherUser, activeConversation);
      setUnreadCount(0);
    }
    // eslint-disable-next-line
  }, [activeConversation, otherUser, handleMessageSeen, user]);

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
      <UnreadMessages
        messages={messages}
        conversation={conversation}
        user={user}
        unreadCount={unreadCount}
        setUnreadCount={setUnreadCount}
      />
    </Box>
  );
};

export default Chat;
