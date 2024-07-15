'use client';
import JoinCreateTabs from '@/components/JoinCreateTabs';
import YouTubePlayer from '@/components/YouTubePlayer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const Test = () => {
  const x = async () =>{
    // const m = (await navigator).mediaDevices.getDisplayMedia({
    //   video: true
    // })
    const m = await navigator.mediaDevices.getDisplayMedia({
      video: { displaySurface: 'monitor'}
  })
 
  const video = document.querySelector('video')
  video!.srcObject = m
  video?.play()
    return m
  
  }

  useEffect(() => {
    x()
  },[])

  return <video>No video available</video>

}
export default function Home() {
  const [videoId, setVideoId] = useState('');
  const [display, setDisplay] = useState(false)

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>

      <div className='flex flex-col gap-4'>
        <JoinCreateTabs
              videoId={videoId}
              setVideoId={setVideoId}
              setDisplay={setDisplay}
          />
  
        {/* {display && <YouTubePlayer videoId={videoId} />}
        <YouTubePlayer videoId={videoId} /> */}
      </div>
      <Test/>
    </main>
  );
}
