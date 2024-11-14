import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';

export const routes: Routes = [
    {
        path: '', component: MainLayoutComponent, children: [
            { path: 'contacts', component: ContactsComponent },
            { path: 'favorites', component: FavoritesComponent },
            { path: '', redirectTo: 'contacts', pathMatch: 'full' }
        ]
    }
];
