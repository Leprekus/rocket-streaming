import React from 'react';
import { Tabs, TabsList, TabsContent, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Button } from './ui/button';

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
  const handleStartSession = (role: 'host' | 'join') => {
    setDisplay(true);
	switch(role) {
		case 'host':
			
			return
	}
  };
  return (
    <Tabs defaultValue='host' className='size-[400px] mx-auto flex flex-col items-center'>
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
          <Button onClick={() => handleStartSession('host')}>
            Start session
          </Button>
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
          <Button onClick={() => handleStartSession('host')}>
            Join session
          </Button>
        </div>
	  </TabsContent>
    </Tabs>
  );
}
