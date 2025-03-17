import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import { moduleService } from "../../../services/api/moduleService";


const VideoPlayer = ({ videoUrl, posterUrl, lastPlayPosition, isWatched, setIsWatched, onDuration, moduleId, onVideoEnd, isFullVideoWatched }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [played, setPlayed] = useState(0);
  const [muted, setMuted] = useState(false);
  const [duration, setDuration] = useState("00:00");
  const [currentTime, setCurrentTime] = useState("00:00");
  const [isFullScreen, setIsFullScreen] = useState(false);
  const playerRef = useRef(null);
  const containerRef = useRef(null);
  const [currentPlayTime, setCurrentPlayTime] = useState(0);
  const currentPlayTimeRef = useRef(0);
  const hasSetInitialPosition = useRef(false);
  const isInitialMount = useRef(true);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Save video position when user leaves/closes tab
  useEffect(() => {
    const handleBeforeUnload = async () => {
      if (moduleId && currentPlayTimeRef.current > 2) {
        try {
          await moduleService.updateLastPlayPosition(moduleId, currentPlayTimeRef.current);
        } catch (error) {
          console.error('Error saving play position:', error);
        }
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      if (moduleId && currentPlayTimeRef.current > 2) {
        moduleService.updateLastPlayPosition(moduleId, currentPlayTimeRef.current)
          .catch(error => console.error('Error saving final play position:', error));
      }
    };
  }, [moduleId]);

  // Restore last play position when video is ready
  useEffect(() => {
    if (isReady && playerRef.current && !hasSetInitialPosition.current && lastPlayPosition > 1) {
      playerRef.current.seekTo(parseFloat(lastPlayPosition));
      hasSetInitialPosition.current = true;
    }
  }, [isReady, lastPlayPosition]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  // Function to save play position
  const savePlayPosition = async (time) => {
    if (isInitialMount.current || !moduleId || time <= 1) {
      return;
    }

    try {
      await moduleService.updateLastPlayPosition(moduleId, Math.floor(time));
    } catch (error) {
      console.error('Error saving play position:', error);
    }
  };

  // Effect to handle component unmount and tab/window close
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && playerRef.current) {
        const currentTime = playerRef.current.getCurrentTime();
        if (currentTime > 1 && !isInitialMount.current) {
          savePlayPosition(currentTime);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    isInitialMount.current = false;

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (playerRef.current && !isInitialMount.current) {
        const currentTime = playerRef.current.getCurrentTime();
        if (currentTime > 1) {
          savePlayPosition(currentTime);
        }
      }
    };
  }, [moduleId]);

  // Track video progress and mark as watched when near end
  const handleProgress = (progress) => {
    setPlayed(progress.played * 100);
    setCurrentTime(formatTime(progress.playedSeconds));
    setCurrentPlayTime(progress.playedSeconds);
    currentPlayTimeRef.current = progress.playedSeconds;

    // Mark video as watched when within 5 seconds of end
    if (playerRef.current) {
      const duration = playerRef.current.getDuration();
      const currentTime = playerRef.current.getCurrentTime();
      if (currentTime >= (duration - 5)) {
        if (!isWatched) {
          setIsWatched(true);
          // Also update backend when near end of video
          moduleService.updateLastPlayPosition(moduleId, currentTime)
            .catch(error => console.error('Error updating watch status:', error));
          moduleService.updateFullVideoWatched(moduleId, true)
            .catch(error => console.error('Error updating full video watched status:', error));
        }
      }
    }
  };

  // Save position when video is paused
  const handlePause = () => {
    if (moduleId && currentPlayTimeRef.current > 2) {
      moduleService.updateLastPlayPosition(moduleId, currentPlayTimeRef.current)
        .catch(error => console.error('Error saving position on pause:', error));
    }
  };

  // Handle video completion
  const handleEnded = () => {
    if (playerRef.current && !isInitialMount.current) {
      const duration = playerRef.current.getDuration();
      // Update with isFullVideoWatched as true when video ends
      moduleService.updateLastPlayPosition(moduleId, duration)
        .catch(error => console.error('Error saving final position:', error));

      // Add call to update full video watched status
      moduleService.updateFullVideoWatched(moduleId, true)
        .catch(error => console.error('Error updating full video watched status:', error));
    }
    onVideoEnd?.();
  };

  const handleDuration = (durationInSeconds) => {
    setDuration(formatTime(durationInSeconds));
    onDuration?.(formatTime(durationInSeconds));
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

  const toggleFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else if (containerRef.current) {
      containerRef.current.requestFullscreen();
    }
  };

  return (
    <div
      ref={containerRef}
      className={`${isFullScreen ? "w-full h-full" : "w-[90vw] lg:w-[75vw] h-[50vw] lg:h-[45vw]"} mx-auto relative`}
      style={isFullScreen ? { position: "fixed", top: 0, left: 0, zIndex: 1000, backgroundColor: "black" } : {}}
    >
      <ReactPlayer
        ref={playerRef}
        url={videoUrl}
        playing={isPlaying}
        muted={muted}
        controls={false}
        width="100%"
        height="100%"
        onProgress={handleProgress}
        onPause={() => {
          handlePause();
          setIsPlaying(false);
        }}
        onEnded={handleEnded}
        onDuration={handleDuration}
        onReady={() => {
          setIsReady(true);
          if (lastPlayPosition && !hasSetInitialPosition.current) {
            playerRef.current.seekTo(lastPlayPosition);
            hasSetInitialPosition.current = true;
          }
        }}
        onPlay={() => setIsPlaying(true)}
        style={isFullScreen ? { position: "absolute", top: 0, left: 0 } : {}}
      />

      {/* Last position indicator */}
      <div className="absolute bottom-14 left-0 right-0 px-4">
        {lastPlayPosition > 1 && (
          <div className="text-white text-sm bg-black/60 p-2 rounded inline-block">
            Last watched position: {formatTime(lastPlayPosition)}
          </div>
        )}
      </div>

      {/* Custom Controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-4 sm:p-6">
        <div
          className="w-full h-2 sm:h-3 bg-gray-600 rounded cursor-pointer mb-4 sm:mb-6"
          onClick={(e) => setPlayed(handleSeek(e))}
        >
          <div
            className="h-full bg-blue-500 rounded"
            style={{ width: `${played}%` }}
          />
        </div>
        <div className="flex items-center space-x-6 sm:space-x-8">
          {/* Rewind Button */}
          <button
            className="relative group hover:text-blue-400"
            onClick={handleRewind}
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7 7-7M17 19l-7-7 7-7"
              />
            </svg>
            <span className="absolute bottom-[-40px] left-1/2 transform -translate-x-1/2 bg-black text-white text-lg px-3 py-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              Rewind 10s
            </span>
          </button>

          {/* Play/Pause Button */}
          <button
            className="relative group hover:text-blue-400"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? (
              <svg
                className="w-8 h-8"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg
                className="w-8 h-8"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
            <span className="absolute bottom-[-40px] left-1/2 transform -translate-x-1/2 bg-black text-white text-lg px-3 py-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              {isPlaying ? "Pause" : "Play"}
            </span>
          </button>

          {/* Current Time / Duration */}
          <span className="text-base sm:text-lg">
            {currentTime} / {duration}
          </span>

          {/* Mute/Unmute Button */}
          <button
            className="relative group hover:text-blue-400"
            onClick={() => setMuted(!muted)}
          >
            {muted ? (
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
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
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                />
              </svg>
            )}
            <span className="absolute bottom-[-40px] left-1/2 transform -translate-x-1/2 bg-black text-white text-lg px-3 py-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              {muted ? "Unmute" : "Mute"}
            </span>
          </button>

          {/* Restart Button */}
          <button
            className="relative group hover:text-blue-400"
            onClick={handleRestart}
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            <span className="absolute bottom-[-40px] left-1/2 transform -translate-x-1/2 bg-black text-white text-lg px-3 py-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              Restart
            </span>
          </button>

          {/* Full-Screen Button */}
          <button
            className="relative group hover:text-blue-400"
            onClick={toggleFullScreen}
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4h6M4 4v6m16-6h-6m6 0v6m0 8h-6m6 0v6M4 20h6M4 20v-6"
              />
            </svg>
            <span className="absolute bottom-[-40px] left-1/2 transform -translate-x-1/2 bg-black text-white text-lg px-3 py-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              Full Screen
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
