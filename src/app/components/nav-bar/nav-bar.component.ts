import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NavBarServiceService } from '../../services/nav-bar-service.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    NgClass,
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  currentRoute: string = 'contacts';

  _router = inject(Router);
  navBarService = inject(NavBarServiceService)

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

  collapseNavBar: boolean = this.navBarService.collapseNavBar;

  // onCollapse() {
  //   this.collapseNavBar = !this.collapseNavBar;
  // }

}
