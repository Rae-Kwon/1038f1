import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    marginLeft: 20,
    flexGrow: 1,
  },
  username: {
    fontWeight: 'bold',
    letterSpacing: -0.2,
  },
  seenPreviewText: {
    fontSize: 12,
    color: '#9CADC8',
    letterSpacing: -0.17,
  },
  notSeenPreviewText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000000',
    letterSpacing: -0.17,
  },
}));

const ChatContent = ({ conversation, user }) => {
  const classes = useStyles();

  const { otherUser, messages } = conversation;
  const latestMessageText = conversation.id && conversation.latestMessageText;
  const [otherUserMessages, setOtherUserMessages] = useState([]);

  useEffect(() => {
    const messagesCopy = [...messages];
    const filteredMessages = messagesCopy.filter(
      (message) => message.senderId !== user.id
    );
    setOtherUserMessages(filteredMessages);
  }, [messages, user]);

  const messagesSeen = otherUserMessages.every(
    (message) => message.seenBy.length > 0
  );

  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Typography
          className={
            messagesSeen ? classes.seenPreviewText : classes.notSeenPreviewText
          }
        >
          {latestMessageText}
        </Typography>
      </Box>
    </Box>
  );
};

export default ChatContent;
