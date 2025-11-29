
import React, { useState, useRef, useEffect } from 'react';
import { Song } from '../types';

interface AudioPlayerProps {
  songs: Song[];
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ songs }) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentSong = songs[currentTrackIndex];

  useEffect(() => {
    // Reset player when song changes
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Playback error:", e));
      }
    }
  }, [currentTrackIndex]);

  useEffect(() => {
     // Handle auto-play for next track
     const audio = audioRef.current;
     if(!audio) return;

     const handleEnded = () => {
         handleNext();
     };

     audio.addEventListener('ended', handleEnded);
     return () => audio.removeEventListener('ended', handleEnded);
  }, [currentTrackIndex]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error("Playback error:", e));
        
        // GA4 Tracking: Audio Play
        if (typeof (window as any).gtag === 'function') {
            (window as any).gtag('event', 'audio_play', {
                'event_category': 'Audio',
                'event_label': currentSong.title,
                'song_title': currentSong.title,
                'artist': currentSong.artist
            });
        }
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleDownload = () => {
    // GA4 Tracking: Audio Download
    if (typeof (window as any).gtag === 'function') {
        (window as any).gtag('event', 'audio_download', {
            'event_category': 'Audio',
            'event_label': currentSong.title,
            'song_title': currentSong.title,
            'artist': currentSong.artist
        });
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const total = audioRef.current.duration;
      setProgress(current);
      setDuration(total || 0);
    }
  };

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % songs.length);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + songs.length) % songs.length);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const newTime = Number(e.target.value);
      audioRef.current.currentTime = newTime;
      setProgress(newTime);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="max-w-6xl mx-auto my-8 animate-fade-in">
      <div className="bg-glass backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative">
        {/* Background Ambient Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-ghanaGreen/20 via-black to-ghanaRed/20 opacity-50 z-0"></div>
        
        <div className="relative z-10 p-6 flex flex-col md:flex-row items-center gap-6">
          
          {/* Cover Art / Visualizer */}
          <div className="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0 group">
             {/* Simple spinning animation when playing */}
            <div className={`absolute inset-0 rounded-full border-2 border-dashed border-ghanaGold/50 ${isPlaying ? 'animate-spin-slow' : ''}`}></div>
            <img 
              src={currentSong.coverArt || "https://yt3.googleusercontent.com/ytc/AIdro_n6czAJLhZEsN6IifapwtZiycxoo43PHRE_tR-3FOjtzg=s900-c-k-c0x00ffffff-no-rj"} 
              alt="Track Art" 
              className={`w-full h-full object-cover rounded-full shadow-lg border-4 border-darkBg ${isPlaying ? 'animate-pulse-glow' : ''}`}
            />
            <div className="absolute bottom-0 right-0 bg-ghanaGold text-black text-xs font-bold px-2 py-1 rounded-full">
              MP3
            </div>
          </div>

          {/* Controls & Info */}
          <div className="flex-1 w-full">
            <h3 className="text-2xl font-fiery text-white mb-1 truncate">{currentSong.title}</h3>
            <p className="text-gray-400 text-sm mb-4">{currentSong.artist}</p>

            {/* Progress Bar */}
            <div className="flex items-center gap-3 text-xs font-mono text-gray-400 mb-4">
              <span>{formatTime(progress)}</span>
              <input 
                type="range" 
                min="0" 
                max={duration || 100} 
                value={progress} 
                onChange={handleProgressChange}
                className="flex-1 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-ghanaGold hover:accent-white transition-all"
              />
              <span>{formatTime(duration)}</span>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button onClick={handlePrev} className="text-gray-400 hover:text-white transition-colors text-xl">
                  <i className="fas fa-step-backward"></i>
                </button>
                <button 
                  onClick={togglePlay} 
                  className="w-12 h-12 rounded-full bg-gradient-to-r from-ghanaGreen to-ghanaGold text-black flex items-center justify-center text-xl shadow-lg hover:scale-105 active:scale-95 transition-all"
                >
                  <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play pl-1'}`}></i>
                </button>
                <button onClick={handleNext} className="text-gray-400 hover:text-white transition-colors text-xl">
                  <i className="fas fa-step-forward"></i>
                </button>
              </div>

              {/* Download Button */}
              <a 
                href={currentSong.url} 
                download 
                target="_blank" 
                rel="noreferrer"
                onClick={handleDownload}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full hover:bg-ghanaRed hover:border-transparent hover:text-white transition-all text-sm text-gray-300"
              >
                <i className="fas fa-download"></i>
                <span className="hidden sm:inline">Download</span>
              </a>
            </div>
          </div>
        </div>

        {/* Hidden Audio Element */}
        <audio 
          ref={audioRef}
          src={currentSong.url}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleTimeUpdate}
        />
        
        {/* Playlist List (Mobile optimized: scrollable) */}
        <div className="bg-black/40 border-t border-white/5 p-4 max-h-40 overflow-y-auto relative z-10">
          <p className="text-xs uppercase text-gray-500 font-bold mb-2">Playlist</p>
          <ul className="space-y-1">
            {songs.map((song, idx) => (
              <li 
                key={song.id} 
                onClick={() => setCurrentTrackIndex(idx)}
                className={`p-2 rounded-lg flex items-center justify-between cursor-pointer text-sm transition-colors ${currentTrackIndex === idx ? 'bg-white/10 text-ghanaGold' : 'hover:bg-white/5 text-gray-400'}`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs w-4 opacity-50">{idx + 1}</span>
                  <span className="truncate max-w-[150px] sm:max-w-xs">{song.title}</span>
                </div>
                {currentTrackIndex === idx && isPlaying && <i className="fas fa-volume-up text-xs animate-pulse"></i>}
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <style>{`
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default AudioPlayer;
