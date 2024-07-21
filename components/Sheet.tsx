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
interface JoinCreateTabsProps {
    // videoId: string;
    // setVideoId: (text: string) => void;
    // setDisplay: (value: boolean) => void;
}
export default function Sheet({}: // videoId,
// setVideoId,
// setDisplay,
JoinCreateTabsProps) {
    const [rawText, setRawText] = useState('');
    const [sessionStatus, setSessionStatus] = useState<
        'none' | 'host' | 'join'
    >('none');
    const [socket, setSocket] = useState<null | Socket<
        DefaultEventsMap,
        DefaultEventsMap
    >>(null);

    const textAreaRef = useRef<null | HTMLTextAreaElement>(null);
    const formatText = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let text = e.currentTarget.value;
        setRawText(text);
    };

    const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        formatText(e);
        switch (sessionStatus) {
            case 'join':
                if (!socket) throw Error('no socket found');
                break;
            case 'host':
                if (!socket) throw Error('no socket found');
                socket.send(e.currentTarget.value); //send the raw text as useState is 1 cycle late
                break;
        }
    };
    const createSession = () => {
        //TODO: wrap in try catch
        setSessionStatus('host');
        //initialize socket
        setSocket(initSocket());
    };

    const joinSession = () => {
        //initialize socket
        setSessionStatus('join');

        setSocket(() => {
            const s = initSocket();
            s.on('stream', (data) => {
                const evtTarget = {
                    currentTarget: {
                        value: data,
                    },
                };
                formatText(evtTarget as ChangeEvent<HTMLTextAreaElement>);
            });
            return s;
        });
    };

    return (
        <div>
            <textarea
                className="absolute top-[-999999999px]"
                ref={textAreaRef}
                onChange={handleTextChange}
                value={rawText}
            />
            <div
                className="flex flex-col min-h-screen w-fit mx-auto relative"
                onClick={() => textAreaRef.current?.select()}
            >
                <div className="flex gap-4 p-4">
                    <Button variant="secondary" onClick={createSession}>
                        Create Session
                    </Button>
                    <Button variant="secondary" onClick={joinSession}>
                        Join Session
                    </Button>
                </div>
                <MarkdownPreview
                    source={rawText}
                    style={{ padding: 16 }}
                    className="w-[800px] min-h-screen overflow-y-scroll bg-red-500"
                />
            </div>
        </div>
    );
}

export const MemoedSheet = memo(Sheet);
