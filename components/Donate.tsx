import React, { useState } from 'react';
import { CONTACT_INFO } from '../constants';

const Donate: React.FC = () => {
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [network, setNetwork] = useState('MTN');
  const [step, setStep] = useState(1);
  const [copied, setCopied] = useState(false);

  // Clean phone number for display
  const cleanMomoNumber = "0547077779"; 
  const momoName = "Fatao Cantona";

  const handleMomoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;
    setStep(2);
  };

  const handleCopyNumber = () => {
    navigator.clipboard.writeText(cleanMomoNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSentConfirm = () => {
    const subject = `Donation Sent: ₵${amount} from ${name || 'Fan'}`;
    const body = `Hello Fatao,\n\nI have just sent a Mobile Money donation to support your music.\n\n--- Transaction Details ---\nAmount: ₵${amount}\nNetwork: ${network}\nSender Name: ${name || 'Anonymous'}\n\nPlease check your wallet.\n\nKeep up the great work!`;
    
    // Open email client
    window.location.href = `mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Move to success step
    setStep(3);
  };

  return (
    <div className="max-w-5xl mx-auto pt-8 animate-fade-in">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-3">Support The Movement</h2>
        <p className="text-gray-400">Make a secure donation directly via Mobile Money.</p>
      </div>

      {/* Content Container */}
      <div className="bg-glass backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden shadow-2xl relative">
        
        {/* Decorative Top Line */}
        <div className="h-1 w-full bg-ghanaGold"></div>

        <div className="p-6 sm:p-8">
          
          {step === 1 && (
            <form onSubmit={handleMomoSubmit} className="space-y-5 max-w-2xl mx-auto">
              <div className="text-center mb-6">
                <div className="inline-block p-3 rounded-full bg-ghanaGold/10 text-ghanaGold mb-2 text-2xl">
                  <i className="fas fa-hand-holding-dollar"></i>
                </div>
                <h3 className="text-xl font-bold text-white">Make a Donation</h3>
                <p className="text-sm text-gray-400">Secure Mobile Money Transfer</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase text-gray-500 mb-1 font-bold">Your Name (Optional)</label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-darkBg border border-white/10 rounded-lg p-3 text-white focus:border-ghanaGold outline-none transition-colors"
                    placeholder="Kwame..."
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase text-gray-500 mb-1 font-bold">Your Network</label>
                  <select 
                    value={network}
                    onChange={(e) => setNetwork(e.target.value)}
                    className="w-full bg-darkBg border border-white/10 rounded-lg p-3 text-white focus:border-ghanaGold outline-none transition-colors appearance-none"
                  >
                    <option>MTN Mobile Money</option>
                    <option>Telecel Cash (Vodafone)</option>
                    <option>AirtelTigo Money</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase text-gray-500 mb-1 font-bold">Amount (GHS)</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-400 font-bold">₵</span>
                  <input 
                    type="number" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-darkBg border border-white/10 rounded-lg p-3 pl-8 text-white focus:border-ghanaGold outline-none transition-colors font-bold text-lg"
                    placeholder="0.00"
                    required
                    min="1"
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-ghanaGreen to-[#004d2c] text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-green-900/50 transition-all transform hover:-translate-y-1 active:scale-95 duration-200 flex items-center justify-center gap-2 mt-4"
              >
                <span>Proceed</span> <i className="fas fa-arrow-right"></i>
              </button>
            </form>
          )}

          {step === 2 && (
            <div className="animate-fade-in max-w-2xl mx-auto">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-ghanaGold/20 text-ghanaGold rounded-full flex items-center justify-center text-3xl mx-auto mb-3">
                  <i className="fas fa-info-circle"></i>
                </div>
                <h3 className="text-xl font-bold text-white">Payment Details</h3>
                <p className="text-gray-400 text-sm">Please send exactly <strong className="text-white">₵{amount}</strong> to:</p>
              </div>

              <div className="bg-white/5 rounded-xl p-6 mb-6 border border-white/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-ghanaGold text-black text-[10px] font-bold px-2 py-1 rounded-bl-lg">
                  MTN MoMo
                </div>

                <div className="text-center">
                    <div className="text-sm text-gray-400 uppercase tracking-widest mb-1">Number</div>
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <span className="text-3xl font-mono font-bold text-white tracking-wider">{cleanMomoNumber}</span>
                      <button 
                        onClick={handleCopyNumber}
                        className="bg-white/10 hover:bg-white/20 p-2 rounded-lg text-ghanaGold transition-all active:scale-95"
                        title="Copy Number"
                      >
                        <i className={`fas ${copied ? 'fa-check' : 'fa-copy'}`}></i>
                      </button>
                    </div>

                    <div className="flex justify-between items-center border-t border-white/10 pt-4 text-sm">
                      <span className="text-gray-400">Account Name:</span>
                      <span className="font-bold text-white">{momoName}</span>
                    </div>
                </div>
              </div>

              <div className="bg-darkBg/50 rounded-lg p-4 mb-6 text-sm text-gray-300 border border-white/5">
                <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                  <i className="fas fa-list-ol text-ghanaGreen"></i> Instructions:
                </h4>
                <ol className="list-decimal list-inside space-y-1 ml-1">
                  <li>Dial <strong>*170#</strong> (or your network's code)</li>
                  <li>Select <strong>Transfer Money</strong></li>
                  <li>Enter Number: <strong>{cleanMomoNumber}</strong></li>
                  <li>Confirm Name: <strong>{momoName}</strong></li>
                  <li>Enter Amount: <strong>₵{amount}</strong></li>
                </ol>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => setStep(1)}
                  className="flex-1 py-3 rounded-lg border border-white/10 hover:bg-white/5 text-gray-300 font-medium transition-all active:scale-95 duration-200"
                >
                  Back
                </button>
                <button 
                  onClick={handleSentConfirm}
                  className="flex-1 py-3 rounded-lg bg-green-700 text-white font-bold hover:bg-green-600 transition-all shadow-lg active:scale-95 duration-200 flex items-center justify-center gap-2"
                >
                  <i className="fas fa-paper-plane"></i> I've Sent It
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-fade-in text-center py-4">
              <div className="w-20 h-20 bg-ghanaGreen rounded-full flex items-center justify-center text-4xl text-white mx-auto mb-6 shadow-xl shadow-green-900/40 animate-bounce-short">
                <i className="fas fa-check"></i>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-2">Medaase! 🙏</h3>
              <p className="text-ghanaGold font-medium text-lg mb-4">Thank you for your support.</p>
              
              <p className="text-gray-400 text-sm mb-8 leading-relaxed max-w-sm mx-auto">
                I've received your notification for <strong>₵{amount}</strong>. Your contribution helps keep the music alive!
              </p>

              <button 
                onClick={() => {
                  setAmount('');
                  setName('');
                  setStep(1);
                }}
                className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-xl border border-white/10 transition-all active:scale-95 duration-200"
              >
                Make Another Donation
              </button>
            </div>
          )}

        </div>
      </div>
      
      <p className="text-center text-xs text-gray-500 mt-8 max-w-md mx-auto">
        <i className="fas fa-shield-alt mr-1"></i> 
        100% of donations go directly to Fatao Cantona's music production and management.
      </p>

      <style>{`
        @keyframes bounceShort {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-short {
          animation: bounceShort 1s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Donate;