import YouTube from "react-youtube";

interface YouTubePlayerProps {
	videoId: string
}

const Player = {
	onPlayerPlay: (event: any) => {
		const player = event.target;
		player.playVideo();
	  },
	  onPlayerPause: (event: any) => {
		const player = event.target;
		player.pauseVideo();
	  },

}
export default function YouTubePlayer({ videoId }: YouTubePlayerProps) {
  const onPlayerReady = (event: any) => {
    const player = event.target;
    player.pauseVideo();
  };

//   const onPlayerStateChange = (event: any) => {
//     const player = event.target;
// 	console.log({ player })
//     player.playVideo();
//   };



  const options = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
	<>
    <YouTube
      videoId={videoId || '-BV4IpW5aLI'}
      opts={options}
      onReady={onPlayerReady}
	  onPlay={Player.onPlayerPlay}
	  onPause={Player.onPlayerPause}
     // onStateChange={onPlayerStateChange}


    />
	</>
  );
}