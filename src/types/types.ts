export interface Article {
  title: string;
  description: string;
  pubDate: string;
  originallink: string;
  imageUrls: string[];
}

export interface NewsProps {
  article: Article;
}
