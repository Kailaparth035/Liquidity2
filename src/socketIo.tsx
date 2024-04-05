import {Platform} from 'react-native';
import SocketIOClient from 'socket.io-client';
const SOCKET_URL = 'wss://socketsbay.com/wss/v2/2/demo/';

class WebService {
  initializeSocket = async () => {
    try {
      let callerId = Platform.OS === 'android' ? '123' : '456';
      this.socket = SocketIOClient(SOCKET_URL, {
        transports: ['websocket'],
      });
      console.log('==== Initializing socket ====');

      this.socket.on('connect', (data: any) => {
        console.log('=== socket connected === ', data);
      });
      this.socket.on('error', (data: any) => {
        console.log('=== socket error === ', data);
      });
    } catch (error) {
      console.log('==== Initializing error ====', error);
    }
  };
  emit = (event: any, data: any) => {
    this.socket.emit(event, data);
  };

  on = (event: any, cb: any) => {
    this.socket.on(event, cb);
  };
  removeListener = (listenerName: any) => {
    /*  */
    this.socket.removeListener(listenerName);
  };
}

export const socketService = new WebService();
