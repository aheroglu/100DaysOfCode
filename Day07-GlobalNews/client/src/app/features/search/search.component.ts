import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NewsService } from '../../services/news.service';
import { News } from '../../models/news.model';
import { NewsApiResponse } from '../../models/news-api-response.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
})
export class SearchComponent implements OnInit {
  searchQuery: string = '';
  sortBy: 'popularity' | 'publishedAt' = 'publishedAt';
  searchResults: News[] = [];
  isLoading: boolean = false;
  hasSearched: boolean = false;

  currentPage: number = 1;
  pageSize: number = 12;
  totalResults: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private newsService: NewsService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.searchQuery = params['q'];

      if (this.searchQuery) {
        this.search(true);
      } else {
        this.searchQuery = '';
        this.search(true);
      }
    });
  }

  search(isNewSearch: boolean = true) {
    this.isLoading = true;
    this.hasSearched = true;

    if (isNewSearch) {
      this.searchResults = [];
      this.currentPage = 1;

      this.newsService
        .searchNews(
          localStorage.getItem('countryCode') || 'en',
          this.searchQuery,
          this.sortBy,
          this.currentPage,
          this.pageSize
        )
        .subscribe({
          next: (response: NewsApiResponse) => {
            this.searchResults = response.articles;
            this.totalResults = response.totalResults;
            this.isLoading = false;
          },
          error: (error: Error) => {
            console.error('Error fetching news:', error);
            this.isLoading = false;
          },
        });
    } else {
      this.newsService
        .searchNews(
          localStorage.getItem('countryCode') || 'en',
          this.searchQuery,
          this.sortBy,
          this.currentPage,
          this.pageSize
        )
        .subscribe({
          next: (response: NewsApiResponse) => {
            this.searchResults = [...this.searchResults, ...response.articles];
            this.totalResults = response.totalResults;
            this.isLoading = false;
          },
          error: (error: Error) => {
            console.error('Error fetching news:', error);
            this.isLoading = false;
          },
        });
    }
  }

  loadMoreNews() {
    this.currentPage++;
    this.search(false);
  }
}
