"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
// No additional imports needed - using inline SVGs
import { cn } from '@/lib/utils';

interface MusicPlayerProps {
  audioSrc: string;
  className?: string;
  autoPlay?: boolean;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ audioSrc, className, autoPlay = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasAutoPlayed = useRef(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const togglePlayPause = useCallback(async () => {
    if (!audioRef.current) {
      console.warn("Audio player not initialized yet or audioSrc is invalid.");
      return;
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        if (audioRef.current.readyState === 0) { // HAVE_NOTHING
            console.warn("Audio source not ready (readyState is 0). Attempting to load...");
            audioRef.current.load(); // Try to load it again
        }
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.error("Error caught during play():", error);
        setIsPlaying(false);
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (!isClient || !audioRef.current) return;

    const audio = audioRef.current;
    hasAutoPlayed.current = false; // Reset on src change

    const handleCanPlay = async () => {
      if (autoPlay && !hasAutoPlayed.current) {
        hasAutoPlayed.current = true; // Attempt autoplay only once
        try {
          await audio.play();
          setIsPlaying(true);
        } catch (error) {
          console.error("Autoplay was prevented by the browser.", error);
          setIsPlaying(false); // Update state if autoplay fails
        }
      }
    };
    
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setCurrentTime(audio.currentTime);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      audio.currentTime = 0; // Reset to beginning when ended
    };

    const handleErrorEvent = (e: Event) => {
      console.error("Audio element error event:", e);
      if (audio.error) {
        console.error("Audio error code:", audio.error.code, "message:", audio.error.message);
      }
      setIsPlaying(false);
    };
    
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleErrorEvent);

    audio.load(); // Explicitly call load

    return () => {
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleErrorEvent);
    };
  }, [audioSrc, isClient, autoPlay]);

  const formatTime = (time: number) => {
    if (isNaN(time) || time === Infinity) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || duration === 0) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (clickX / width) * duration;
    
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  if (!isClient) {
    return <div className={cn("w-full max-w-xs mx-auto py-4", className)}>Loading player...</div>; 
  }

  return (
    <div className={`mb-8 flex justify-center ${className || ''}`}>
      <div className="px-4 py-6">
        <div className="flex flex-col items-center space-y-4">
          {/* Timestamps */}
           <div className="w-[50vw] flex items-center justify-between">
             <span className="text-pink-600/80 text-sm font-medium">
               {formatTime(currentTime)}
             </span>
             <span className="text-pink-600/80 text-sm font-medium">
               {formatTime(duration)}
             </span>
           </div>
           
           {/* Progress bar */}
           <div className="w-[50vw]">
            <div 
              className="w-full h-2 bg-pink-100/80 rounded-full cursor-pointer overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
              onClick={handleProgressClick}
            >
              <div 
                className="h-full bg-gradient-to-r from-pink-400 to-pink-500 rounded-full transition-all duration-100 relative"
                style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
              >
                <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-pink-500 rounded-full shadow-lg border-2 border-white hover:scale-110 transition-transform duration-200" />
              </div>
            </div>
          </div>
          
          {/* Play/Pause Control */}
          <div className="flex items-center justify-center mt-2">
            <button 
              onClick={togglePlayPause}
              disabled={!audioSrc || (duration === 0 && !isPlaying)}
              className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 hover:from-pink-500 hover:to-pink-700 text-white transition-all duration-300 flex items-center justify-center hover:scale-110 shadow-lg hover:shadow-xl border-2 border-white/90 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
            >
              {isPlaying ? (
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                </svg>
              ) : (
                <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              )}
            </button>
          </div>
          
          {/* Error message */}
          {audioRef.current?.error && (
            <div className="text-sm text-red-500/80 text-center font-medium bg-red-50/80 px-4 py-2 rounded-lg">
              Audio could not be loaded.
            </div>
          )}
        </div>
      </div>
      
      {/* Hidden audio element */}
      <audio 
        ref={audioRef}
        src={audioSrc}
        preload="metadata"
        className="hidden"
      />
    </div>
  );
};

export default MusicPlayer;