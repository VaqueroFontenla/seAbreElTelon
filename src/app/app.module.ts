import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppComponent } from './app.component';
import { FilmCardComponent } from './components/film-card/film-card.component';
import { FilmFilterComponent } from './components/film-filter/film-filter.component';
import { FilmPanelComponent } from './components/film-panel/film-panel.component';
import { FilmService } from './services/film.service';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { FilmContainerComponent } from './components/film-container/film-container.component';

@NgModule({
  declarations: [
    AppComponent,
    FilmCardComponent,
    FilmFilterComponent,
    FilmPanelComponent,
    FilmContainerComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    BrowserAnimationsModule,
    AngularFontAwesomeModule,
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ],
  providers: [
    FilmService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
