export interface Article {
  title: string;
  description: string;
  pubDate: string;
  originallink: string;
  imageUrls: string[];
  articleText: string;
}

export interface NewsProps {
  article: Article;
}

export interface IframeProps {
  title: string;
  src: string;
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

export interface LoadingStatus {
  newsLoading: boolean;
  youtubeLoading: boolean;
  instaLoading: boolean;
  xLoading: boolean;
}
