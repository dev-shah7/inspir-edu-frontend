import React, { useState, useRef, useEffect } from 'react';

const VideoPlayer = ({ videoUrl, posterUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('00:00');
  const [duration, setDuration] = useState('00:00');
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.log('Auto-play failed:', error);
          videoRef.current.muted = true;
          videoRef.current.play().then(() => {
            setIsPlaying(true);
          });
        });
    }
  }, []);

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    const progress = (video.currentTime / video.duration) * 100;
    setProgress(progress);
    setCurrentTime(formatTime(video.currentTime));
    setDuration(formatTime(video.duration));
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e) => {
    const video = videoRef.current;
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickPosition = e.clientX - rect.left;
    const percentageClicked = (clickPosition / rect.width) * 100;
    const seekTime = (video.duration * percentageClicked) / 100;

    // Only allow seeking backwards
    if (seekTime <= video.currentTime) {
      video.currentTime = seekTime;
      setProgress(percentageClicked);
    }
  };

  const handleRewind = () => {
    const video = videoRef.current;
    video.currentTime = Math.max(video.currentTime - 5, 0);
  };

  const handleToggleMute = () => {
    const video = videoRef.current;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleReplay = () => {
    const video = videoRef.current;
    video.currentTime = 0;
    video.play();
  };

  return (
    <div className='lg:col-span-2'>
      <div className='relative aspect-video bg-black rounded-lg overflow-hidden'>
        <video
          ref={videoRef}
          className='w-full h-full object-cover'
          onTimeUpdate={handleTimeUpdate}
          poster={posterUrl}
        >
          <source src={videoUrl} type='video/mp4' />
          Your browser does not support the video tag.
        </video>

        {/* Custom Controls Overlay */}
        <div className='absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 sm:p-4'>
          <div
            className='w-full h-1.5 sm:h-2 bg-gray-600 rounded cursor-pointer mb-2 sm:mb-4'
            onClick={handleSeek}
          >
            <div
              className='h-full bg-blue-500 rounded'
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className='flex items-center space-x-2 sm:space-x-4'>
            <button className='hover:text-blue-400' onClick={handleRewind}>
              <svg className='w-4 h-4 sm:w-6 sm:h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2}
                  d='M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z'
                />
              </svg>
            </button>
            <button className='hover:text-blue-400' onClick={togglePlay}>
              {isPlaying ? (
                <svg className='w-4 h-4 sm:w-6 sm:h-6' fill='currentColor' viewBox='0 0 24 24'>
                  <path d='M6 4h4v16H6V4zm8 0h4v16h-4V4z' />
                </svg>
              ) : (
                <svg className='w-4 h-4 sm:w-6 sm:h-6' fill='currentColor' viewBox='0 0 24 24'>
                  <path d='M8 5v14l11-7z' />
                </svg>
              )}
            </button>
            <span className='text-xs sm:text-base'>
              {currentTime} / {duration}
            </span>
            <button className='hover:text-blue-400' onClick={handleReplay}>
              <svg className='w-4 h-4 sm:w-6 sm:h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2}
                  d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
                />
              </svg>
            </button>
            <button className='hover:text-blue-400' onClick={handleToggleMute}>
              {isMuted ? (
                <svg className='w-4 h-4 sm:w-6 sm:h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2}
                    d='M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z'
                  />
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2}
                    d='M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2'
                  />
                </svg>
              ) : (
                <svg className='w-4 h-4 sm:w-6 sm:h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2}
                    d='M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z'
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {/* <div className='mt-4 flex space-x-4'>
        <button className='bg-[#F0F8FF] hover:bg-[#e1f1ff] text-gray-900 px-6 py-3 rounded-lg border-[0.3px] border-gray-200 shadow font-medium font-sans text-base transition-colors duration-200'>
          Download
        </button>
        <button className='bg-[#F0F8FF] hover:bg-[#e1f1ff] text-gray-900 px-6 py-3 rounded-lg border-[0.3px] border-gray-200 shadow font-medium font-sans text-base transition-colors duration-200'>
          Transcript
        </button>
      </div> */}
    </div>
  );
};

export default VideoPlayer;