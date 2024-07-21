'use client';
import Sheet, { MemoedSheet } from '@/components/Sheet';
import YouTubePlayer from '@/components/YouTubePlayer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Home() {
  const [videoId, setVideoId] = useState('');
  const [display, setDisplay] = useState(false);

  return (
    <main className=''>
      <div className='flex flex-col gap-4'>
        <Sheet/>
      </div>
    </main>
  );
}
