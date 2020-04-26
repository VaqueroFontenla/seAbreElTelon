import { Component, OnInit } from '@angular/core';
import { FilmService } from '../../services/film.service';
import { Film } from '../../models/film';

@Component({
  selector: 'film-container',
  templateUrl: './film-container.html'
})
export class FilmContainerComponent implements OnInit {
  // Titulos peliculas
  initialFilms: Film[];
  filteredFilms: Film[];
  // Recomendadores
  recommenders: string[];
  filteredRecommenders: string[];
  // Géneros
  genres: string[][];
  filteredGenres: string[];
  // Formatos
  formats: string[];
  filteredFormats: string[];
  // Plataformas
  platforms: string[];
  filteredPlatforms: string[];

  constructor(private filmService: FilmService) {}

  ngOnInit() {
    this.init();
  }
  onFilterFilmChange(film: Film): void {
    this.filteredFilms = this.initialFilms;
    this.manipulateDescription();
    if (typeof film === 'string') {
      return;
    } else {
      let filteredFilmArr: Film[] = [];
      filteredFilmArr = this.filteredFilms.filter(
        filteredFilm => filteredFilm.titulo === film.titulo
      );
      this.filteredFilms = filteredFilmArr;
    }
  }

  onFilterRecommenderChange(recommender: string): void {
    this.filteredFilms = this.initialFilms;
    this.manipulateDescription();
    if (recommender === 'Todas') {
      return;
    } else {
      let filteredRecommenderArr: Film[] = [];
      filteredRecommenderArr = this.filteredFilms.filter(
        filteredFilm => filteredFilm.recomendador === recommender
      );
      this.filteredFilms = filteredRecommenderArr;
    }
  }

  onFilterGenreChange(genre: string): void {
    this.filteredFilms = this.initialFilms;
    this.manipulateDescription();
    if (genre === 'Todos') {
      return;
    } else {
      let filteredGenrerArr: Film[] = [];
      filteredGenrerArr = this.filteredFilms.filter(filteredFilm =>
        filteredFilm.generos.includes(genre)
      );
      this.filteredFilms = filteredGenrerArr;
    }
  }

  onFilterFormatChange(format: string): void {
    this.filteredFilms = this.initialFilms;
    this.manipulateDescription();
    if (format === 'Todos') {
      return;
    } else {
      let filteredFormatrArr: Film[] = [];
      filteredFormatrArr = this.filteredFilms.filter(
        filteredFilm => filteredFilm.formato === format
      );
      this.filteredFilms = filteredFormatrArr;
    }
  }


  onFilterPlatformChange(platform: string): void {
    this.filteredFilms = this.initialFilms;
    this.manipulateDescription();
    if (platform === 'Todas') {
      return;
    } else {
      let filteredPlatformArr: Film[] = [];
      filteredPlatformArr = this.filteredFilms.filter(
        filteredFilm => filteredFilm.plataforma === platform
      );
      this.filteredFilms = filteredPlatformArr;
    }
  }

  private removeDuplicates(valuesArr: string[]): string[] {
    return valuesArr.filter(
      (item, index, array) =>
        array.findIndex(
          value => JSON.stringify(value) === JSON.stringify(item)
        ) === index
    );
  }

  private filterPlatforms(): void {
    this.filteredPlatforms = this.removeDuplicates(this.platforms);
  }


  private filterFormats(): void {
    this.filteredFormats = this.removeDuplicates(this.formats);
  }

  private filterRecommenders(): void {
    this.filteredRecommenders = this.removeDuplicates(this.recommenders);
  }

  private filterGenres(): void {
    let concatenatedGenres: string[] = [];
    concatenatedGenres = this.genres.reduce((a, b) => a.concat(b));
    this.filteredGenres = concatenatedGenres.filter(
      (genre, index, genres) =>
        genres.findIndex(
          value => JSON.stringify(value) === JSON.stringify(genre)
        ) === index
    );
  }

  private manipulateDescription(): void {
    let filmWithShortDescription: Film[] = [];
    filmWithShortDescription = this.filteredFilms.map((filteredFilm, index) => {
      return {
        shortDescription: filteredFilm.descripcion.substring(100, -1),
        showShortDescription: true,
        id: index,
        ...filteredFilm
      };
    });
    this.filteredFilms = filmWithShortDescription;
  }

  private init(): void {
    this.filmService.getData().subscribe(initialFilms => {
      this.initialFilms = initialFilms;
      this.filteredFilms = this.initialFilms;
      this.recommenders = this.filteredFilms.map(
        filteredFilm => filteredFilm.recomendador
      );
      this.filterRecommenders();
      this.genres = this.filteredFilms.map(
        filteredFilm => filteredFilm.generos.split(',')
      );
      this.filterGenres();
      this.formats = this.filteredFilms.map(
        filteredFilm => filteredFilm.formato
      );
      this.filterFormats();
      this.platforms = this.filteredFilms.map(
        filteredFilm => filteredFilm.plataforma
      );
      this.filterPlatforms();
      this.manipulateDescription();
    });
  }
}
