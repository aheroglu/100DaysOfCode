import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { News } from '../../models/news.model';
import { NewsApiResponse } from '../../models/news-api-response.model';
import { NewsService } from '../../services/news.service';
import { LocationService } from '../../services/location.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  news: News[] = [];
  topNews: News[] = [];
  loading = true;
  error: string | null = null;

  currentPage: number = 1;
  pageSize: number = 12;
  totalResults: number = 0;

  private subscriptions = new Subscription();

  constructor(
    private newsService: NewsService,
    private locationService: LocationService
  ) {}

  ngOnInit() {
    this.loadNews();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  loadNews() {
    this.loading = true;
    this.error = null;

    const locationSub = this.locationService.getLocation().subscribe({
      next: (location) => {
        if (location) {
          const popularNewsSub = this.newsService
            .getPopularNews(location, '', this.currentPage, this.pageSize)
            .subscribe({
              next: (response: NewsApiResponse) => {
                this.news = [...this.news, ...response.articles.slice(5)];
                this.topNews = response.articles.slice(0, 5);
                this.totalResults = response.totalResults;
                this.loading = false;
              },
              error: (error: Error) => {
                console.error('Error when loading news:', error);
                this.error = 'Error when loading news.';
                this.loading = false;
              },
            });

          this.subscriptions.add(popularNewsSub);
        }
      },
      error: (error: Error) => {
        console.error('Error when loading location:', error);
        this.error = 'Location could not be loaded.';
        this.loading = false;
      },
    });

    this.subscriptions.add(locationSub);
  }

  loadMoreNews() {
    this.currentPage++;
    this.loadNews();
  }
}
