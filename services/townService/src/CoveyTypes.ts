export type Direction = 'front' | 'back' | 'left' | 'right';
export type UserLocation = {
  x: number;
  y: number;
  rotation: Direction;
  moving: boolean;
  conversationLabel?: string;
};
export type CoveyTownList = { friendlyName: string; coveyTownID: string; currentOccupancy: number; maximumOccupancy: number }[];

export enum MessageType {
  GLOBAL_MESSAGE = 'GLOBAL',
  GROUP_MESSAGE = 'GROUP',
  DIRECT_MESSAGE = 'DIRECT',
}

export type ChatMessage = {
  authorName: string;
  authorId: string;
  receiverName: string;
  receiverId: string;
  type: MessageType;
  sid: string;
  body: string;
  dateCreated: Date;
};
