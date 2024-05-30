export interface NewsData {
  title?: string;
  description?: string;
  pubDate?: string;
  originallink?: string;
  imageUrls?: string[];
  articleText?: string;
}

export interface NewsProps {
  article: NewsData;
}

export interface NewsState {
  currentNewsIndex: number;
  currentNews: NewsData;
  previewToggle: boolean;
}

export interface LoadingStatus {
  newsLoading: boolean;
  youtubeLoading: boolean;
  instaLoading: boolean;
  xLoading: boolean;
}

export interface userInterface {
  darkLightToggle: string;
  menuIndex: number;
  searchModalTrigger: boolean;
  loadingStatus: LoadingStatus;
}

export interface ObjectElement {
  [key: string]: string | number;
}

export interface KeywordsType {
  [key: string]: ObjectElement[];
}

export interface Indicator {
  indicator: string;
}

export interface YoutubeData {
  kind?: string;
  etag?: string;
  id?: {
    kind?: string;
    videoId?: string;
  };
  snippet?: {
    publishedAt?: string;
    channelId?: string;
    title?: string;
    description?: string;
    thumbnails?: {
      default?: {
        url?: string;
        width?: number;
        height?: number;
      };
      medium?: {
        url?: string;
        width?: number;
        height?: number;
      };
      high?: {
        url?: string;
        width?: number;
        height?: number;
      };
    };
    channelTitle?: string;
    liveBroadcastContent?: string;
    publishTime?: string;
  };
}

export interface Data {
  realTimeSearchTerms: KeywordsType;
  newsData: NewsData[];
  youtubeData: Partial<YoutubeData>[];
}
