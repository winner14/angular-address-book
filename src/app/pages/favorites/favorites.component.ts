import { Component } from '@angular/core';
import { TitleBarComponent } from "../../components/title-bar/title-bar.component";

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [TitleBarComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent {

}
