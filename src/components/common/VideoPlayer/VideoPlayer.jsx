import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ videoUrl, posterUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [played, setPlayed] = useState(0);
  const [muted, setMuted] = useState(false);
  const [duration, setDuration] = useState('00:00');
  const [currentTime, setCurrentTime] = useState('00:00');
  const playerRef = useRef(null);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleProgress = (progress) => {
    setPlayed(progress.played * 100);
    setCurrentTime(formatTime(progress.playedSeconds));
  };

  const handleDuration = (durationInSeconds) => {
    setDuration(formatTime(durationInSeconds));
  };

  const handleSeek = (e) => {
    const seekTo = (e.nativeEvent.offsetX / e.currentTarget.offsetWidth) * 100;
    return seekTo / 100; // Normalized value between 0 and 1
  };

  const handleRewind = () => {
    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime();
      playerRef.current.seekTo(Math.max(currentTime - 10, 0));
    }
  };

  const handleRestart = () => {
    if (playerRef.current) {
      playerRef.current.seekTo(0);
      setIsPlaying(true); // Automatically start playing from the beginning
    }
  };

  return (
    <div className="lg:col-span-2">
      <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
        <ReactPlayer
          ref={playerRef}
          url={videoUrl}
          playing={isPlaying}
          muted={muted}
          controls={false}
          width="100%"
          height="100%"
          onProgress={handleProgress}
          onDuration={handleDuration}
        />

        {/* Custom Controls */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 sm:p-4">
          <div
            className="w-full h-1.5 sm:h-2 bg-gray-600 rounded cursor-pointer mb-2 sm:mb-4"
            onClick={(e) => setPlayed(handleSeek(e))}
          >
            <div className="h-full bg-blue-500 rounded" style={{ width: `${played}%` }} />
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button className="hover:text-blue-400" onClick={handleRewind} title="10s Rewind">
              <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7 7-7M17 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button className="hover:text-blue-400" onClick={() => setIsPlaying(!isPlaying)}>
              {isPlaying ? (
                <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
            <span className="text-xs sm:text-base">
              {currentTime} / {duration}
            </span>
            <button className="hover:text-blue-400" onClick={() => setMuted(!muted)}>
              {muted ? (
                <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
                  />
                </svg>
              ) : (
                <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                  />
                </svg>
              )}
            </button>
            <button className="hover:text-blue-400" onClick={handleRestart} title="Restart">
              <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
