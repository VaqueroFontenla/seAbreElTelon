import { Component } from '@angular/core';
import { FilmService } from './services/film.service';
import { Film } from './models/film';
import { Genre } from './models/genre';

@Component({
  selector: 'app-root',
  templateUrl: './app.html'
})
export class AppComponent {
	title = 'seAbreElTelon';
	filteredFilms: Film[];
	recommenders: string[];
	genres: Genre[][];
	formats: string[];

	constructor(
		private filmService: FilmService,
		
	) { }

	ngOnInit() {
		this.init();
	}                     

	onFilterChange(event: Film[]) {
      this.filteredFilms = event;
	
	}


	private manipulateDescription(): void {
		let filmWithShortDescription: Film[] = [];
		filmWithShortDescription = this.filteredFilms.map(filteredFilm => {
			return {
				shortDescription: filteredFilm.descripcion.substring(150,-1),
				showShortDescription: true,
				...filteredFilm
			}
		})
		this.filteredFilms = filmWithShortDescription;
	}

	private init(): void {
		this.filmService
			.getData()
			.subscribe(filteredFilms => {
				this.filteredFilms = filteredFilms;
				this.recommenders = this.filteredFilms.map(filteredFilm => filteredFilm.recomendador);
				this.genres = this.filteredFilms.map(filteredFilm => filteredFilm.generos);
				this.formats = this.filteredFilms.map(filteredFilm => filteredFilm.formato);
				this.manipulateDescription();
			});
	}

}
