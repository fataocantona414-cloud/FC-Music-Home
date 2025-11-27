import React from 'react';
import { PROFILE, ABOUT_TEXT } from '../constants';

const About: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto pt-8 animate-fade-in">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-4 inline-block relative">
          About The Artist
          <div className="h-1 w-1/2 bg-ghanaGold absolute -bottom-2 left-1/4 rounded-full"></div>
        </h2>
      </div>

      <div className="bg-glass backdrop-blur-md rounded-2xl p-6 sm:p-10 border border-white/10 shadow-2xl">
        <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
          <div className="w-full md:w-1/3 flex justify-center">
            <div className="relative">
              <img 
                src={PROFILE.image} 
                alt="Fatao Cantona" 
                className="w-48 h-48 object-cover rounded-2xl border-2 border-ghanaGold shadow-lg rotate-3"
              />
              <div className="absolute -bottom-3 -right-3 bg-ghanaRed text-white px-3 py-1 rounded-lg text-xs font-bold shadow-md">
                GHANA
              </div>
            </div>
          </div>
          <div className="w-full md:w-2/3 text-center md:text-left">
            <h3 className="text-2xl font-bold text-ghanaGold mb-3">{PROFILE.name}</h3>
            <p className="text-gray-300 leading-relaxed text-lg mb-4">
              {ABOUT_TEXT.intro}
            </p>
          </div>
        </div>

        <div className="space-y-6 text-gray-300 leading-relaxed">
          <div>
            <h4 className="text-white font-bold text-xl mb-2 flex items-center gap-2">
              <i className="fas fa-history text-ghanaRed"></i> The Journey
            </h4>
            <p>{ABOUT_TEXT.bio}</p>
          </div>
          
          <div className="bg-white/5 p-5 rounded-xl border-l-4 border-ghanaGreen">
            <h4 className="text-white font-bold text-lg mb-2">My Mission</h4>
            <p className="italic text-gray-400">"{ABOUT_TEXT.mission}"</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;