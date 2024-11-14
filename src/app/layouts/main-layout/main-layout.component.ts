import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from "../../components/nav-bar/nav-bar.component";
import { TitleBarComponent } from "../../components/title-bar/title-bar.component";
import { NavBarServiceService } from '../../services/nav-bar-service.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    NavBarComponent,
    TitleBarComponent,
    NgClass,
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {
  navBarService = inject(NavBarServiceService);
}
