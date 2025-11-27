
import React, { useState } from 'react';

const Donate: React.FC = () => {
  const [showSuccess, setShowSuccess] = useState(false);

  if (showSuccess) {
    return (
      <div className="max-w-5xl mx-auto pt-8 animate-fade-in">
        <section className="py-12 bg-glass backdrop-blur-md text-white rounded-lg shadow-xl border border-ghanaGold/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-ghanaGreen via-ghanaGold to-ghanaRed"></div>
          <div className="text-center px-6 py-10">
            <div className="w-24 h-24 bg-ghanaGreen/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-short">
              <i className="fas fa-check text-4xl text-ghanaGreen"></i>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Medaase! 🙏</h2>
            <h3 className="text-xl text-ghanaGold font-semibold mb-6">You are a Legend!</h3>
            <p className="text-gray-300 max-w-lg mx-auto leading-relaxed mb-8 text-lg">
              "Thank you for believing in the dream. Your support helps me create more music, shoot better videos, and put Techiman on the map. God bless you abundantly!"
              <br /><br />
              <span className="font-fiery text-gray-400">- Fatao Cantona</span>
            </p>
            <button
              onClick={() => setShowSuccess(false)}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-3 rounded-full font-bold transition-all hover:scale-105"
            >
              Close
            </button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto pt-8 animate-fade-in">
      <section className="py-12 bg-darkBg text-white rounded-lg shadow-xl border border-ghanaGold/20 animate-fade-in relative bg-glass backdrop-blur-md">
        <div className="h-1 w-full bg-ghanaGold absolute top-0 left-0 rounded-t-lg"></div>
        <h2 className="text-3xl font-bold text-center mb-2 text-ghanaGold mt-4">Support Fatao Cantona</h2>
        <p className="text-gray-400 text-center mb-10 max-w-lg mx-auto">
          Your support helps fund new music, videos, and live performances. Medaase!
        </p>

        <div className="text-center px-4">
          <a
            href="https://paystack.shop/pay/-xpaiesbku"
            target="_blank"
            rel="noreferrer"
            className="inline-block w-full max-w-sm bg-gradient-to-r from-ghanaGreen to-ghanaGold text-black font-extrabold py-5 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-ghanaGold/30 transition-all active:scale-[0.98] duration-200 flex items-center justify-center space-x-3 mx-auto border border-white/10"
          >
            <i className="fas fa-hand-holding-heart text-2xl"></i>
            <span className="text-xl">Donate Securely via Paystack</span>
          </a>
          <p className="text-sm text-gray-400 text-center pt-6 max-w-xs mx-auto leading-relaxed mb-8">
            You will be redirected to a secure payment page. <br />
            <span className="text-ghanaGold">Accepts Mobile Money, Visa, & Mastercard.</span>
          </p>

          <div className="flex items-center justify-center gap-4 mb-8 opacity-50">
            <div className="h-[1px] w-20 bg-white/20"></div>
            <span className="text-xs text-gray-500 uppercase tracking-widest">Done?</span>
            <div className="h-[1px] w-20 bg-white/20"></div>
          </div>

          <button
            onClick={() => setShowSuccess(true)}
            className="text-gray-400 hover:text-white underline text-sm transition-colors"
          >
            I have completed my donation
          </button>
        </div>
      </section>
    </div>
  );
};

export default Donate;
