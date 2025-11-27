
import React from 'react';
import { PROFILE } from '../constants';

const Header: React.FC = () => {
  return (
    <header className="relative max-w-7xl mx-auto mb-8">
      {/* Cover Image Section */}
      <div className="h-48 md:h-80 w-full relative rounded-b-3xl overflow-hidden group border-b border-white/10 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-t from-darkBg via-transparent to-transparent z-10 opacity-90"></div>
        <img 
          src={PROFILE.coverImage} 
          alt="Cover" 
          className="w-full h-full object-cover object-top transition-transform duration-[10s] ease-in-out group-hover:scale-110"
          onError={(e) => {
             // Fallback to a nice gradient if the image link fails (common with mediafire web links)
             e.currentTarget.style.display = 'none';
             e.currentTarget.parentElement?.classList.add('bg-gradient-to-r', 'from-ghanaGreen', 'via-black', 'to-ghanaRed');
          }}
        />
      </div>

      {/* Profile Content - Overlapping the Cover */}
      <div className="relative -mt-20 md:-mt-24 z-20 flex flex-col items-center px-4">
        
        {/* Profile Picture */}
        <div className="profile-container relative inline-block mb-4">
          <img 
            src={PROFILE.image} 
            alt={PROFILE.name} 
            className="w-[160px] h-[160px] md:w-[200px] md:h-[200px] rounded-full object-cover border-4 border-darkBg ring-4 ring-ghanaGold shadow-2xl transition-all duration-300 hover:scale-105 bg-darkBg"
          />
          <img 
            src={PROFILE.flagImage} 
            alt="Ghana Flag" 
            className="absolute bottom-4 right-4 w-[40px] h-[40px] md:w-[50px] md:h-[50px] rounded-full border-[3px] border-darkBg shadow-lg"
            onError={(e) => (e.currentTarget.style.display = 'none')}
          />
        </div>

        {/* Text Content */}
        <div className="text-center animate-fade-in">
          <h1 className="text-4xl sm:text-6xl mb-2 tracking-wide font-fiery bg-gradient-to-b from-[#ffbf00] via-[#ff4500] to-[#ff0000] bg-clip-text text-transparent drop-shadow-[0_2px_4px_rgba(200,0,0,0.5)]">
            {PROFILE.name}
          </h1>
          
          <p className="text-lg text-gray-300 mb-5 font-light tracking-wide">
            {PROFILE.tagline}
          </p>

          <div className="flex items-center justify-center gap-2 mb-6 text-ghanaGold font-medium bg-white/5 inline-flex px-4 py-1 rounded-full border border-white/10 backdrop-blur-sm">
            <i className="fas fa-map-marker-alt"></i>
            <span>{PROFILE.location}</span>
          </div>

          <div className="flex justify-center gap-8 md:gap-12 mt-2">
            {PROFILE.stats.map((stat, index) => (
              <div key={index} className="text-center group cursor-default">
                <div className="text-2xl md:text-3xl font-bold text-white group-hover:text-ghanaGold transition-colors">{stat.value}</div>
                <div className="text-[10px] md:text-xs text-gray-500 group-hover:text-gray-300 uppercase tracking-[0.2em] mt-1 transition-colors">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
