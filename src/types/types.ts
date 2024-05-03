export interface Article {
  title: string;
  description: string;
  pubDate: string;
  originallink: string;
  imageUrls: string[];
}

export interface NewsCardProps {
  article: Article;
  index: number;
}
