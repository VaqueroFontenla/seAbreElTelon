import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Film } from '../../models/film';
import { FormGroup, AbstractControl, FormBuilder } from "@angular/forms";
import { FilmService } from '../../services/film.service';


@Component({
  selector: 'film-filter',
  templateUrl: './film-filter.html',
  outputs: ['onFilterFilmChange','onFilterGenreChange','onFilterRecommenderChange','onFilterFormatChange'],
  inputs: ['recommenders','genres','formats'],
})

export class FilmFilterComponent implements OnInit {

	//Formulario
	filterFilmForm:FormGroup;
	filterFilm: AbstractControl;
	filterRecommender: AbstractControl;
	filterFormat: AbstractControl;
	filterGenre: AbstractControl;

	//Titulos
	suggestedFilms:Film[];
	//Recomendadores
	recommenders: string[];
	//Géneros
	genres: string[];
	//Formatos
	formats: string[];
	
	onFilterFilmChange: EventEmitter<Film> = new EventEmitter();
	onFilterRecommenderChange: EventEmitter<string> = new EventEmitter();
	onFilterGenreChange: EventEmitter<string> = new EventEmitter();
	onFilterFormatChange: EventEmitter<string> = new EventEmitter();

	constructor(
		private filmService: FilmService,
		private fb:FormBuilder
	){

	}

	ngOnInit() {
		this.buildFilterFilmForm();
	}

	private emit(selection) {
		this.filterFilm.value != null ? this.onFilterFilmChange.emit(selection): null;
		this.filterGenre.value ? this.onFilterGenreChange.emit(selection): null;
		this.filterRecommender.value ? this.onFilterRecommenderChange.emit(selection): null;
		this.filterFormat.value ? this.onFilterFormatChange.emit(selection) : null;
	}
	
	searchFilms(event){
		this.filmService
				.getData()
				.subscribe(suggestedFilms => {
					this.suggestedFilms = suggestedFilms
						.filter(suggestedFilm => suggestedFilm.titulo.toLowerCase().split(" ").includes(event.query.toLowerCase()));
            	})
	}

	onSelectFilms(event) {
		this.emit(event);
	}

	onUnSelectFilms() {
		this.emit(this.filterFilm.value);
	}

	onSelectFormat() {
		this.emit(this.filterFormat.value);
	}
	onSelectGenre() {
		this.emit(this.filterGenre.value);
	}
	onSelectRecommender() {
		this.emit(this.filterRecommender.value);
	}
	
	private buildFilterFilmForm() {
		this.filterFilmForm = this.fb.group({
			'filterFilm':[null],
			'filterRecommender':[null],
			'filterGenre':[null],
			'filterFormat':[null]
		})
		this.filterFilm = this.filterFilmForm.controls['filterFilm'];
		this.filterRecommender = this.filterFilmForm.controls['filterRecommender']
		this.filterGenre = this.filterFilmForm.controls['filterGenre']
		this.filterFormat = this.filterFilmForm.controls['filterFormat']
	}
	
}
