export interface NewsData {
  title: string;
  description: string;
  pubDate: string;
  originallink: string;
  imageUrls: string[];
  articleText: string;
}

export interface NewsState {
  currentNews: NewsData;
}

export interface YoutubeState {
  currentYoutube: YoutubeData;
}

export interface LoadingStatus {
  newsLoading: boolean;
  youtubeLoading: boolean;
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

export interface FormValues {
  id: string;
  password: string;
  confirm: string;
}

export type IdCheck = "default" | "duplication" | "not-duplication";

export interface FormValues {
  id: string;
  password: string;
  confirm: string;
}
