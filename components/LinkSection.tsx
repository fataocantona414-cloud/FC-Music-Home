import React from 'react';
import { LinkItem } from '../types';

interface LinkSectionProps {
  title: string;
  links: LinkItem[];
}

const LinkSection: React.FC<LinkSectionProps> = ({ title, links }) => {
  return (
    <section className="my-10 max-w-7xl mx-auto">
      <div className="text-center relative mb-6">
        <h2 className="text-2xl font-normal inline-block relative pb-2">
          {title}
          <span className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-ghanaGold to-ghanaRed rounded-full"></span>
        </h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {links.map((link, index) => (
          <a 
            key={index}
            href={link.url} 
            target="_blank" 
            rel="noreferrer"
            className={`
              bg-glass backdrop-blur-md rounded-xl p-5 text-center transition-all duration-300 
              border border-white/10 hover:-translate-y-1 hover:bg-white/10 hover:shadow-xl hover:border-ghanaGold
              flex flex-col items-center justify-center h-full group
            `}
            onClick={() => console.log(`Navigating to ${link.platform}`)}
          >
            <div className="text-3xl mb-3 text-ghanaGold group-hover:scale-110 transition-transform">
              <i className={link.iconClass}></i>
            </div>
            <div className="font-semibold mb-1 text-base">{link.platform}</div>
            <div className="text-xs text-gray-400">{link.description}</div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default LinkSection;