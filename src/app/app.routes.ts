import { Routes } from '@angular/router';
import { FilmCardComponent } from './components/film-card/film-card.component';
import { FilmContainerComponent } from './components/film-container/film-container.component';

export const routes: Routes = [
    { path: 'home', component: FilmContainerComponent },
    { path: 'film/:i', component: FilmCardComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

