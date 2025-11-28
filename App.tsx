
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

// Define EmailPopup locally for the App component
const EmailPopup = ({ isVisible, onClose }: { isVisible: boolean; onClose: () => void }) => {
    const [submissionState, setSubmissionState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle'); 
    const FORMSPREE_ID = "mgvjpeow"; // Real Formspree ID

    if (!isVisible) return null;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmissionState('submitting');
        
        const form = e.currentTarget;
        const formData = new FormData(form);
        
        // Convert formData to a JSON object for safer transmission
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                setSubmissionState('success');
                setTimeout(() => onClose(), 2000);
            } else {
                // Log the actual error from Formspree for debugging
                const errorData = await response.json();
                console.error("Formspree Error:", errorData);
                setSubmissionState('error');
            }
        } catch (error) {
            console.error("Network Error:", error);
            setSubmissionState('error');
        }
    };

    return (
        <div className="fixed inset-0 z-[101] bg-black/80 flex items-center justify-center p-4 animate-fade-in-quick">
            <div className="bg-darkerBg rounded-xl border border-ghanaGold/50 shadow-2xl p-6 w-full max-w-sm relative transform scale-up-center">
                <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors text-xl">
                    <i className="fas fa-times-circle"></i>
                </button>
                
                <div className="text-center mb-6">
                    <i className="fas fa-envelope-open-text text-4xl text-ghanaGold mb-3 animate-wiggle"></i>
                    <h3 className="text-2xl font-bold text-white mb-2">Never Miss a Drop!</h3>
                    <ul className="text-left text-gray-300 text-sm space-y-3 mb-4 bg-white/5 p-4 rounded-lg border border-white/5">
                        <li className="flex items-center gap-3">
                            <i className="fas fa-music text-ghanaGold"></i> 
                            <span>Latest Releases & Videos</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <i className="fas fa-ticket text-ghanaRed"></i> 
                            <span>Upcoming Shows & Tickets</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <i className="fas fa-star text-ghanaGreen"></i> 
                            <span>Exclusive Behind-the-Scenes</span>
                        </li>
                    </ul>
                </div>

                {submissionState === 'success' ? (
                    <div className="text-center py-4 bg-ghanaGreen/20 rounded-lg border border-ghanaGreen">
                        <i className="fas fa-check-circle text-3xl text-ghanaGreen mb-2"></i>
                        <p className="text-white font-bold">Subscribed Successfully!</p>
                    </div>
                ) : (
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <input 
                            type="email" 
                            name="email"
                            placeholder="Enter your email address..." 
                            className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-ghanaGold transition-colors" 
                            required 
                            disabled={submissionState === 'submitting'}
                        />
                        <button 
                            type="submit" 
                            className={`w-full font-bold py-3 rounded-lg shadow-lg transition-all active:scale-95 duration-200 
                                ${submissionState === 'submitting' ? 'bg-gray-600 cursor-not-allowed' : 'bg-gradient-to-r from-ghanaGold to-ghanaRed text-black hover:shadow-ghanaGold/50'}`}
                            disabled={submissionState === 'submitting'}
                        >
                            {submissionState === 'submitting' ? 'Subscribing...' : 'Subscribe for Free'}
                        </button>
                        
                        {submissionState === 'error' && (
                            <p className="text-center text-xs text-red-500">Something went wrong. Please try again.</p>
                        )}
                        
                        {/* Not Now Button */}
                        <button 
                            type="button" 
                            onClick={onClose} 
                            className="w-full text-center text-sm text-gray-500 hover:text-gray-300 transition-colors underline decoration-gray-700 hover:decoration-gray-400 pt-1"
                        >
                            Not now, maybe later
                        </button>

                        <p className="text-center text-xs text-gray-600 pt-2">No spam, just music. Unsubscribe anytime.</p>
                    </form>
                )}
            </div>
        </div>
    );
};

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

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

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem('popupSeen');
    if (!hasSeenPopup) {
        const timer = setTimeout(() => {
            setShowPopup(true);
        }, 1500); 
        return () => clearTimeout(timer);
    }
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
    sessionStorage.setItem('popupSeen', 'true'); 
  };

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
            Only Freemen
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
      <EmailPopup isVisible={showPopup} onClose={handleClosePopup} />

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
