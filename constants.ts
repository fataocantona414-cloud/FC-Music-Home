
import { LinkItem, ProfileData, ShowItem, Song } from './types';

export const PROFILE: ProfileData = {
  name: "Fatao Cantona",
  tagline: "Ghanaian Rapper & Afrobeat Artist",
  location: "Techiman, Bono East, Ghana",
  image: "https://yt3.googleusercontent.com/ytc/AIdro_n6czAJLhZEsN6IifapwtZiycxoo43PHRE_tR-3FOjtzg=s900-c-k-c0x00ffffff-no-rj",
  // Using Cloudinary CDN for maximum reliability
  coverImage: "https://res.cloudinary.com/dklev9xbf/image/upload/v1764280240/488822490_1215780370053781_1612404062156335069_n_csduyh.jpg",
  flagImage: "https://www.citypng.com/public/uploads/preview/ghana-round-metal-framed-flag-icon-png-733961694955658eoaq03f93z.png",
  stats: [
    { value: "15K+", label: "Streams" },
    { value: "24", label: "Releases" },
    { value: "5", label: "Countries" }
  ]
};

export const ABOUT_TEXT = {
  intro: "Fatao Cantona is a dynamic force in the Ghanaian music scene, blending the rhythmic pulse of Afrobeat with the lyrical dexterity of Hip Hop. Hailing from Techiman in the Bono East Region, he represents the new wave of West African talent.",
  bio: "Starting his journey in the vibrant streets of Techiman, Fatao discovered his passion for music as a tool for storytelling and community empowerment. His unique sound captures the essence of Ghanaian life, fusing traditional highlife influences with modern drill and trap beats. Known for his energetic performances and authentic lyricism, Fatao Cantona has rapidly grown a loyal fanbase across Ghana and beyond.",
  mission: "To put Techiman on the global map and inspire the youth through music that speaks truth to power while keeping the dancefloor moving."
};

export const CONTACT_INFO = {
  email: "fataocantona9@gmail.com",
  phone: "+233 547 077 779",
  whatsapp: "https://wa.me/233547077779",
  location: "Techiman, Ghana"
};

// Updated with the single big show
export const UPCOMING_SHOWS: ShowItem[] = [
  {
    id: '1',
    title: 'Culture & Heritage Fest',
    date: 'Sat, 20th Dec 2025 • 10:00 AM',
    venue: 'Techiman - Astroturf',
    // Using Cloudinary CDN for maximum reliability
    flyerUrl: 'https://res.cloudinary.com/dklev9xbf/image/upload/v1764280187/artist_night_ah1oxo.jpg', 
    ticketLink: '#' 
  }
];

// --- NEW SECTION: SONGS ---
export const SONGS: Song[] = [
  {
    id: '1',
    title: 'Brag (feat. Ef-Cee)',
    artist: 'Fatao Cantona',
    url: 'https://res.cloudinary.com/dklev9xbf/video/upload/v1764344714/BRAG_by_Fatao_Cantona_EF-CEE_-_Listen_on_Audiomack_xcmvyw.mp4',
    coverArt: 'https://res.cloudinary.com/dklev9xbf/image/upload/v1764345283/10796803-1_dj8rip.webp'
  },
  {
    id: '2',
    title: 'Wossop (feat. Ef-Cee)',
    artist: 'Fatao Cantona',
    url: 'https://res.cloudinary.com/dklev9xbf/video/upload/v1764345820/Wossop_Mixed_By_Eric_Syte_by_Fatao_Cantona_EF-CEE_-_Listen_on_Audiomack_b2t8ho.mp4',
    coverArt: 'https://res.cloudinary.com/dklev9xbf/image/upload/v1764345803/7193178b98_thadz6.webp'
  },
  {
    id: '3',
    title: 'Fall On Me (feat. Ef-Cee)',
    artist: 'Fatao Cantona',
    url: 'https://res.cloudinary.com/dklev9xbf/video/upload/v1764348043/Fall_On_Me_by_Fatao_Cantona_EF-CEE_-_Listen_on_Audiomack_eicybx.mp4',
    coverArt: 'https://res.cloudinary.com/dklev9xbf/image/upload/v1764348038/1af6b24cf7_khful6.webp'
  },
  {
    id: '4',
    title: 'Problem Go Away',
    artist: 'Fatao Cantona',
    url: 'https://res.cloudinary.com/dklev9xbf/video/upload/v1764349842/Problem_go_away_by_Fatao_Cantona_EF-CEE_-_Listen_on_Audiomack_ssotae.mp4',
    coverArt: 'https://res.cloudinary.com/dklev9xbf/image/upload/v1764349835/9039222-81_uecaic.webp'
  },
  {
    id: '5',
    title: 'Y3hoy3 We Good (feat. Ef-Cee)',
    artist: 'Fatao Cantona',
    url: 'https://res.cloudinary.com/dklev9xbf/video/upload/v1764350063/Y3hoy3_We_Good_by_Fatao_Cantona_EF-CEE_-_Listen_on_Audiomack_ljxf9o.mp3',
    coverArt: 'https://res.cloudinary.com/dklev9xbf/image/upload/v1764350060/fc8166fdf9_p6awij.webp'
  }
];

