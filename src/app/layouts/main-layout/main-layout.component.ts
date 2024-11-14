import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from "../../components/nav-bar/nav-bar.component";
import { TitleBarComponent } from "../../components/title-bar/title-bar.component";

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    NavBarComponent,
    TitleBarComponent,
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {
  title: string = 'Contacts';

  // create public method to change title in the nav bar component file
  changeTitle(title: string) {
    this.title = title;
  }
}
