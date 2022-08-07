import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { MessageBodyType, MessageType } from '../../../../../../classes/TextConversation';
import TextMessage from './TextMessage/TextMessage';
import ImageMessage from './ImageMessage/ImageMessage';
import UrlMessage from './UrlMessage/UrlMessage';
import FileMessage from './FileMessage/FileMessage';

const useStyles = makeStyles({
  messageContainer: {
    borderRadius: '16px',
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.5em 0.8em 0.6em',
    margin: '0.3em 0 0',
    wordBreak: 'break-word',
    backgroundColor: '#E1E3EA',
    hyphens: 'auto',
    whiteSpace: 'pre-wrap',
  },
  globalMessage: { backgroundColor: '#c5ddb2', },
  toGlobalMessage: { backgroundColor: '#a1c984', },
  groupMessage: { backgroundColor: '#a8d5e5', },
  toGroupMessage: { backgroundColor: '#66b6d2', },
  directMessage: { backgroundColor: '#ffeebf', },
  toDirectMessage: { backgroundColor: '#ffe08c', },
  isAuthor: {
    justifyContent: 'right',
    display: 'flex'
  }
});

interface MessageItemProps {
  body: string;
  bodyType: MessageBodyType;
  isLocalParticipant: boolean;
  messageType: MessageType;
}

export default function MessageItem({ body, bodyType, isLocalParticipant, messageType }: MessageItemProps) {
  const classes = useStyles();

  return (
    <div className={clsx({ [classes.isAuthor]: isLocalParticipant })}>
      <div
        className={clsx(classes.messageContainer, {
          // [classes.isLocalParticipant]: isLocalParticipant,
          [classes.globalMessage]: messageType === MessageType.GLOBAL_MESSAGE && !isLocalParticipant,
          [classes.toGlobalMessage]: messageType === MessageType.GLOBAL_MESSAGE && isLocalParticipant,
          [classes.groupMessage]: messageType === MessageType.GROUP_MESSAGE && !isLocalParticipant,
          [classes.toGroupMessage]: messageType === MessageType.GROUP_MESSAGE && isLocalParticipant,
          [classes.directMessage]: messageType === MessageType.DIRECT_MESSAGE && !isLocalParticipant,
          [classes.toDirectMessage]: messageType === MessageType.DIRECT_MESSAGE && isLocalParticipant,
        })}
      >
        {bodyType === MessageBodyType.TEXT ? <TextMessage text={body}/> 
            : bodyType === MessageBodyType.IMAGE ? <ImageMessage src={body}/> 
            : bodyType === MessageBodyType.URL ? <UrlMessage src={body}/>
            : bodyType === MessageBodyType.FILE ? <FileMessage src={body}/> 
            : <div/>}
      </div>
    </div>
  );
}
