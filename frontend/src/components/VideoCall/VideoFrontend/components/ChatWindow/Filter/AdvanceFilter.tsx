import {
Button,
IconButton,
Modal,
ModalBody,
ModalCloseButton,
ModalContent,
ModalFooter,
ModalHeader,
ModalOverlay,
useDisclosure
} from '@chakra-ui/react';
import FilterList from '@material-ui/icons/FilterList';
import { Item } from 'chakra-ui-autocomplete';
import { useCallback,useState } from 'react';
import { ChatMessage } from '../../../../../../classes/TextConversation';
import useMaybeVideo from '../../../../../../hooks/useMaybeVideo';
import useChatContext from '../../../hooks/useChatContext/useChatContext';
import KeywordFilter from './KeywordFilter';
import UsernameFilter from './UsernameFilter';

/**
 * Records all the senders of the messages received for username autocomplete
 */
const senders = new Map<string, string>();

/**
 * A filter function that corresponds to the user's AdvancedFilter setting
 * @param message the message to be filtered
 * @param users userIds that the user decided to include
 * @param keyword a keyword that the user decided to include
 * @returns true if the message should be displayed, false otherwise
 */
export function advanceFilter(message: ChatMessage, users: Set<string>, keyword: string): boolean {
  if (message.authorId) senders.set(message.authorId, message.authorName);
  let result = true;
  if (users.size !== 0) {
    result = users.has(message.authorId) || users.has(message.receiverId);
  }
  if (keyword.length !== 0) {
    result = result && message.body.includes(keyword);
  }
  return result;
}

/**
 * Displays a button that activate the modal of AdvanceFilter 
 * 
 * If the AdvanceFilter is activated, the Icon should be solid, otherwise outline
 * 
 * See relevant hooks: useChatContext.
 */
export default function AdvanceFilter() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const video = useMaybeVideo();
  const { setFilterByUsers, filterByKeyword, setFilterByKeyword } = useChatContext();
  const [selectedUserItems, setSelectedUserItems] = useState<Item[]>([]);
  const [ keyword, setKeyword ] = useState(filterByKeyword);

  const openSettings = useCallback(() => {
    onOpen();
    video?.pauseGame();
  }, [onOpen, video]);

  const closeSettings = useCallback(() => {
    onClose();
    video?.unPauseGame();
  }, [onClose, video]);

  const setFilter = useCallback(() => {
    onClose();
    const newFilterByUsers = new Set<string>();
    selectedUserItems.forEach(item => newFilterByUsers.add(item.value));
    setFilterByUsers(newFilterByUsers);
    setFilterByKeyword(keyword);
    video?.unPauseGame();
  }, [onClose, video, selectedUserItems, keyword]);

  const resetFilter = useCallback(() => {
    onClose();
    setFilterByUsers(new Set<string>());
    setSelectedUserItems([]);
    setKeyword('');
    setFilterByKeyword('');
    video?.unPauseGame();
  }, [onClose, video])

  return (
    <>
      <IconButton
        onClick={openSettings}
        colorScheme='teal'
        variant={selectedUserItems.length == 0 && keyword.length == 0 ? 'outline' : 'solid'}
        aria-label='filter'
        icon={<FilterList />}
      />
      <Modal isOpen={isOpen} onClose={closeSettings} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Advance Filter</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <UsernameFilter
              selectedItems={selectedUserItems}
              setSelectedItems={setSelectedUserItems}
              allSenders={senders}
            />
            <KeywordFilter keyword={keyword} setKeyword={setKeyword} />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={setFilter}>
              Confirm
            </Button>
            <Button variant='ghost' onClick={resetFilter}>
              Reset
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}