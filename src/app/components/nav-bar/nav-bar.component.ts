import { CommonModule, NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  currentRoute: string = 'contacts';

  _router = inject(Router);

  ngOnInit() {
    this.currentRoute = this._router.url;
    this._router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.changeRoute(event.url);
      }
    });
  }

  onNavOptionClick(currentRoute: string) {
    this._router.navigate([currentRoute]);
  }
  changeRoute(route: string) {
    this.currentRoute = route;
    console.log(this.currentRoute);

  }

}
