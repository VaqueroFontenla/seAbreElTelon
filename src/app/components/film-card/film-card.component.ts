import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { Film } from "../../models/film";
import { FilmService } from "src/app/services/film.service";

@Component({
  selector: "film-card",
  templateUrl: "./film-card.html",
})
export class FilmCardComponent implements OnInit {
  film: Film;

  constructor(
    private activatedRoute: ActivatedRoute,
    private filmService: FilmService
  ) {}

  ngOnInit() {
    this.loadFilm();
  }

  private loadFilm() {
    this.activatedRoute.params.subscribe((params) => {
      this.filmService.getData().subscribe((films) => {
        this.film = films.find((film: Film) => `${film.id}` === params["i"]);
      });
    });
  }
}
