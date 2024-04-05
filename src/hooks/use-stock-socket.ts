import {SOCKET_URL} from '../constants';

const client = new WebSocket(SOCKET_URL.stock);

export const useStockSocket = () => {
  // to establish the connection from client to server
  const onConnect = () => {
    try {
      const connect = {
        event: 'login',
        data: { },
      };
      // this will establish the connection
      client.onopen = () => {
        const payload = JSON.stringify(connect);
        client.send(payload);
      };
    } catch (error) {
      console.log('error', error)
    }
  };

  return {
    client,
    onConnect,
  };
};
