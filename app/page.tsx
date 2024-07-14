'use client';
import Player from '@/components/Player';
import Image from 'next/image';
import { useEffect, useState } from 'react';
export default function Home() {
  const [videoId, setVideoId] = useState('');


  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <input
        className='text-black'
        onChange={(e) => {
          e.preventDefault();
  
          setVideoId(e.target.value || '');
        }}
        placeholder='Paste your YouTube video id'
        value={videoId}
      />
      <Player videoId={videoId} />
    </main>
  );
}
