import { firebaseConfig } from '@/utils';
import React, { useEffect, useRef, useState } from 'react';

const WebRTCComponent = () => {
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const [peerConnection, setPeerConnection] = useState(null);
    const [localStream, setLocalStream] = useState(null);
    const [remoteStream, setRemoteStream] = useState(new MediaStream());
    const [roomId, setRoomId] = useState(null);

    const configuration = {
        iceServers: [
            {
                urls: [
                    'stun:stun1.l.google.com:19302',
                    'stun:stun2.l.google.com:19302',
                ],
            },
        ],
        iceCandidatePoolSize: 10,
    };

    useEffect(() => {
        document.querySelectorAll('.mdc-button').forEach((button) => {
            mdc.ripple.MDCRipple.attachTo(button);
        });
    }, []);

    const openUserMedia = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
		if(!localVideoRef?.currentx || !remoteVideoRef?.current) return
        localVideoRef.current.srcObject = stream;
        setLocalStream(stream);
        setRemoteStream(new MediaStream());
        remoteVideoRef.current.srcObject = remoteStream;
    };

    const createRoom = async () => {
        const db = firebaseConfig.firestore();
        const roomRef = await db.collection('rooms').doc();
        const pc = new RTCPeerConnection(configuration);
        setPeerConnection(pc);

        localStream.getTracks().forEach(track => {
            pc.addTrack(track, localStream);
        });

        const callerCandidatesCollection = roomRef.collection('callerCandidates');

        pc.addEventListener('icecandidate', event => {
            if (!event.candidate) return;
            callerCandidatesCollection.add(event.candidate.toJSON());
        });

        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);

        await roomRef.set({ offer: { type: offer.type, sdp: offer.sdp } });
        setRoomId(roomRef.id);

        pc.addEventListener('track', event => {
            event.streams[0].getTracks().forEach(track => {
                remoteStream.addTrack(track);
            });
        });

        roomRef.onSnapshot(async snapshot => {
            const data = snapshot.data();
            if (!pc.currentRemoteDescription && data && data.answer) {
                const rtcSessionDescription = new RTCSessionDescription(data.answer);
                await pc.setRemoteDescription(rtcSessionDescription);
            }
        });

        roomRef.collection('calleeCandidates').onSnapshot(snapshot => {
            snapshot.docChanges().forEach(async change => {
                if (change.type === 'added') {
                    await pc.addIceCandidate(new RTCIceCandidate(change.doc.data()));
                }
            });
        });
    };

    const joinRoom = async () => {
        const roomId = prompt("Enter Room ID");
        const db = firebase.firestore();
        const roomRef = db.collection('rooms').doc(roomId);
        const roomSnapshot = await roomRef.get();

        if (roomSnapshot.exists) {
            const pc = new RTCPeerConnection(configuration);
            setPeerConnection(pc);

            localStream.getTracks().forEach(track => {
                pc.addTrack(track, localStream);
            });

            const calleeCandidatesCollection = roomRef.collection('calleeCandidates');
            pc.addEventListener('icecandidate', event => {
                if (!event.candidate) return;
                calleeCandidatesCollection.add(event.candidate.toJSON());
            });

            pc.addEventListener('track', event => {
                event.streams[0].getTracks().forEach(track => {
                    remoteStream.addTrack(track);
                });
            });

            const offer = roomSnapshot.data().offer;
            await pc.setRemoteDescription(new RTCSessionDescription(offer));
            const answer = await pc.createAnswer();
            await pc.setLocalDescription(answer);

            await roomRef.update({ answer: { type: answer.type, sdp: answer.sdp } });

            roomRef.collection('callerCandidates').onSnapshot(snapshot => {
                snapshot.docChanges().forEach(async change => {
                    if (change.type === 'added') {
                        await pc.addIceCandidate(new RTCIceCandidate(change.doc.data()));
                    }
                });
            });
        }
    };

    const hangUp = async () => {
        localStream.getTracks().forEach(track => track.stop());
        remoteStream.getTracks().forEach(track => track.stop());
        if (peerConnection) peerConnection.close();

        if (roomId) {
            const db = firebase.firestore();
            const roomRef = db.collection('rooms').doc(roomId);
            const calleeCandidates = await roomRef.collection('calleeCandidates').get();
            calleeCandidates.forEach(async candidate => await candidate.ref.delete());
            const callerCandidates = await roomRef.collection('callerCandidates').get();
            callerCandidates.forEach(async candidate => await candidate.ref.delete());
            await roomRef.delete();
        }

        window.location.reload();
    };

    const registerPeerConnectionListeners = pc => {
        pc.addEventListener('icegatheringstatechange', () => console.log(`ICE gathering state: ${pc.iceGatheringState}`));
        pc.addEventListener('connectionstatechange', () => console.log(`Connection state: ${pc.connectionState}`));
        pc.addEventListener('signalingstatechange', () => console.log(`Signaling state: ${pc.signalingState}`));
        pc.addEventListener('iceconnectionstatechange', () => console.log(`ICE connection state: ${pc.iceConnectionState}`));
    };

    return (
        <div>
            <video ref={localVideoRef} autoPlay playsInline></video>
            <video ref={remoteVideoRef} autoPlay playsInline></video>
            <button onClick={openUserMedia} id="cameraBtn">Open Camera</button>
            <button onClick={createRoom} id="createBtn">Create Room</button>
            <button onClick={joinRoom} id="joinBtn">Join Room</button>
            <button onClick={hangUp} id="hangupBtn">Hang Up</button>
        </div>
    );
};

export default WebRTCComponent;
