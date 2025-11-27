
import React from 'react';
import { FOOTER_SOCIALS } from '../constants';
import { ViewType } from '../types';

interface FooterProps {
  setView: (view: ViewType) => void;
}

const Footer: React.FC<FooterProps> = ({ setView }) => {
  return (
    <footer className="text-center pt-8 pb-8 mt-10 border-t border-white/10 text-gray-400 text-sm max-w-7xl mx-auto">
      {/* Social Icons Row */}
      <div className="flex justify-center gap-4 mb-8">
        {FOOTER_SOCIALS.map((social, index) => (
          <a 
            key={index}
            href={social.url} 
            target="_blank" 
            rel="noreferrer"
            className="w-[50px] h-[50px] rounded-full bg-glass border border-white/10 flex items-center justify-center text-xl text-gray-100 transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:bg-ghanaGreen hover:text-white hover:shadow-lg hover:border-transparent"
          >
            <i className={social.icon}></i>
          </a>
        ))}
      </div>

      <p className="mb-4">&copy; 2023 Fatao Cantona. All rights reserved. Proudly Ghanaian.</p>
      
      <div className="flex justify-center gap-5 flex-wrap px-4">
        <button onClick={() => setView('privacy')} className="hover:text-ghanaGold transition-colors bg-transparent border-none cursor-pointer">Privacy Policy</button>
        <button onClick={() => setView('terms')} className="hover:text-ghanaGold transition-colors bg-transparent border-none cursor-pointer">Terms of Service</button>
        <button onClick={() => setView('contact')} className="hover:text-ghanaGold transition-colors bg-transparent border-none cursor-pointer">Contact & Booking</button>
        <a 
          href="https://distrokid.com/product/distrokid/plans-and-pricing-2?utm_source=google&utm_medium=cpc&utm_campaign=&utm_content=&utm_term=distrokid&device=c&kw_matchtype=e&network=g&gad_source=1&gad_campaignid=23270722555&gbraid=0AAAAADfMxXsTQuZBKHgbxbdw3XmNOMsK-&gclid=CjwKCAiA55rJBhByEiwAFkY1QM91Kx8zVYg3JIklQ9xmfeAO6VYxtQPBaid_DDxsDMpn7ifEtSeJNhoC5dsQAvD_BwE" 
          target="_blank" 
          rel="noreferrer"
          className="hover:text-ghanaGold transition-colors"
        >
          Distributed by DistroKid
        </a>
      </div>
    </footer>
  );
};

export default Footer;