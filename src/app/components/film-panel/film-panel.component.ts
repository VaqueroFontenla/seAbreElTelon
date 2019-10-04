import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
		private router: Router,
	) { }

	ngOnInit() {
		this.readMore = false;
	}
	showFilmCard(i) {
		this.router.navigate(['/film', i]);
	}

    onSelectRead(i) {
		this.filteredFilms[i].showShortDescription = !this.filteredFilms[i].showShortDescription;
	
	}

}
