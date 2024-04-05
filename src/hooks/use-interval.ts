import { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';

import { IosAppActiveState } from './../states';

export const useInterval = (callback: Function, delay: number) => {
  const savedCallback = useRef<Function>();
  const appActiveState = useRecoilValue(IosAppActiveState)
 
  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback?.current?.();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay, appActiveState]);
}