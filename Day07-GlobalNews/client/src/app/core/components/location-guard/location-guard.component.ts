import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationService } from '../../../services/location.service';

@Component({
  selector: 'app-location-guard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      *ngIf="!isLocationGranted"
      class="min-h-screen flex items-center justify-center bg-gray-100"
    >
      <div
        class="max-w-md w-full mx-4 p-8 bg-white rounded-2xl shadow-xl text-center"
      >
        <div class="mb-6">
          <div
            class="w-20 h-20 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center"
          >
            <i class="fa-solid fa-location-dot text-blue-600 text-3xl"></i>
          </div>
          <h2 class="text-2xl font-bold text-gray-800 mb-2">
            Location Permission Required
          </h2>
          <p class="text-gray-600 mb-6">
            To show you the most relevant news, you need to grant location
            permission.
          </p>
          <button
            (click)="requestPermission()"
            class="w-full py-3 px-6 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center space-x-2"
          >
            <i class="fa-solid fa-shield-check"></i>
            <span>Grant Location Permission</span>
          </button>
        </div>
        <p class="text-sm text-gray-500">
          This permission is only used to show you news relevant to your region.
        </p>
      </div>
    </div>
  `,
})
export class LocationGuardComponent implements OnInit {
  isLocationGranted: boolean | null = null;

  constructor(private locationService: LocationService) {}

  ngOnInit() {
    this.locationService.getPermissionStatus().subscribe((status) => {
      this.isLocationGranted = status;
    });
  }

  requestPermission() {
    this.locationService.requestPermission().subscribe();
  }
}
