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
export const createSession = async (videoRef: MutableRefObject<HTMLVideoElement | null>) => {
  //TODO: wrap in try catch

  //initialize socket
  const roomId = 'example-room-id';
  const socket = io(BACKEND, {
    query: {
      roomId,
    },
  });

  //initialize stream
  const stream = await navigator.mediaDevices.getDisplayMedia({
    video: { displaySurface: 'monitor' },
  });

  //output stream to video element
  const video = videoRef.current;
  if (!video) throw Error('no video element found');

  video.srcObject = stream;
  video.play();

  //emit stream content to socket
  const mediaRecorder = new MediaRecorder(stream);
  mediaRecorder.ondataavailable = (event) => {
    if (event.data.size > 0) socket.emit('stream', event.data);
  };
  mediaRecorder.start(100); //send data in 100ms chunks
};

export const joinSession = (videoRef: MutableRefObject<HTMLVideoElement | null>) => {
  //initialize socket
  const roomId = 'example-room-id';
  const socket = io(BACKEND, {
    query: {
      roomId: roomId,
    },
  });
  const video = videoRef.current;
  //generate stream url
  if (!video) throw Error('no video element found');
  const mediaSource = new MediaSource();
  video.src = URL.createObjectURL(mediaSource);
  console.log({ URL: URL.createObjectURL(mediaSource) });

  mediaSource.addEventListener('sourceopen', () => {
    const buffer = mediaSource.addSourceBuffer(
      'video/webm; codecs="vp8, vorbis"'
    );
    console.log('pre stream')

    socket.on('stream', (data) => {
      const reader = new FileReader();
      reader.onload = () => {
        
        buffer.appendBuffer(new Uint8Array(reader.result as ArrayBuffer));
      };

      
      reader.readAsArrayBuffer(data);
    });
    socket.on('connect', () => {
      console.log('joined server');
    });
    
    console.log('post stream')

  });
};