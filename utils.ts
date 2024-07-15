interface initialState {
    PeerConnection: RTCPeerConnection, //object for each peer
    RTCDataChannel: undefined, //initiated by host
    onDataChannel: undefined, //Event listener\
    createRoom: () => void;
    joinRoom: () => void;

}
const WebRtc = () => {
    let instance: initialState;
    const iceServers: Partial<RTCConfiguration> = {
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
    }

    const createRoom = async () => {
        if(!instance?.PeerConnection)
            throw Error('No PeerConnection')
        instance.PeerConnection.onicecandidate = _handleIceCandidateEvent
        instance.PeerConnection.ontrack = _handleTrackEvent
    }
    const joinRoom = () => {}

    const _captureTab = async () => {
        const localStream = await navigator.mediaDevices.getDisplayMedia({
            video: { displaySurface: 'monitor'}
        })
    }
    //an ice candidate is the possible meeting spot between two peers
    const _handleIceCandidateEvent = () => {}
    const _handleTrackEvent = () => {}
    const init = () => {
        instance = {
            PeerConnection: new RTCPeerConnection(iceServers),
            RTCDataChannel: undefined,
            onDataChannel: undefined,
            createRoom,
            joinRoom,

        }
        return instance
    }
    const singleton = () => {
        if(!instance)
            return init()
        
        return instance
    }

    return singleton()

}

export const rtcInstance = WebRtc()
