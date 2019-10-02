import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AutoCompleteModule } from 'primeng/autocomplete';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { FilmCardComponent } from './components/film-card/film-card.component';
import { FilmFilterComponent } from './components/film-filter/film-filter.component';
import { FilmPanelComponent } from './components/film-panel/film-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    FilmCardComponent,
    FilmFilterComponent,
    FilmPanelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
