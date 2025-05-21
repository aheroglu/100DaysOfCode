import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  city: string = 'Istanbul';
  weatherData: any;
  forecastData: any[] = [];
  errorMessage: string = '';
  showError: boolean = false;
  apiKey = ''; // YOUR API KEY HERE
  apiUrl: string = 'https://api.openweathermap.org/data/2.5';

  constructor(private http: HttpClient) {
    if (!this.apiKey) {
      this.errorMessage = 'API key is not provided.';
      this.showError = true;
    } else {
      this.getLocationWeather();
    }
  }

  getWeather() {
    this.weatherData = null;
    this.errorMessage = '';
    this.showError = false;

    this.http
      .get(
        `${this.apiUrl}/weather?q=${this.city}&appid=${this.apiKey}&units=metric`
      )
      .subscribe({
        next: (data) => {
          this.weatherData = data;
        },
        error: (err) => {
          if (err.error && err.error.message) {
            this.errorMessage = err.error.message;
            this.showError = true;
          } else {
            this.errorMessage = 'Bir hata oluştu. Lütfen tekrar deneyin.';
            this.showError = true;
          }

          setTimeout(() => {
            this.showError = false;
          }, 3500);
          console.log(err);
        },
      });
  }

  getForecast() {
    this.forecastData = [];
    this.http
      .get(
        `${this.apiUrl}/forecast?q=${this.city}&appid=${this.apiKey}&units=metric`
      )
      .subscribe({
        next: (data: any) => {
          const forecastList = data.list;
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const dailyForecasts: any[] = [];
          const addedDays = new Set<string>();
          forecastList.forEach((forecast: any) => {
            const forecastDate = new Date(forecast.dt * 1000);
            forecastDate.setHours(0, 0, 0, 0);
            const dateStr = forecastDate.toISOString().split('T')[0];
            if (!addedDays.has(dateStr)) {
              const forecastHour = new Date(forecast.dt * 1000).getHours();
              if (forecastHour >= 12 && forecastHour <= 15) {
                dailyForecasts.push(forecast);
                addedDays.add(dateStr);
                if (dailyForecasts.length >= 5) {
                  return;
                }
              }
            }
          });
          dailyForecasts.sort((a, b) => a.dt - b.dt);
          this.forecastData = dailyForecasts;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  formatDate(timestamp: number): string {
    return new Date(timestamp * 1000).toLocaleDateString(
      this.weatherData.sys.country,
      {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }
    );
  }

  formatForecastDate(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString(this.weatherData.sys.country, {
      weekday: 'long',
    });
  }

  getLocationWeather() {
    if (navigator.geolocation) {
      this.errorMessage = 'Getting location...';
      this.showError = true;

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          this.showError = false;

          this.getWeatherByCoords(lat, lon);
        },
        (error) => {
          this.errorMessage =
            'Location permission denied or location unavailable.';
          this.showError = true;

          setTimeout(() => {
            this.showError = false;
          }, 3500);

          console.log('Geolocation error:', error);
        }
      );
    } else {
      this.errorMessage = 'Your browser does not support geolocation.';
      this.showError = true;

      setTimeout(() => {
        this.showError = false;
      }, 3500);
    }
  }

  getWeatherByCoords(lat: number, lon: number) {
    this.weatherData = null;
    this.forecastData = [];

    this.http
      .get(
        `${this.apiUrl}/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`
      )
      .subscribe({
        next: (data: any) => {
          this.weatherData = data;
          this.city = data.name;
        },
        error: (err) => {
          this.errorMessage = 'Weather data could not be retrieved.';
          this.showError = true;

          setTimeout(() => {
            this.showError = false;
          }, 3500);

          console.log(err);
        },
      });

    this.http
      .get(
        `${this.apiUrl}/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`
      )
      .subscribe({
        next: (data: any) => {
          const forecastList = data.list;
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const dailyForecasts: any[] = [];
          const addedDays = new Set<string>();

          forecastList.forEach((forecast: any) => {
            const forecastDate = new Date(forecast.dt * 1000);
            forecastDate.setHours(0, 0, 0, 0);
            const dateStr = forecastDate.toISOString().split('T')[0];

            if (!addedDays.has(dateStr)) {
              const forecastHour = new Date(forecast.dt * 1000).getHours();

              if (forecastHour >= 12 && forecastHour <= 15) {
                dailyForecasts.push(forecast);
                addedDays.add(dateStr);

                if (dailyForecasts.length >= 5) {
                  return;
                }
              }
            }
          });

          dailyForecasts.sort((a, b) => a.dt - b.dt);
          this.forecastData = dailyForecasts;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
