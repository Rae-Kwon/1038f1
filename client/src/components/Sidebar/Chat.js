import React, { useEffect } from 'react';
import { Box } from '@material-ui/core';
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
  },
}));

const Chat = ({
  conversation,
  user,
  setActiveChat,
  updateMessage,
  activeConversation,
  handleMessageSeen
}) => {
  const classes = useStyles();
  const { otherUser, messages } = conversation;

  useEffect(() => {
    if (activeConversation && activeConversation.id !== user.id) {
      handleMessageSeen(messages)
    }
  }, [messages, activeConversation, handleMessageSeen, user])

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
      <ChatContent conversation={conversation} user={user} />
    </Box>
  );
};

export default Chat;
