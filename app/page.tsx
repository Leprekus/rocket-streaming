'use client';
import YouTubePlayer from '@/components/YouTubePlayer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { useEffect, useState } from 'react';
export default function Home() {
  const [videoId, setVideoId] = useState('');


  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>

      <div className='flex flex-col gap-4'>
        <div className='flex gap-4'>
          <Input
            className='text-black'
            onChange={(e) => {
              e.preventDefault();
              setVideoId(e.target.value || '');
            }}
            placeholder='Paste your YouTube video id'
            value={videoId}
          />
          <Button>Start session</Button>
        </div>
        {/* {videoId.length > 0 && <YouTubePlayer videoId={videoId} />} */}
        <YouTubePlayer videoId={videoId} />
      </div>
    </main>
  );
}
