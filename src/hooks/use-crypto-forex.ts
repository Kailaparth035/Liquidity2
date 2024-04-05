import {SOCKET_URL} from '../constants';

const client = new WebSocket(SOCKET_URL.forex);

export const useForexSocket = () => {
  // to establish the connection from client to server
  const onConnect = () => {
      try {
        const connect = {
          event: 'login',
          data: {},
        };
        // this will establish the connection
        client.onopen = () => {
          const payload = JSON.stringify(connect);
          client.send(payload);
        };
        client.onerror = (e) => {
          // console.log('useCryptoSocket.onerror', e)
        };
        client.onclose = (e) => {
          // console.log('useCryptoSocket.onclose', e)
        };
      } catch (error) {
        console.log('err', error)
      }
  };

  return {
    client,
    onConnect,
  };
};
