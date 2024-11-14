import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavBarServiceService {
  collapseNavBar = false;

  constructor() { }

  public toggleNavBar() {
    this.collapseNavBar = !this.collapseNavBar
    console.log('collapseNavBar: ' + this.collapseNavBar);

  }
}
