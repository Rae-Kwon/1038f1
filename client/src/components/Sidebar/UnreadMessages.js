import { Badge } from '@material-ui/core';
import React, { useEffect } from 'react';

function UnreadMessages({
  messages,
  conversation,
  user,
  unreadCount,
  setUnreadCount,
}) {
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
  }, [conversation, messages, user, setUnreadCount]);

  return <Badge badgeContent={unreadCount} color="primary" max={99} />;
}
export default UnreadMessages;
