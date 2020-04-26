import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Film } from '../../models/film';
import { FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { FilmService } from '../../services/film.service';

@Component({
  selector: 'film-filter',
  templateUrl: './film-filter.html',
  outputs: [
    'onFilterFilmChange',
    'onFilterGenreChange',
    'onFilterRecommenderChange',
    'onFilterFormatChange',
    'onFilterPlatformChange'
  ],
  inputs: ['recommenders', 'genres', 'formats', 'platforms']
})
export class FilmFilterComponent implements OnInit {
  //Formulario
  filterFilmForm: FormGroup;
  filterFilm: AbstractControl;
  filterRecommender: AbstractControl;
  filterFormat: AbstractControl;
  filterGenre: AbstractControl;
  filterPlatform: AbstractControl;

  // Titulos
  suggestedFilms: Film[];
  // Recomendadores
  recommenders: string[];
  // Géneros
  genres: string[];
  // Formatos
  formats: string[];
  // Plataforma
  platforms: string[];

  onFilterFilmChange: EventEmitter<Film> = new EventEmitter();
  onFilterRecommenderChange: EventEmitter<string> = new EventEmitter();
  onFilterGenreChange: EventEmitter<string> = new EventEmitter();
  onFilterFormatChange: EventEmitter<string> = new EventEmitter();
  onFilterPlatformChange: EventEmitter<string> = new EventEmitter();

  constructor(private filmService: FilmService, private fb: FormBuilder) {}

  ngOnInit() {
    this.buildFilterFilmForm();
  }

  private emit(selection) {
    this.filterFilm.value != null
      ? this.onFilterFilmChange.emit(selection)
      : null;
    this.filterGenre.value ? this.onFilterGenreChange.emit(selection) : null;
    this.filterRecommender.value
      ? this.onFilterRecommenderChange.emit(selection)
      : null;
    this.filterFormat.value ? this.onFilterFormatChange.emit(selection) : null;
    this.filterPlatform.value ? this.onFilterPlatformChange.emit(selection) : null;
  }

  searchFilms(event) {
    this.filmService.getData().subscribe(suggestedFilms => {
      this.suggestedFilms = suggestedFilms.filter(suggestedFilm =>
        suggestedFilm.titulo
          .toLowerCase()
          .split(' ')
          .includes(event.query.toLowerCase())
      );
    });
  }

  onSelectFilms(event) {
    this.emit(event);
  }

  onUnSelectFilms() {
    this.filterGenre.setValue(null);
    this.filterFormat.setValue(null);
    this.filterRecommender.setValue(null);
    this.filterPlatform.setValue(null);
    this.emit(this.filterFilm.value);
  }

  onSelectFormat() {
    this.filterFilm.setValue(null);
    this.filterRecommender.setValue(null);
    this.filterGenre.setValue(null);
    this.filterPlatform.setValue(null);
    this.emit(this.filterFormat.value);
  }
  onSelectGenre() {
    this.filterFilm.setValue(null);
    this.filterFormat.setValue(null);
    this.filterRecommender.setValue(null);
    this.filterPlatform.setValue(null);
    this.emit(this.filterGenre.value);
  }
  onSelectRecommender() {
    this.filterFilm.setValue(null);
    this.filterGenre.setValue(null);
    this.filterFormat.setValue(null);
    this.filterPlatform.setValue(null);
    this.emit(this.filterRecommender.value);
  }

  onSelectPlatform() {
    this.filterFilm.setValue(null);
    this.filterGenre.setValue(null);
    this.filterFormat.setValue(null);
    this.filterRecommender.setValue(null);
    this.emit(this.filterRecommender.value);
    this.emit(this.filterPlatform.value);
  }

  private buildFilterFilmForm() {
    this.filterFilmForm = this.fb.group({
      filterFilm: [null],
      filterRecommender: [null],
      filterGenre: [null],
      filterFormat: [null],
      filterPlatform: [null]
    });
    this.filterFilm = this.filterFilmForm.controls['filterFilm'];
    this.filterRecommender = this.filterFilmForm.controls['filterRecommender'];
    this.filterGenre = this.filterFilmForm.controls['filterGenre'];
    this.filterFormat = this.filterFilmForm.controls['filterFormat'];
    this.filterPlatform = this.filterFilmForm.controls['filterPlatform'];
  }
}
