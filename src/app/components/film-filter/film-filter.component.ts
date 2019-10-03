import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Film } from '../../models/film';
import { FormGroup, AbstractControl, FormBuilder } from "@angular/forms";
import { FilmService } from '../../services/film.service';
import { Genre } from 'src/app/models/genre';


@Component({
  selector: 'film-filter',
  templateUrl: './film-filter.html',
  outputs: ['onFilterChange'],
  inputs: ['recommenders','genres', 'formats'],
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
	filteredRecommenders: string[];
	//Géneros
	genres: Genre[][];
	filteredGenres: Genre[];
	//Formatos
	formats: string[];
	filteredFormats: string[];

	
	onFilterChange: EventEmitter<Film> = new EventEmitter();

	constructor(
		private filmService: FilmService,
		private fb:FormBuilder
	){

	}

	ngOnInit() {
		this.buildFilterFilmForm();
		this.filterRecommenders();
		this.filterGenres();	
		this.filteFormats()	
	}

	private emit(event) {
		this.onFilterChange.emit(event);
	}
	

	// Refactoriza removaDuplicates() para el caso de Generos

	private removeDuplicates(valuesArr: string[]): string[] {
		return valuesArr.filter((item, index, array) =>
			array.findIndex(value => 
				JSON.stringify(value) === JSON.stringify(item)) === index	
		)
	}

	private filteFormats(): void {
		this.filteredFormats = this.removeDuplicates(this.formats);
	}

	private filterRecommenders(): void {
		this.filteredRecommenders = this.removeDuplicates(this.recommenders);
	}

	private filterGenres(): void {
		let concatenatedGenres: Genre[] = [];
		concatenatedGenres = this.genres.reduce((a, b) => a.concat(b));
		this.filteredGenres = concatenatedGenres.filter((genre, index, genres)=>
			genres.findIndex(value =>
				JSON.stringify(value) === JSON.stringify(genre)) === index
		)
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

	onSelectFormat(event) {
		this.emit(event);
	}
	onSelectGenre(event) {
		this.emit(event);
	}
	onSelectRecommender(event) {
		this.emit(event);
	}
	
	private buildFilterFilmForm() {
		this.filterFilmForm = this.fb.group({
			'filterFilm':[''],
			'filterRecommender':[''],
			'filterGenre':[''],
			'filterFormat':['']
		})
		this.filterFilm = this.filterFilmForm.controls['filterFilm'];
		this.filterRecommender = this.filterFilmForm.controls['filterRecommender']
		this.filterGenre = this.filterFilmForm.controls['filterGenre']
		this.filterFormat = this.filterFilmForm.controls['filterFormat']
	}
	
}
