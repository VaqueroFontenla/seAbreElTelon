import { Component, OnInit } from '@angular/core';
import { FilmService } from '../../services/film.service';
import { Film } from '../../models/film';

@Component({
  selector: 'film-panel',
  templateUrl: './film-panel.html',
  inputs: ['filteredFilms']
})
export class FilmPanelComponent implements OnInit {
	filteredFilms: Film[];
	readMore: boolean;

	constructor(
	) { }

	ngOnInit() {
		this.readMore = false;
	}

    onSelectRead(i) {
		this.readMore = !this.readMore;
		this.readMore 
			? this.filteredFilms[i].shortDescription = this.filteredFilms[i].descripcion
			: this.filteredFilms[i].descripcion = this.filteredFilms[i].shortDescription
	}

}
