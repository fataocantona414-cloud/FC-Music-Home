import React from 'react';

const MusicPlayer: React.FC = () => {
  return (
    <section className="bg-glass backdrop-blur-md rounded-xl p-6 my-8 shadow-2xl border border-white/10 relative max-w-6xl mx-auto">
      <div className="absolute -top-3 right-5 bg-gradient-to-tr from-[#ff6b6b] via-[#ffa726] to-[#ffeb3b] text-black px-4 py-2 rounded-full font-bold text-xs uppercase tracking-wide shadow-lg animate-flame z-10">
        🔥 NEW
      </div>

      <div className="flex items-center gap-4 mb-4">
        <img 
          src="https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/6d/b0/e3/6db0e356-2290-9234-1e87-ad0924e38098/artwork.jpg/1200x630bf-60.jpg" 
          alt="RIB - Rap Is Back" 
          className="w-[70px] h-[70px] rounded-lg object-cover border-2 border-ghanaGold"
          onError={(e) => {
            e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAiIGhlaWdodD0iNzAiIHZpZXdCb3g9IjAgMCA3MCA3MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjcwIiBoZWlnaHQ9IjcwIiByeD0iOCIgZmlsbD0iIzAwNkIzRiIvPgo8dGV4dCB4PSIzNSIgeT0iMzUiIGZvbnQtc2l6ZT0iOCIgZmlsbD0iI0ZDRDExNiIgZm9udC13ZWlnaHQ9ImJvbGQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPlJJQjwvdGV4dD4KPHRleHQgeD0iMzUiIHk9IjQ1IiBmb250LXNpemU9IjYiIGZpbGw9IndoaXRlIiBmb250LXdlaWdodD0iNjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj5SZXR1cm4gSXMgQmFjazwvdGV4dD4KPC9zdmc+';
          }}
        />
        <div>
          <h3 className="text-lg font-bold">RIB - RAP IS BACK</h3>
          <p className="text-gray-400 text-sm">Fatao Cantona • Single • 2023</p>
        </div>
      </div>

      <div className="w-full">
        <iframe 
          style={{ borderRadius: '12px' }}
          src="https://open.spotify.com/embed/track/1ywIoE8d8HdTeUMBlR40S6?utm_source=generator&theme=0" 
          width="100%" 
          height="152" 
          frameBorder="0" 
          allowFullScreen 
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
          loading="lazy"
          title="Spotify Player"
        ></iframe>
      </div>

      <div className="text-center mt-6">
        <a 
          href="https://linktr.ee/fatao_cantona" 
          target="_blank" 
          rel="noreferrer"
          className="inline-block bg-gradient-to-r from-ghanaGreen to-ghanaRed text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-lg no-underline"
        >
          🎵 Stream All My Songs Everywhere
        </a>
      </div>
    </section>
  );
};

export default MusicPlayer;