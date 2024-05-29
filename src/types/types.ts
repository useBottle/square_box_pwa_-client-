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

export interface objectElement {
  [key: string]: string | number;
}

export interface KeywordsType {
  [key: string]: objectElement[];
}

export interface Indicator {
  indicator: string;
}
