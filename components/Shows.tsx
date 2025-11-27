
import React, { useState } from 'react';
import { ShowItem } from '../types';

// Declare global confetti function from CDN
declare global {
  interface Window {
    confetti: any;
  }
}

interface ShowsProps {
  shows: ShowItem[];
}

const Shows: React.FC<ShowsProps> = ({ shows }) => {
  const isSingle = shows.length === 1;
  const [revealedStates, setRevealedStates] = useState<Record<string, boolean>>({});

  const handleGuessRate = (showId: string) => {
    if (!revealedStates[showId]) {
      // Trigger Confetti
      if (window.confetti) {
        window.confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#006b3f', '#ce1126', '#fcd116'] // Ghana colors
        });
      }

      setRevealedStates(prev => ({
        ...prev,
        [showId]: true
      }));
    }
  };

  return (
    <section className="my-12 max-w-7xl mx-auto">
      <div className="text-center relative mb-10">
        <h2 className="text-3xl font-bold inline-block relative pb-2 uppercase tracking-wide text-white">
          Upcoming Shows
          <span className="absolute bottom-0 left-1/4 w-1/2 h-[4px] bg-gradient-to-r from-ghanaGreen via-ghanaGold to-ghanaRed rounded-full"></span>
        </h2>
        <p className="text-gray-400 mt-2 text-sm">Catch Fatao Cantona Live on Stage!</p>
      </div>
      
      {shows.length > 0 ? (
        <div className={isSingle ? "max-w-2xl mx-auto px-4" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4"}>
          {shows.map((show) => (
            <div 
              key={show.id} 
              className={`
                group bg-glass backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 hover:border-ghanaGold transition-all duration-300 hover:shadow-2xl 
                ${isSingle ? 'transform hover:scale-[1.02]' : 'hover:-translate-y-2'}
              `}
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-black/40">
                {/* Flyer Image */}
                <img 
                  src={show.flyerUrl} 
                  alt={show.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback if image fails to load
                    e.currentTarget.src = 'https://placehold.co/600x800/006b3f/FFF?text=Flyer+Coming+Soon';
                  }}
                />
                
                {/* Live Badge */}
                <div className="absolute top-4 right-4 bg-ghanaRed text-white font-bold px-3 py-1 rounded-md shadow-lg text-sm z-10 animate-pulse">
                  FEATURED EVENT
                </div>

                {/* Gradient Overlay for Text Readability - Stronger at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90"></div>
                
                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8">
                  <div className="inline-block bg-ghanaGold text-black font-bold px-2 py-1 rounded text-xs mb-2 uppercase tracking-wider">
                    {show.date.split('•')[0]}
                  </div>
                  <h3 className={`font-bold text-white mb-2 leading-tight font-fiery ${isSingle ? 'text-3xl sm:text-4xl' : 'text-2xl'}`}>
                    {show.title}
                  </h3>
                  <div className="flex flex-col gap-1 text-gray-200 text-sm mb-6">
                     <div className="flex items-center">
                        <i className="fas fa-clock mr-2 text-ghanaGold w-5 text-center"></i>
                        {show.date.split('•')[1] || 'Time TBD'}
                     </div>
                     <div className="flex items-center">
                        <i className="fas fa-map-marker-alt mr-2 text-ghanaRed w-5 text-center"></i>
                        {show.venue}
                     </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button 
                      onClick={() => handleGuessRate(show.id)}
                      className={`
                        flex-1 text-center font-bold py-3 rounded-xl transition-all duration-300 active:scale-95 border border-white/10 backdrop-blur-sm
                        ${revealedStates[show.id] 
                          ? 'bg-ghanaGold text-black shadow-[0_0_20px_rgba(252,209,22,0.5)] transform scale-105' 
                          : 'bg-white/20 hover:bg-white/30 text-white animate-pulse'
                        }
                      `}
                    >
                       {revealedStates[show.id] ? "It's Freeeee! 🎉" : "Guess Rate ❓"}
                    </button>
                    {show.ticketLink && show.ticketLink !== '#' && (
                       <a 
                        href={show.ticketLink} 
                        className="flex-1 flex items-center justify-center text-center bg-ghanaGold hover:bg-yellow-400 text-black font-bold py-3 rounded-xl transition-all active:scale-95 shadow-lg"
                      >
                         Details
                       </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center p-10 bg-white/5 rounded-xl border border-white/10 mx-4">
           <i className="fas fa-calendar-times text-4xl text-gray-600 mb-4"></i>
           <p className="text-gray-400 text-lg">No upcoming shows scheduled at the moment.</p>
           <p className="text-gray-500 text-sm mt-2">Check back soon for updates!</p>
        </div>
      )}
    </section>
  );
};

export default Shows;
