import { DefaultEventsMap } from '@socket.io/component-emitter';
import { MutableRefObject } from 'react';
import { io } from 'socket.io-client';

const test = {
    string: 'want to see if i can emit and receive some test',
    object: {
        children: [1, 2, 3, 4, 5],
    },
    done: true,
};

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL!;
const roomId = 'example-room-id';
export const initSocket = () => {
    const s = io(BACKEND, {
        // reconnectionDelay: 10000,
        // reconnectionDelayMax: 100000,
        transports: ['websocket'],
        query: {
            roomId,
        },
        forceNew: false,
    });

    s.on('connect', () => {
        //initialize stream
        console.log('socket connected');
    });

    s.on('disconnect', (error) => {
        console.log('Socket disconnected:', s.id, error);
    });

    s.on('error', (event) => {
        console.error('socket connection failed ', event)
    })
    return s;
};
