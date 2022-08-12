import { useContext } from 'react';
import assert from 'assert';
import MyLocationContext from '../contexts/MyLocationContext';
import { UserLocation } from '../classes/Player';

/**
 * Use this hook to access the current user location.
 *
 * WARNING: component uses this context will re-render crazily
 * To optimize: https://github.com/facebook/react/issues/15156#issuecomment-474590693
 */
export default function useMyLocation(): UserLocation {
  const ctx = useContext(MyLocationContext);
  assert(ctx, 'MyLocationContext should be defined.');
  return ctx;
}
