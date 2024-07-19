import { DefaultEventsMap } from '@socket.io/component-emitter';
import { MutableRefObject } from 'react';
import { io } from 'socket.io-client';

// interface initialState {
//   PeerConnection: RTCPeerConnection; //object for each peer
//   RTCDataChannel: undefined; //initiated by host
//   onDataChannel: undefined; //Event listener\
//   createRoom: () => void;
//   joinRoom: () => void;
// }

// const shareICEWithPeer = (PeerConnection: RTCPeerConnection) => (message) => {
//   const data = JSON.parse(message.data);
//   if (data.type === 'ice-candidate')
//     PeerConnection.addIceCandidate(new RTCIceCandidate(data.candidate)).catch(
//       (error) => console.error('Error adding received ICE candidate:', error)
//     );
// };

// const signalingSocket = new WebSocket('ws://localhost:8080');
// signalingSocket.onmessage = shareICEWithPeer('');

// const WebRtc = () => {
//   let instance: initialState;
//   const iceServers: Partial<RTCConfiguration> = {
//     iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
//   };

//   const createRoom = async () => {
//     if (!instance?.PeerConnection) throw Error('No PeerConnection');
//     instance.PeerConnection.onicecandidate = _handleIceCandidateEvent;
//     instance.PeerConnection.ontrack = _handleTrackEvent;
//   };
//   const joinRoom = () => {};

//   const _captureTab = async () => {
//     const localStream = await navigator.mediaDevices.getDisplayMedia({
//       video: { displaySurface: 'monitor' },
//     });
//   };
//   //an ice candidate is the possible meeting spot between two peers
//   const _handleIceCandidateEvent = (event: RTCPeerConnectionIceEvent) => {
//     if (!event.candidate) return; //TODO: finish impl
//   };
//   const _handleTrackEvent = () => {
//     //TODO: finish impl
//   };
//   const init = () => {
//     instance = {
//       PeerConnection: new RTCPeerConnection(iceServers),
//       RTCDataChannel: undefined,
//       onDataChannel: undefined,
//       createRoom,
//       joinRoom,
//     };
//     return instance;
//   };
//   const singleton = () => {
//     if (!instance) return init();

//     return instance;
//   };

//   return singleton();
// };

// export const rtcInstance = WebRtc();

const BACKEND = 'http://localhost:3001';
const roomId = 'example-room-id';
const initSocket = () =>
  io(BACKEND, {
    // reconnectionDelay: 10000,
    // reconnectionDelayMax: 100000,
    transports: ['websocket'],
    query: {
      roomId,
    },
    forceNew: false,
  });
export const createSession = async (
  videoRef: MutableRefObject<HTMLVideoElement | null>
) => {
  //TODO: wrap in try catch

  //initialize socket
  const socket = initSocket();
  socket.on('connect', () => {
    //initialize stream
    navigator.mediaDevices
      .getDisplayMedia({
        video: {
          displaySurface: 'monitor',
        },
      })
      .then((stream) => {
        //output stream to video element
        const video = videoRef.current;
        if (!video) throw Error('no video element found');

        video.srcObject = stream;
        video.play();

        //emit stream content to socket
        const mediaRecorder = new MediaRecorder(stream, {
          mimeType: 'video/webm; codecs="vp8, opus"',
        });
        mediaRecorder.ondataavailable = (event) => {
          if (event?.data.size > 0) {
            console.log('emittingdata');
            socket.send(event.data);
          }
        };
        mediaRecorder.start(2000); //send data in 100ms chunks
      })
      .catch((error) => console.error('Error accessing media device ', error));
  });

  socket.on('disconnect', (error) => {
    console.log('Socket disconnected:', socket.id, error);
  });

  socket.on('ping', () => {
    console.log('Ping sent to server');
  });

  socket.on('pong', (latency) => {
    console.log('Pong received from server. Latency:', latency);
  });
};

// export const joinSession = (
//   videoRef: MutableRefObject<HTMLVideoElement | null>
// ) => {
//   const video = videoRef.current;
//   //generate stream url
//   if (!video) throw Error('no video element found');
//   const mediaSource = new MediaSource();
//   video.src = URL.createObjectURL(mediaSource);
//   // console.log({ URL: URL.createObjectURL(mediaSource) });

//   mediaSource.addEventListener('sourceopen', () => {
//     const sourceBuffer = mediaSource.addSourceBuffer(
//       'video/webm; codecs="vp8, opus"'
//     );

//     //initialize socket
//     const socket = initSocket();

//     socket.on('stream', (data) => {
//       console.log('receiving ', data)
//       const arrayU8 = new Uint8Array(data.data);
//       // Check if the MediaSource is still open
//       if (mediaSource.readyState === 'open') {
//         // Append the received data to the SourceBuffer
//         sourceBuffer.appendBuffer(arrayU8);
//       } else {
//         console.log(
//           'Media source is not in open state: ',
//           mediaSource.readyState
//         );
//       }
//     });

//     sourceBuffer.addEventListener('updateend', () => {
//       if (video.paused) video.play();
//     });

//     sourceBuffer.addEventListener('error', (error) => {
//       console.log(SourceBuffer);
//       console.error('SourceBuffer error ', error);
//     });
//     socket.on('connect', () => {
//       console.log('joined server');
//     });
//   });
// };

export const joinSession = (
  videoRef: MutableRefObject<HTMLVideoElement | null>
) => {
  const video = videoRef.current;
  //generate stream url
  if (!video) throw Error('no video element found');

  const mediaSource = new MediaSource();
  video.src = URL.createObjectURL(mediaSource);

  mediaSource.addEventListener('sourceopen', () => {
    const mimeType = 'video/webm; codecs="vp8, opus"';
    const sourceBuffer = mediaSource.addSourceBuffer(mimeType);

    if (!MediaSource.isTypeSupported(mimeType))
      throw Error('Media Source not supported');

    //initialize socket
    const socket = initSocket();
    socket.on('stream', (data) => {
      const uint8Array = new Uint8Array(data);
      if (mediaSource.readyState === 'open')
        sourceBuffer.appendBuffer(uint8Array);
      else
        console.log('Media source not in open state ', mediaSource.readyState);
    });
    sourceBuffer.addEventListener('updateend', () => {
      if (video.paused)
        video.play().catch((error) => console.error('failed to play ', error));
      //else video.src = url;
      //mediaSource.endOfStream()
    });

    sourceBuffer.addEventListener('error', (event) =>
      console.error('SourceBuffer error ', event)
    );
  });
};
