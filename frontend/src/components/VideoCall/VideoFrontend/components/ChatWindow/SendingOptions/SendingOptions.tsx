import React, { useCallback, useEffect, useMemo, useState } from 'react';

import {
  Box,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import useMaybeVideo from '../../../../../../hooks/useMaybeVideo';
import useCoveyAppState from '../../../../../../hooks/useCoveyAppState';
import { MessageType } from '../../../../../../classes/TextConversation';
import usePlayersInTown from '../../../../../../hooks/usePlayersInTown';
import { CUIAutoComplete, Item } from 'chakra-ui-autocomplete';
import useMyLocation from '../../../../../../hooks/useMyLocation';

interface SendingOptionsProps {
  messageType: MessageType;
  setMessageType: (messageType: MessageType) => void;
  receiverId: string;
  setReceiverId: (playerId: string) => void;
  setReceiverName: (playerName: string) => void;
}

/**
 * Display a button that activate the modal of SendingOptions 
 * where users can set up the receivers of messages, such as
 * to global, to group, and to a specific player
 */
export default function SendingOptions({ messageType, setMessageType, receiverId, setReceiverId, setReceiverName }: SendingOptionsProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const video = useMaybeVideo()
  const players = usePlayersInTown()
  const { myPlayerID } = useCoveyAppState()
  const globalOption: Item = { value: MessageType.GLOBAL_MESSAGE, label: 'Global' }
  const groupOption: Item = { value: MessageType.GROUP_MESSAGE, label: 'Group' }
  const [optionItems, setOptionItems] = useState([globalOption])
  const [selectedItem, setSelectedItem] = useState(globalOption)
  const myLocation = useMyLocation();
  const [hasGroup, setHasGroup] = useState(false);

  useEffect(() => {
    if (myLocation.conversationLabel) setHasGroup(true);
    else setHasGroup(false);
  }, [myLocation])

  useEffect(() => {
    const options: Item[] = [globalOption]
    if (hasGroup) options.push(groupOption);
    players.filter(player => player.id != myPlayerID).forEach(player => {
      options.push({ value: player.id, label: player.userName })
    })
    setOptionItems(options)
    if (
      (receiverId && !options.some(option => option.value === receiverId)) ||
      (messageType === MessageType.GROUP_MESSAGE && !hasGroup)
    ) {
      setMessageType(MessageType.GLOBAL_MESSAGE);
      setReceiverId("")
      setReceiverName("")
      setSelectedItem(globalOption)
    }
  }, [players, hasGroup])

  const openSettings = useCallback(() => {
    onOpen();
    video?.pauseGame();
  }, [onOpen, video]);

  const closeSettings = useCallback(() => {
    onClose();
    video?.unPauseGame();
  }, [onClose, video]);

  const onChange = ({ value, label }: Item) => {
    if (value === MessageType.GLOBAL_MESSAGE) {
      setMessageType(MessageType.GLOBAL_MESSAGE);
      setReceiverId("")
      setReceiverName("")
    } else if (value === MessageType.GROUP_MESSAGE) {
      setMessageType(MessageType.GROUP_MESSAGE)
      setReceiverId("")
      setReceiverName("")
    } else {
      setMessageType(MessageType.DIRECT_MESSAGE)
      setReceiverId(value)
      setReceiverName(label)
    }
  }

  return useMemo(() => {
    return <>
      <MenuItem data-testid='openMenuButton' onClick={openSettings}>
        <Typography variant="body1">
          {messageType === MessageType.GLOBAL_MESSAGE
            ? 'To Town'
            : messageType === MessageType.GROUP_MESSAGE
              ? 'To Conversation Area'
              : 'To ' + players.find(player => player.id === receiverId)?.userName
          }
        </Typography>
      </MenuItem>
      <Modal isOpen={isOpen} onClose={closeSettings}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sending Settings</ModalHeader>
          <ModalCloseButton />
          <Box px={8} py={4}>
            <CUIAutoComplete
              label={'Current Option: ' + selectedItem.label}
              placeholder='Search for a Sending Option'
              items={optionItems}
              disableCreateItem
              tagStyleProps={{
                display: "none"
              }}
              selectedItems={[selectedItem]}
              onSelectedItemsChange={(change) => {
                if (change.selectedItems && change.selectedItems[0] !== change.selectedItems[1]) {
                  setSelectedItem(change.selectedItems[1])
                  onChange(change.selectedItems[1])
                }
                closeSettings()
              }}
            />
          </Box>
        </ModalContent>
      </Modal>
    </>
  }, [optionItems, isOpen])
}