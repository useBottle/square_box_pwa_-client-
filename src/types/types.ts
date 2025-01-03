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
  currentYoutube: YouTubeVideo;
}

export interface LoadingStatus {
  newsLoading: boolean;
  youtubeLoading: boolean;
  signUpLoading: boolean;
  bookMarkLoading: boolean;
}

export interface ModalTrigger {
  searchModalTrigger: boolean;
  searchBarTrigger: boolean;
  bookMarkModalTrigger: boolean;
  bookMarkLimitModalTrigger: boolean;
  logOutModalTrigger: boolean;
}

export interface userInterface {
  darkLightToggle: string;
  menuIndex: number;
  navSwitch: boolean;
  modalTrigger: ModalTrigger;
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

export interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}

export interface Snippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: {
    default: {
      url: string;
      width: number;
      height: number;
    };
    medium: {
      url: string;
      width: number;
      height: number;
    };
    high: {
      url: string;
      width: number;
      height: number;
    };
    standard: {
      url: string;
      width: number;
      height: number;
    };
    maxres: {
      url: string;
      width: number;
      height: number;
    };
  };
  channelTitle: string;
  tags: string[];
  categoryId: string;
  liveBroadcastContent: string;
  localized: {
    title: string;
    description: string;
  };
  defaultAudioLanguage: string;
}

export interface YouTubeVideo {
  kind: string;
  etag: string;
  id: {
    videoId: string;
    kind: string;
  };
  snippet: Snippet;
}

export interface youtubeApiResult {
  _id?: string;
  kind: string;
  etag: string;
  items: YouTubeVideo[];
  nextPageToken: string;
  pageInfo: PageInfo;
}

export interface Data {
  realTimeSearchTerms: KeywordsType;
  newsData: NewsData[];
  youtubeData: YouTubeVideo[];
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
  bookMarkDataExistence: boolean;
}
