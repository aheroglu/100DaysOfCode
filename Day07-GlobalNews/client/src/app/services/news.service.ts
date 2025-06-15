import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsApiResponse } from '../models/news-api-response.model';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private readonly API_KEY = ''; // YOUR API KEY HERE
  private readonly BASE_URL = 'https://newsapi.org/v2';

  constructor(private http: HttpClient) {}

  searchNews(
    countryCode: string,
    q: string,
    sortBy: 'popularity' | 'publishedAt' = 'publishedAt',
    page: number,
    pageSize: number
  ): Observable<NewsApiResponse> {
    const today = new Date();
    const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    const domains = [
      'bbc.com',
      'reuters.com',
      'bloomberg.com',
      'theguardian.com',
      'nytimes.com',
      'cnn.com',
      'apnews.com',
    ].join(',');

    const params = new HttpParams()
      .set('apiKey', this.API_KEY)
      .set('q', q)
      .set('language', countryCode)
      .set('sortBy', sortBy)
      .set('from', lastWeek.toISOString().split('T')[0])
      .set('to', today.toISOString().split('T')[0])
      .set('domains', domains)
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<NewsApiResponse>(`${this.BASE_URL}/everything`, {
      params,
    });
  }

  getPopularNews(
    languageCode: string,
    q: string,
    page: number,
    pageSize: number
  ): Observable<NewsApiResponse> {
    const today = new Date();
    const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    const domains = [
      'bbc.com',
      'reuters.com',
      'bloomberg.com',
      'theguardian.com',
      'nytimes.com',
      'cnn.com',
      'apnews.com',
    ].join(',');

    const params = new HttpParams()
      .set('apiKey', this.API_KEY)
      .set('q', q)
      .set('language', languageCode)
      .set('sortBy', 'popularity')
      .set('from', lastWeek.toISOString().split('T')[0])
      .set('to', today.toISOString().split('T')[0])
      .set('domains', domains)
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<NewsApiResponse>(`${this.BASE_URL}/everything`, {
      params,
    });
  }
}
