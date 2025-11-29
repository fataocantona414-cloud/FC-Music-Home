

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
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  
  // Tooltip States
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipTime, setTooltipTime] = useState(0);
  const [tooltipPos, setTooltipPos] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const currentSong = songs[currentTrackIndex];

  useEffect(() => {
    // Reset player when song changes
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      audioRef.current.volume = isMuted ? 0 : volume;
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

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume;
        setIsMuted(false);
      } else {
        audioRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
    }
    setIsMuted(val === 0);
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

  // Enhanced Progress Bar Handlers
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (audioRef.current && progressBarRef.current) {
          const rect = progressBarRef.current.getBoundingClientRect();
          const clickX = e.clientX - rect.left;
          const width = rect.width;
          const newTime = (clickX / width) * duration;
          
          audioRef.current.currentTime = newTime;
          setProgress(newTime);
      }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (progressBarRef.current && duration > 0) {
          const rect = progressBarRef.current.getBoundingClientRect();
          const hoverX = e.clientX - rect.left;
          const width = rect.width;
          const time = (hoverX / width) * duration;
          
          // Clamp values
          const clampedTime = Math.max(0, Math.min(time, duration));
          const clampedPos = Math.max(0, Math.min(hoverX, width));

          setTooltipTime(clampedTime);
          setTooltipPos(clampedPos);
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
            <div className="flex justify-between items-end mb-2">
                 <div className="overflow-hidden">
                    <h3 className="text-2xl font-fiery text-white mb-1 truncate">{currentSong.title}</h3>
                    <p className="text-gray-400 text-sm">{currentSong.artist}</p>
                 </div>
                 
                 {/* VISUALIZER */}
                 <div className="hidden sm:flex items-end gap-[3px] h-8 pb-1">
                    {[...Array(12)].map((_, i) => (
                        <div 
                            key={i} 
                            className={`w-1 bg-gradient-to-t from-ghanaGreen via-ghanaGold to-ghanaRed rounded-t-sm ${isPlaying ? 'animate-sound-bar' : 'h-[10%]'}`}
                            style={{ 
                                animationDelay: `${Math.random() * 0.5}s`,
                                animationDuration: `${0.8 + Math.random() * 0.4}s`
                            }}
                        ></div>
                    ))}
                 </div>
            </div>

            {/* Enhanced Progress Bar */}
            <div className="flex items-center gap-3 text-xs font-mono text-gray-400 mb-6">
              <span>{formatTime(progress)}</span>
              
              <div 
                  className="flex-1 relative h-6 flex items-center cursor-pointer group"
                  ref={progressBarRef}
                  onClick={handleProgressClick}
                  onMouseMove={handleMouseMove}
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
              >
                  {/* Track Background */}
                  <div className="absolute inset-x-0 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      {/* Progress Fill (Ghana Colors) */}
                      <div 
                          className="h-full bg-gradient-to-r from-ghanaGreen via-ghanaGold to-ghanaRed relative"
                          style={{ width: `${duration ? (progress / duration) * 100 : 0}%` }}
                      ></div>
                  </div>
                  
                  {/* Thumb (Visible on Hover/Drag) */}
                  <div 
                      className="absolute h-4 w-4 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)] transform -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform duration-150 ease-out"
                      style={{ left: `${duration ? (progress / duration) * 100 : 0}%` }}
                  ></div>

                  {/* Tooltip */}
                  <div 
                      className={`absolute -top-8 bg-darkBg border border-ghanaGold/30 text-ghanaGold text-xs font-bold px-2 py-1 rounded shadow-lg transform -translate-x-1/2 pointer-events-none transition-opacity duration-200 ${showTooltip ? 'opacity-100' : 'opacity-0'}`}
                      style={{ left: tooltipPos }}
                  >
                      {formatTime(tooltipTime)}
                      <div className="absolute bottom-[-4px] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-darkBg border-r border-b border-ghanaGold/30 rotate-45"></div>
                  </div>
              </div>
              
              <span>{formatTime(duration)}</span>
            </div>

            {/* Buttons Row */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-6">
                {/* Transport Controls */}
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

                {/* Volume Slider */}
                <div className="hidden sm:flex items-center gap-2 group/vol">
                    <button onClick={toggleMute} className="text-gray-400 hover:text-white transition-colors w-5 text-center">
                        <i className={`fas ${isMuted || volume === 0 ? 'fa-volume-mute' : volume < 0.5 ? 'fa-volume-down' : 'fa-volume-up'}`}></i>
                    </button>
                    <input 
                        type="range" 
                        min="0" 
                        max="1" 
                        step="0.05"
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        className="w-16 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-ghanaGold hover:accent-white transition-all"
                        title="Volume"
                    />
                </div>
              </div>

              {/* Download Button */}
              <a 
                href={currentSong.url} 
                download 
                target="_blank" 
                rel="noreferrer"
                onClick={handleDownload}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full hover:bg-ghanaRed hover:border-transparent hover:text-white transition-all text-sm text-gray-300 ml-auto"
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
        <div className="bg-black/40 border-t border-white/5 p-4 max-h-56 overflow-y-auto relative z-10 custom-scrollbar">
          <div className="flex justify-between items-center mb-2">
             <p className="text-xs uppercase text-gray-500 font-bold">Playlist</p>
             <span className="text-xs text-gray-600">{songs.length} Tracks</span>
          </div>
          <ul className="space-y-1">
            {songs.map((song, idx) => (
              <li 
                key={song.id} 
                onClick={() => setCurrentTrackIndex(idx)}
                className={`
                   p-3 rounded-lg flex items-center justify-between cursor-pointer text-sm transition-all duration-200 border-l-2
                   ${currentTrackIndex === idx 
                      ? 'bg-white/10 border-ghanaGold text-ghanaGold shadow-[inset_0_0_10px_rgba(252,209,22,0.1)] pl-4' 
                      : 'border-transparent text-gray-400 hover:bg-white/5 hover:text-white hover:border-white/20 hover:pl-4'
                   }
                `}
              >
                <div className="flex items-center gap-3">
                  <span className={`text-xs w-4 ${currentTrackIndex === idx ? 'opacity-100 text-ghanaRed' : 'opacity-50'}`}>
                      {currentTrackIndex === idx && isPlaying ? <i className="fas fa-play animate-pulse"></i> : idx + 1}
                  </span>
                  <div className="flex flex-col">
                      <span className={`font-medium ${currentTrackIndex === idx ? 'text-white' : ''} truncate max-w-[150px] sm:max-w-xs`}>
                          {song.title}
                      </span>
                      {currentTrackIndex === idx && <span className="text-[10px] opacity-70">Now Playing</span>}
                  </div>
                </div>
                
                {/* Active Indicator Bars */}
                {currentTrackIndex === idx && (
                    <div className="flex gap-1 h-3 items-end">
                         <div className="w-0.5 bg-ghanaGold animate-sound-bar" style={{animationDuration: '0.6s'}}></div>
                         <div className="w-0.5 bg-ghanaGold animate-sound-bar" style={{animationDuration: '0.8s'}}></div>
                         <div className="w-0.5 bg-ghanaGold animate-sound-bar" style={{animationDuration: '1.0s'}}></div>
                    </div>
                )}
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
        
        @keyframes soundBar {
          0% { height: 10%; }
          50% { height: 100%; }
          100% { height: 10%; }
        }
        .animate-sound-bar {
          animation: soundBar 1.2s ease-in-out infinite;
        }
        .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: #333;
            border-radius: 4px;
        }
      `}</style>
    </div>
  );
};

export default AudioPlayer;
