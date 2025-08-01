import React, {
    ChangeEvent,
    memo,
    MutableRefObject,
    useEffect,
    useRef,
    useState,
} from 'react';
import { Tabs, TabsList, TabsContent, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { io } from 'socket.io-client';
import { initSocket } from '@/utils';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import { Badge } from './ui/badge'
import { toast } from 'sonner';
/**
 * textarea can be mutated in two ways:
 * i) by direct editing from the user
 * ii) from an incoming socket stream
 * in both cases the information is handled through
 * the handleTextChange function
 *
 * case 1: active session and user mutates the textarea, in which
 * case it gets filtered by socket stream because the payload id
 * matches the current socket id
 *
 * case 2: active session and incoming payload is from peer in which case
 * state is updated because id does not match current
 * socket id
 *
 * case 3: no active session so the only
 * caller mutating textarea is the onChange evt
 *
 */
export default function Sheet() {
    const [rawText, setRawText] = useState(`## ⚙️ How It Works

1. **Start a session:** Open client one and click "Create session".
2. **Join the session:** Open client two and click “Join Session.”
3. **Type!**: Click anywhere on the screen and begin typing
4. **Collaborate:** Both can edit simultaneously with real-time updates.`);
    const [inSession, setInSession] = useState(false);
    const [socket, setSocket] = useState<null | Socket<
        DefaultEventsMap,
        DefaultEventsMap
    >>(null);

    const textAreaRef = useRef<null | HTMLTextAreaElement>(null);
    const formatText = (rawText: string) => {
        setRawText(rawText);
    };

    /**
     * purpose: sets state of raw text
     * sends raw text through socket
     */
    interface SocketPayloadInterface {
        id: undefined | string
        rawText: string
    }
    const handleTextChange = ({ id, rawText }: SocketPayloadInterface) => {
        formatText(rawText);
        if (inSession && !socket) throw Error('no socket found');
        if (inSession && socket)
            socket.send({ id, rawText }); //send the raw text as useState is 1 cycle late
        
    };
    // const createSession = () => {
    //     //TODO: wrap in try catch
    //     setInSession(true);
    //     //initialize socket
    //     setSocket(initSocket());
    // };

    const createSession = () => {
    
        setInSession(true);

        /**
         * purpose: initializes socket
         * binds handleTextChange to incoming socket streams
         */
        setSocket(() => {
            const s = initSocket();
            s.on('stream', ({ id, rawText }: SocketPayloadInterface) => {

                if(id === s.id) {
			toast('Session already exists');
			return
		}
                handleTextChange({ id, rawText });
            });
	    toast('Session created successfully');
            return s;
        });
    };

    const handleSelect = () => {
        const textArea = textAreaRef?.current
        if(!textArea) return
        textArea.select()
        textArea.selectionStart = rawText.length
        textArea.selectionEnd = rawText.length
    }

    return (
        <div>
            <textarea
                className="absolute top-[-999999px]"
                ref={textAreaRef}
                onChange={(e) => handleTextChange({ id: socket?.id, rawText: e.currentTarget.value })}
                value={rawText}
            />
            <div className="flex items-center gap-4 p-4 border-b shadow w-full">
                    <Button variant="default" onClick={createSession}>
                        Create Session
                    </Button>
                    <Button variant="secondary" onClick={createSession}>
                        Join Session
                    </Button>
                    <div>
                        <Badge className='flex gap-4'>Session : <span className={`size-2 rounded-full ${inSession ? 'bg-green-500' : 'bg-red-500'}`}/></Badge>
                    </div>
                </div>
            <div
                className="flex flex-col min-h-screen w-fit mx-auto relative pt-4"
                onClick={handleSelect}
            >
                
                <MarkdownPreview
                    source={rawText}
                    style={{ padding: 16 }}
                    className="w-[800px] min-h-screen overflow-y-scroll rounded-md border shadow"
                />
            </div>
        </div>
    );
}

export const MemoedSheet = memo(Sheet);
