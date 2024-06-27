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
  signUpLoading: boolean;
  bookMarkLoading: boolean;
}

export interface userInterface {
  darkLightToggle: string;
  menuIndex: number;
  searchModalTrigger: boolean;
  bookMarkModalTrigger: boolean;
  bookMarkLimitModalTrigger: boolean;
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

export interface Verification {
  signUpCheck: boolean;
  userCheck: boolean;
  username: string;
}

export interface TokenInfo {
  username: string;
}

export interface markedNews {
  category: string;
  username: string;
  title: string;
  pubDate: string;
  originallink: string;
  imageUrl: string;
  articleText: string;
  _id: string;
}

export interface markedYoutube {
  category: string;
  username: string;
  videoId: string;
  thumbnail: string;
  title: string;
  channelHandle: string;
  channelThumbnail: string;
  channelTitle: string;
  _id: string;
}

export interface BookMark {
  selector: string;
  markedNews: markedNews[];
  markedYoutube: markedYoutube[];
  mouseOnNews: markedNews;
  mouseOnYoutube: markedYoutube;
  newsId: string;
  youtubeId: string;
  newsDataExistence: boolean;
  youtubeDataExistence: boolean;
}
