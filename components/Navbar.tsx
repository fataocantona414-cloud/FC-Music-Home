import React from 'react';
import { ViewType } from '../types';

interface NavbarProps {
  currentView: ViewType;
  setView: (view: ViewType) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView }) => {
  const navItems: { id: ViewType; label: string; icon: string }[] = [
    { id: 'home', label: 'Home', icon: 'fas fa-home' },
    { id: 'about', label: 'About', icon: 'fas fa-user' },
    { id: 'contact', label: 'Contact', icon: 'fas fa-envelope' },
    { id: 'donate', label: 'Support', icon: 'fas fa-hand-holding-heart' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-3 bg-darkBg/90 backdrop-blur-lg border-b border-white/5 shadow-2xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* LOGO: FC with Mic and Fire */}
        <div 
          className="cursor-pointer flex items-center gap-2 group select-none transition-transform hover:scale-105 duration-300"
          onClick={() => setView('home')}
        >
          {/* Logo Icon Composition */}
          <div className="relative w-8 h-8 flex items-center justify-center">
            <i className="fas fa-microphone-lines text-2xl text-gray-200 z-10 group-hover:text-ghanaGold transition-colors"></i>
            <i className="fas fa-fire text-ghanaRed absolute bottom-[-2px] right-[-6px] text-lg drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] animate-pulse"></i>
          </div>
          
          {/* Stylish Text */}
          <div className="font-black text-2xl italic tracking-tighter flex items-baseline leading-none">
            <span className="text-ghanaGold drop-shadow-md mr-[1px]">F</span>
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent drop-shadow-md">C</span>
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`
                px-3 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 flex items-center gap-2
                ${currentView === item.id 
                  ? 'bg-ghanaGreen text-white shadow-lg shadow-ghanaGreen/20' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
                }
              `}
            >
              <i className={`${item.icon} ${currentView === item.id ? '' : 'sm:mr-0'}`}></i>
              <span className={`${currentView === item.id ? 'inline' : 'hidden sm:inline'}`}>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;