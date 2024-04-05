import {atom} from 'recoil';

export const IsConnectedSocketState = atom<boolean>({
  key: 'is-connected-socket-state',
  default: false,
});

export const IsConnectedStockSocketState = atom<boolean>({
  key: 'is-connected-stock-socket-state',
  default: false,
});

export const SocketDataState = atom<any>({
  key: 'socket-data-state',
  default: {},
});
