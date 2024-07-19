import React, { memo, MutableRefObject, useEffect, useRef } from 'react';
import { Tabs, TabsList, TabsContent, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { io } from 'socket.io-client';
import { createSession, joinSession } from '@/utils';
interface JoinCreateTabsProps {
  videoId: string;
  setVideoId: (text: string) => void;
  setDisplay: (value: boolean) => void;
}
export default function JoinCreateTabs({
  videoId,
  setVideoId,
  setDisplay,
}: JoinCreateTabsProps) {
  const videoRef = useRef<null | HTMLVideoElement>(null);
  
  return (
    <>
      <Tabs
        defaultValue='host'
        className='size-[400px] mx-auto flex flex-col items-center'
      >
        <TabsList>
          <TabsTrigger value='host'>Create Session</TabsTrigger>
          <TabsTrigger value='join'>Join Session</TabsTrigger>
        </TabsList>
        <TabsContent value='host'>
          <div className='flex gap-4 '>
            <Input
              className='text-black'
              onChange={(e) => {
                setVideoId(e.target.value || '');
              }}
              placeholder='Paste your YouTube video id'
              value={videoId}
            />
            <Button onClick={() => createSession(videoRef)}>Start session</Button>
          </div>
        </TabsContent>
        <TabsContent value='join'>
          <div className='flex gap-4 '>
            <Input
              className='text-black'
              onChange={(e) => {
                setVideoId(e.target.value || '');
              }}
              placeholder='Paste the session id'
              value={videoId}
            />
            <Button onClick={() => joinSession(videoRef)}>Join session</Button>
          </div>
        </TabsContent>
      </Tabs>
      <video ref={videoRef} className='size-96 bg-red-500' controls>Something Went Wrong</video>
    </>
  );
}

export const MemoedJoinCreateTabs = memo(JoinCreateTabs)