export const MUSIC_LINKS: LinkItem[] = [
  {
    platform: "Spotify",
    iconClass: "fab fa-spotify",
    description: "Stream on Spotify",
    url: "https://open.spotify.com/artist/7zfwphhbHpq3HP21GYr9Bs?si=AalG5vfEQ4WU1nzsRw25Fg"
  },
  {
    platform: "Apple Music",
    iconClass: "fab fa-apple",
    description: "Listen on Apple Music",
    url: "https://music.apple.com/ng/artist/fatao-cantona/1712679727"
  },
  {
    platform: "YouTube",
    iconClass: "fab fa-youtube",
    description: "Music videos & more",
    url: "https://www.youtube.com/@fataocantona"
  },
  {
    platform: "Audiomack",
    iconClass: "fas fa-headphones",
    description: "Free downloads",
    url: "https://audiomack.com/fataocantona"
  },
  {
    platform: "All Platforms",
    iconClass: "fas fa-music",
    description: "All songs on Linktree",
    url: "https://linktr.ee/fatao_cantona",
    highlight: true
  }
];

export const SOCIAL_LINKS: LinkItem[] = [
  {
    platform: "Instagram",
    iconClass: "fab fa-instagram",
    description: "@fataocantona",
    url: "https://www.instagram.com/fataocantona/"
  },
  {
    platform: "TikTok",
    iconClass: "fab fa-tiktok",
    description: "@fataocantona",
    url: "https://www.tiktok.com/@fataocantona"
  },
  {
    platform: "Twitter/X",
    iconClass: "fab fa-twitter",
    description: "@fatao_cantona",
    url: "https://x.com/fatao_cantona"
  },
  {
    platform: "Facebook",
    iconClass: "fab fa-facebook",
    description: "Fatao Cantona",
    url: "https://www.facebook.com/fatao.cantona"
  },
  {
    platform: "Email",
    iconClass: "fas fa-envelope",
    description: "fataocantona9@gmail.com",
    url: "mailto:fataocantona9@gmail.com"
  },
  {
    platform: "WhatsApp",
    iconClass: "fab fa-whatsapp",
    description: "+233 547077779",
    url: "https://wa.me/233547077779"
  }
];

export const FOOTER_SOCIALS = [
  { icon: "fab fa-instagram", url: "https://www.instagram.com/fataocantona/" },
  { icon: "fab fa-tiktok", url: "https://www.tiktok.com/@fataocantona" },
  { icon: "fab fa-twitter", url: "https://x.com/fatao_cantona" },
  { icon: "fab fa-facebook-f", url: "https://www.facebook.com/fatao.cantona" },
  { icon: "fab fa-youtube", url: "https://www.youtube.com/@fataocantona" }
];
