import { RouterModule, Routes } from '@angular/router';
import { FilmCardComponent } from './components/film-card/film-card.component'
import { AppComponent } from './app.component';


const ROUTES: Routes = [
    { path: 'app', component: AppComponent },
    { path: 'film/:i', component: FilmCardComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'app' }
];

export const APP_ROUTING = RouterModule.forRoot(ROUTES, {useHash: false});
