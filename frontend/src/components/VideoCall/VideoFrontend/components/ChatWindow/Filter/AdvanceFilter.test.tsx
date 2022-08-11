import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { mock } from 'jest-mock-extended';
import React from 'react';
import * as useChatContext from '../../../hooks/useChatContext/useChatContext';
import AdvanceFilter from './AdvanceFilter';

type ChatContextType = {
  setFilterByUsers: any;
  filterByKeyword: string;
  setFilterByKeyword: any;
};

/**
 * Set the mock modal. This MUST be put on the TOP scope of the .test.tsx file 
 * otherwise it won't work because the nature of jest
 * 
 * If you have multiple modal test files,
 * you need these codes in EVERY file due to the way modal works.
 */
const divWithChildrenMock = ( children: | boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined, identifier: string,) => <div data-testId={identifier}>{children}</div>;
const divWithoutChildrenMock = (identifier: string) => <div data-testId={identifier} />;
jest.mock('@chakra-ui/react', () => ({
  ...jest.requireActual('@chakra-ui/react'),
  PortalManager: jest.fn(({ children }) => divWithChildrenMock(children, 'portal')),
  Modal: jest.fn(({ children }) => divWithChildrenMock(children, 'modal')),
  ModalOverlay: jest.fn(({ children }) => divWithChildrenMock(children, 'overlay')),
  ModalContent: jest.fn(({ children }) => divWithChildrenMock(children, 'content')),
  ModalHeader: jest.fn(({ children }) => divWithChildrenMock(children, 'header')),
  ModalFooter: jest.fn(({ children }) => divWithChildrenMock(children, 'footer')),
  ModalBody: jest.fn(({ children }) => divWithChildrenMock(children, 'body')),
  ModalCloseButton: jest.fn(() => divWithoutChildrenMock('close')),
}));

describe('AdvanceFilter', () => {
  let useChatContextSpy: jest.SpyInstance<ChatContextType, []>;
  const wrappedSendingOptionsComponent = () => (
    <React.StrictMode>
      <AdvanceFilter />
    </React.StrictMode>
  );
  const renderAdvanceFilter = () => render(wrappedSendingOptionsComponent());

  beforeAll(() => {
    useChatContextSpy = jest.spyOn(useChatContext, 'default');
  });

  afterAll(() => {
    useChatContextSpy.mockRestore();
  });

  beforeEach(() => {
    const mockChatContext = mock<ChatContextType>();
    mockChatContext.setFilterByUsers = jest.fn();
    mockChatContext.setFilterByKeyword = jest.fn();
    mockChatContext.filterByKeyword = '';
    useChatContextSpy.mockReturnValue(mockChatContext);
  })

  it(`Displays a heading "Advance Filter"`, async () => {
    const renderData = renderAdvanceFilter();

    const heading = await renderData.findByTestId('header');

    expect(heading).toHaveTextContent('Advance Filter');
  });

  it('Displays a prompt that shows the filter by username function', async () => {
    const renderData = renderAdvanceFilter();

    const body = await renderData.findByTestId('body');

    expect(body).toHaveTextContent('By usernames');
  });

  it('Has a placeholder to type in usernames', () => {
    const renderData = renderAdvanceFilter();

    const placeholder = renderData.queryByPlaceholderText('Type a username');

    expect(placeholder).not.toBeNull();
  });

  it('Displays a prompt that shows the filter by keyword function', async () => {
    const renderData = renderAdvanceFilter();

    const content = await renderData.findByTestId('body');

    expect(content).toHaveTextContent('By a keyword');
  });

  it('Has a placeholder to type in keyword', () => {
    const renderData = renderAdvanceFilter();

    const placeholder = renderData.queryByPlaceholderText('Type a keyword');

    expect(placeholder).not.toBeNull();
  });

  it('Has a button to confirm the filter action', () => {
    const renderData = renderAdvanceFilter();

    const button = renderData.getByRole('button', {name: 'Confirm'});

    expect(button).not.toBeNull();
  });

  it('Has a button to reset the filter action', () => {
    const renderData = renderAdvanceFilter();

    const button = renderData.getByRole('button', {name: 'Reset'});

    expect(button).not.toBeNull();
  });
});