import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { mock } from 'jest-mock-extended';
import React from 'react';
import ConversationArea from '../../../../../../classes/ConversationArea';
import Player from '../../../../../../classes/Player';
import { MessageType } from '../../../../../../classes/TextConversation';
import { CoveyAppState } from '../../../../../../CoveyTypes';
import * as useConversationAreas from '../../../../../../hooks/useConversationAreas';
import * as useCoveyAppState from '../../../../../../hooks/useCoveyAppState';
import * as usePlayersInTown from '../../../../../../hooks/usePlayersInTown';
import SendingOptions from "./SendingOptions";

/**
 * Sets a mock PortalManager for testing Modal
 * @reference https://stackoverflow.com/questions/69585390/is-there-a-way-to-test-chakra-ui-modal-dialogs-with-react-test-renderer
 */
const divWithChildrenMock = (children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined, identifier: string) => <div data-testId={identifier}>{children}</div>;
const divWithoutChildrenMock = (identifier: string) => <div data-testId={identifier} />;
jest.mock("@chakra-ui/react", () => (
  {
    ...jest.requireActual("@chakra-ui/react"),
    PortalManager: jest.fn(({ children }) => divWithChildrenMock(children, "portal")),
    Modal: jest.fn(({ children }) => divWithChildrenMock(children, "modal")),
    ModalOverlay: jest.fn(({ children }) => divWithChildrenMock(children, "overlay")),
    ModalContent: jest.fn(({ children }) => divWithChildrenMock(children, "content")),
    ModalHeader: jest.fn(({ children }) => divWithChildrenMock(children, "header")),
    ModalFooter: jest.fn(({ children }) => divWithChildrenMock(children, "footer")),
    ModalBody: jest.fn(({ children }) => divWithChildrenMock(children, "body")),
    ModalCloseButton: jest.fn(() => divWithoutChildrenMock("close")),
  }
));

describe('SendingOptions', () => {
  let messageType = MessageType.GLOBAL_MESSAGE;
  let receiverId = '';
  let setMessageType = jest.fn();
  let setReceiverId = jest.fn();
  let setReceiverName = jest.fn();
  let useConversationAreasSpy: jest.SpyInstance<ConversationArea[], []>;
  let usePlayersInTownSpy: jest.SpyInstance<Player[], []>;
  let useCoveyAppStateSpy: jest.SpyInstance<CoveyAppState, []>;

  const wrappedSendingOptionsComponent = () => (
    <React.StrictMode>
      <SendingOptions
        messageType={messageType}
        setMessageType={setMessageType}
        receiverId={receiverId}
        setReceiverId={setReceiverId}
        setReceiverName={setReceiverName}
      />
    </React.StrictMode>
  );
  const renderSendingOptions = () => render(wrappedSendingOptionsComponent());

  beforeAll(() => {
    useConversationAreasSpy = jest.spyOn(useConversationAreas, 'default');
    usePlayersInTownSpy = jest.spyOn(usePlayersInTown, 'default');
    useCoveyAppStateSpy = jest.spyOn(useCoveyAppState, 'default');
  });

  afterAll(() => {
    useConversationAreasSpy.mockRestore();
    usePlayersInTownSpy.mockRestore();
    useCoveyAppStateSpy.mockRestore();
  });

  let playersByArea: Player[][] = [];
  let areas: ConversationArea[] = [];

  beforeEach(() => {
    playersByArea = [];
    areas = [];
    let allPlayers: Player[] = [];
    usePlayersInTownSpy.mockReturnValue(allPlayers);
    useConversationAreasSpy.mockReturnValue(areas);
    const mockAppState = mock<CoveyAppState>();
    mockAppState.myPlayerID = 'I';
    useCoveyAppStateSpy.mockReturnValue(mockAppState);
    setMessageType.mockRestore();
    setReceiverId.mockRestore();
    setReceiverName.mockRestore();
  });

  it('Displays a heading "Sending Settings', async () => {
    const renderData = renderSendingOptions();
    const heading = await renderData.findByTestId('header');
    expect(heading).toHaveTextContent('Sending Settings');
  });

  it('Displays the current sending target', async () => {
    const renderData = renderSendingOptions();
    const content = await renderData.findByTestId('content');
    expect(content).toHaveTextContent('Current Option: ');
  });

  it('Has the textfield for searching', async () => {
    const renderData = renderSendingOptions();
    const placeholder = renderData.queryByPlaceholderText('Search for a Sending Option');
    expect(placeholder).not.toBeNull();
  });
});