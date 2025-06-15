export interface SearchParams {
  q?: string;
  language?: string;
  sortBy?: 'popularity' | 'publishedAt';
  from?: string;
  to?: string;
  pageSize?: number;
  page?: number;
}
