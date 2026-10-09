export type AccessType = 'free' | 'vip' | 'ppv';

export type AIStyle = 
  | 'Dân gian & Sơn mài'
  | 'Cyberpunk Việt Nam'
  | 'Anime Cinematic'
  | 'Photorealistic Cinema'
  | 'Cổ trang Dã sử'
  | 'Huyền bí & Kinh dị';

export type MovieCategory = 
  | 'Tất cả'
  | 'Phim Ngắn AI'
  | 'Series Nhiều Tập'
  | 'Trailer Ý Tưởng'
  | 'Hoạt Hình & Anime'
  | 'Dân Gian Huyền Bí';

export interface Episode {
  id: string;
  episodeNumber: number;
  title: string;
  duration: string;
  thumbnailUrl: string;
  videoHlsUrl: string; // HLS .m3u8 stream
  synopsis: string;
}

export interface Movie {
  id: string;
  slug: string;
  title: string;
  originalTitle?: string;
  tagline: string;
  synopsis: string;
  posterUrl: string;
  backdropUrl: string;
  teaserVideoUrl: string; // mp4 preview for hover card
  streamHlsUrl: string;   // Full Cloudflare Stream/HLS URL
  year: number;
  duration: string;
  quality: '4K AI' | '1080p Ultra' | '2K HDR';
  ageRating: string;
  rating: number; // e.g. 9.4
  views: number;
  accessType: AccessType;
  ppvPrice?: number; // e.g. 19000 VND
  category: MovieCategory;
  aiStyle: AIStyle;
  aiTools: string[]; // e.g. ['Runway Gen-3', 'Midjourney v6.1', 'ElevenLabs', 'Udio']
  director: string;
  creatorPromptSnippet?: string;
  isFeatured?: boolean;
  isTrending?: boolean;
  episodes?: Episode[];
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  billingCycle: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  badge?: string;
}
