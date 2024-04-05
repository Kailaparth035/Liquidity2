import {useCallback} from 'react';
import {useSetRecoilState} from 'recoil';

import {SolValueState} from './../../../states/info/states';

export const useSolana = () => {
  const setSolValue = useSetRecoilState(SolValueState);

  const getSolanaPrice = useCallback((username: string) => {
    if (username) {
      const obj = {
        jsonrpc: '2.0',
        id: 1,
        method: 'getTokenAccountsByOwner',
        params: [
          username,
          {
            programId: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
          },
          {
            encoding: 'jsonParsed',
          },
        ],
      };

      fetch('https://api.devnet.solana.com/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
      })
        .then(res => res.json())
        .then(res => {
          if (res) {
            setSolValue(res);
          }
        });
    }
  }, []);

  return {getSolanaPrice};
};
