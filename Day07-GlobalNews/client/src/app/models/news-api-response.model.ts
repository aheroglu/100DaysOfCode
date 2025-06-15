import { News } from './news.model';

export interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: News[];
}
