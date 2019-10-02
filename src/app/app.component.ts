import { Component } from '@angular/core';
import { FilmService } from './services/film.service';
import { Film } from './models/film';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-root',
  templateUrl: './app.html'
})
export class AppComponent {
	title = 'seAbreElTelon';
	filteredFilms: Film[];

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
				shortDescription: filteredFilm.descripcion.substring(200,-1),
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
				this.manipulateDescription();
			});
	}

}
