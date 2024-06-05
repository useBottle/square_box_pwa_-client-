export interface NewsData {
  title: string;
  description: string;
  pubDate: string;
  originallink: string;
  imageUrls: string[];
  articleText: string;
}

export interface videoProps {
  video: YoutubeData;
}

export interface NewsState {
  currentNews: NewsData;
  previewToggle: boolean;
}

export interface YoutubeState {
  currentYoutubeIndex: number;
  currentYoutube: YoutubeData;
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
  kind: string;
  etag: string;
  id: {
    kind: string;
    videoId: string;
  };
  snippet: {
    channelId: string;
    title: string;
    thumbnails: [
      {
        url: string;
        width: number;
        height: number;
      },
    ];
    channelTitle: string;
    channelHandle: string;
    timestamp: string;
    duration: string;
    views: string;
    badges: string[];
    channelApproval: null | unknown;
    channelThumbnails: [{ url: string; width: number; height: number }];
    detailedMetadataSnippet: [
      {
        test: string;
      },
    ];
    chapters: [];
  };
}

export interface Data {
  realTimeSearchTerms: KeywordsType;
  newsData: NewsData[];
  youtubeData: YoutubeData[];
}
