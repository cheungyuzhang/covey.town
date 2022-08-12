import React from 'react';
import { UserLocation } from '../classes/Player';

/**
 * Hint: You will never need to use this directly. Instead, use the
 * `useMyLocation` hooks.
 */
const Context = React.createContext<UserLocation | null>(null);

export default Context;
