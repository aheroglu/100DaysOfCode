import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private locationPermissionStatus = new BehaviorSubject<boolean | null>(null);
  private userLocation = new BehaviorSubject<string | null>(null);

  constructor() {
    const savedLocation = localStorage.getItem('countryCode');
    if (savedLocation) {
      this.userLocation.next(savedLocation);
      this.locationPermissionStatus.next(true);
    } else {
      this.checkPermissionStatus();
    }
  }

  private async checkPermissionStatus() {
    try {
      const permission = await navigator.permissions.query({
        name: 'geolocation',
      });
      this.locationPermissionStatus.next(permission.state === 'granted');

      if (permission.state === 'granted') {
        this.getUserLocation();
      }
      permission.addEventListener('change', () => {
        this.locationPermissionStatus.next(permission.state === 'granted');
        if (permission.state === 'granted') {
          this.getUserLocation();
        }
      });
    } catch (error) {
      console.error('Location permission check failed:', error);
      this.locationPermissionStatus.next(false);
    }
  }

  requestPermission(): Observable<boolean> {
    return from(
      new Promise<boolean>((resolve) => {
        navigator.geolocation.getCurrentPosition(
          () => {
            this.locationPermissionStatus.next(true);
            this.getUserLocation();
            resolve(true);
          },
          () => {
            this.locationPermissionStatus.next(false);
            resolve(false);
          }
        );
      })
    );
  }

  private async getUserLocation() {
    try {
      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        }
      );

      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`
      );

      const data = await response.json();

      const countryCode = data.address.country_code;

      localStorage.setItem('countryCode', countryCode);
      this.userLocation.next(countryCode);
    } catch (error) {
      console.error('Location error:', error);
      this.userLocation.next(null);
      localStorage.removeItem('countryCode');
    }
  }

  getPermissionStatus(): Observable<boolean | null> {
    return this.locationPermissionStatus.asObservable();
  }

  getLocation(): Observable<string | null> {
    return this.userLocation.asObservable();
  }
}
