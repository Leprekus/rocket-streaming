'use client';
import JoinCreateTabs, { MemoedJoinCreateTabs } from '@/components/JoinCreateTabs';
import YouTubePlayer from '@/components/YouTubePlayer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Home() {
  const [videoId, setVideoId] = useState('');
  const [display, setDisplay] = useState(false);

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='flex flex-col gap-4'>
        <MemoedJoinCreateTabs
          videoId={videoId}
          setVideoId={setVideoId}
          setDisplay={setDisplay}
        />

        {/* {display && <YouTubePlayer videoId={videoId} />}
        <YouTubePlayer videoId={videoId} /> */}
      </div>
    </main>
  );
}
