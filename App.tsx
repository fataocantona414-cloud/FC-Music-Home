import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import MusicPlayer from './components/MusicPlayer';
import LinkSection from './components/LinkSection';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import About from './components/About';
import Contact from './components/Contact';
import Donate from './components/Donate';
import Legal from './components/Legal';
import Shows from './components/Shows';
import { MUSIC_LINKS, SOCIAL_LINKS, PROFILE, UPCOMING_SHOWS } from './constants';
import { ViewType } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [loading, setLoading] = useState(true);

  // Initial loading timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3500); // 3.5 seconds loading time
    return () => clearTimeout(timer);
  }, []);

  // Scroll to top when view changes
  useEffect(() => {
    if (!loading) {
      window.scrollTo(0, 0);
    }
  }, [currentView, loading]);

  const renderContent = () => {
    switch (currentView) {
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      case 'donate':
        return <Donate />;
      case 'terms':
        return <Legal type="terms" />;
      case 'privacy':
        return <Legal type="privacy" />;
      case 'home':
      default:
        return (
          <div className="animate-fade-in">
            <Header />
            {/* Ghana Stripe Decorative Element */}
            <div className="h-[5px] bg-gradient-to-r from-ghanaGreen via-ghanaGold to-ghanaRed my-8 rounded-full max-w-7xl mx-auto"></div>
            <MusicPlayer />
            <Shows shows={UPCOMING_SHOWS} />
            <LinkSection title="Stream My Music" links={MUSIC_LINKS} />
            <LinkSection title="Connect With Me" links={SOCIAL_LINKS} />
          </div>
        );
    }
  };

  // LOADING SCREEN COMPONENT
  if (loading) {
    return (
      <div className="fixed inset-0 bg-darkerBg z-[100] flex flex-col items-center justify-center overflow-hidden">
        <div className="relative">
          {/* Animated Glow Background */}
          <div className="absolute inset-0 bg-orange-500 blur-[80px] opacity-20 rounded-full animate-pulse"></div>
          
          {/* Main Loading Text */}
          <h1 className="relative text-4xl sm:text-6xl md:text-7xl font-fiery bg-gradient-to-b from-[#ffbf00] via-[#ff4500] to-[#ff0000] bg-clip-text text-transparent text-center px-4 animate-pulse scale-up-center">
            {PROFILE.name}
          </h1>
          
          {/* Subtext */}
          <p className="text-gray-500 text-center mt-4 tracking-[0.5em] text-sm uppercase animate-fade-in-delayed">
            Official Website
          </p>
        </div>
        
        {/* Loading Spinner */}
        <div className="mt-12 flex gap-2">
          <div className="w-3 h-3 rounded-full bg-ghanaGreen animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-3 h-3 rounded-full bg-ghanaGold animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-3 h-3 rounded-full bg-ghanaRed animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>

        <style>{`
          @keyframes scaleUp {
            0% { transform: scale(0.9); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }
          .scale-up-center {
            animation: scaleUp 1s ease-out forwards;
          }
          .animate-fade-in-delayed {
            opacity: 0;
            animation: fadeIn 1s ease-out 1s forwards;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden font-sans pb-10">
      <Navbar currentView={currentView} setView={setCurrentView} />
      
      {/* Spacer for fixed navbar */}
      <div className="h-16 mb-4"></div>

      <div className="container mx-auto px-5 max-w-7xl">
        {renderContent()}
        
        <Footer setView={setCurrentView} />
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;