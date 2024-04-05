import EventEmitter from 'events';

export const EVENTS = {
  socket: new EventEmitter(),
};

EVENTS.socket.setMaxListeners(100000);
