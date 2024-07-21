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

const BACKEND = process.env.BACKEND_URL!;
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
    return s;
};

export const createSession = async () => {
    //TODO: wrap in try catch

    //initialize socket
    const socket = initSocket();
    socket.on('connect', () => {
        //initialize stream
        console.log('emittingdata');
        socket.send(test);
    });

    socket.on('disconnect', (error) => {
        console.log('Socket disconnected:', socket.id, error);
    });
};

export const joinSession = () => {
    //initialize socket
    const socket = initSocket();
    socket.on('stream', (data) => {});
};
