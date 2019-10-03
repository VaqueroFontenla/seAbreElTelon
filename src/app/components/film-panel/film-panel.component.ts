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
		this.filteredFilms[i].showShortDescription = !this.filteredFilms[i].showShortDescription;
	
	}

}
