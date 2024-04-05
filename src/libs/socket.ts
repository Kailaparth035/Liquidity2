import { io, Socket } from 'socket.io-client'
import { DefaultEventsMap } from '@socket.io/component-emitter'

interface IData {
    [key: string]: string
}

export class WebSocket {
    static readonly client: Socket<DefaultEventsMap, DefaultEventsMap> = io("wss://websocket-testing-001.herokuapp.com", {
        reconnection: true,
        reconnectionDelayMax: 10000,
    });
    static emit(eventName: string, data: IData) {
        WebSocket.client.emit(eventName, data)
    }
}