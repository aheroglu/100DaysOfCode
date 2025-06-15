import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LocationService } from '../../../services/location.service';
import { LocationGuardComponent } from '../../components/location-guard/location-guard.component';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    RouterLink,
    LocationGuardComponent,
    FormsModule,
  ],
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent {
  isLocationGranted$: Observable<boolean | null>;
  searchQuery: string = '';

  constructor(
    private locationService: LocationService,
    private router: Router
  ) {
    this.isLocationGranted$ = this.locationService.getPermissionStatus();
  }

  onSearch(event: any) {
    this.searchQuery = event.target.value;
    this.router.navigate(['/search'], {
      queryParams: { q: this.searchQuery },
    });
    this.searchQuery = '';
  }
}
