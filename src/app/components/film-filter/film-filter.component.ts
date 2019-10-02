import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Film } from '../../models/film';
import { FormGroup, AbstractControl, FormBuilder } from "@angular/forms";
import { FilmService } from '../../services/film.service';


@Component({
  selector: 'film-filter',
  templateUrl: './film-filter.html',
  outputs: ['onFilterChange'],
})

export class FilmFilterComponent implements OnInit {
	suggestedFilms:Film[];
	filterFilmForm:FormGroup;
	filterFilm :AbstractControl;
	onFilterChange: EventEmitter<Film> = new EventEmitter();

	constructor(
		private filmService: FilmService,
		private fb:FormBuilder
	){
	
	}

	ngOnInit() {
		this.buildFilterFilmForm();
		
		
	}
	private emit(selection) {
		this.onFilterChange.emit(selection);
	}

	searchFilms(event){
		this.filmService
				.getData()
				.subscribe(suggestedFilms => {
					this.suggestedFilms = suggestedFilms
						.filter(suggestedFilm => suggestedFilm.titulo.toLowerCase().split(" ").includes(event.query.toLowerCase()));
            	})
	}

	onSelectFilms(selectedFilm) {
		this.emit(selectedFilm);
	}

	
	private buildFilterFilmForm() {
		this.filterFilmForm = this.fb.group({
			'filterFilm':['']
		})
		this.filterFilm = this.filterFilmForm.controls['filterFilm']
	}
	
}
