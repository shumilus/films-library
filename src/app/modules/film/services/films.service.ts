import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IFilm, IFilmData } from '../../../shared/interfaces/filmData.interfaces';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../shared/services/api.service';
import { map } from 'rxjs/operators';

const TOKEN = '802f1380-ed1b-4132-a0ef-fe1015651d38';
const trailerLinkExample = 'https://www.youtube.com/embed/YihPA42fdQ8';

@Injectable()
export class FilmsService {
  public films$ = new BehaviorSubject<IFilm[]>(null);

  decades = ['1920s', '1930s', '1940s', '1950s', '1960s', '1970s', '1980s', '1990s', '2000s', '2010s'];

  constructor(private apiService: ApiService,
              private toaster: ToastrService) {
  }

  public getFilms() {
    return this.films$.value ? this.films$.value.slice() : null;
  }

  public getTopFilms(from: number = 1, to: number = 20) {
    if (this.films$.value) {
      return;
    }
    this.apiService.get(`http://localhost:4200/imdb/top?start=${from}&end=${to}&token=${TOKEN}&format=json&data=1`)
      .pipe(
        map((res: IFilmData) => res.data.movies)
      )
      .subscribe((films: IFilm []) => {
        films = this.setFavoriteFilms(films);
        this.films$.next(films);
      });
  }

  public getFilmsForDecades(from: number = 1, to: number = 250) {
    return this.apiService.get(`http://localhost:4200/imdb/top?start=${from}&end=${to}&token=${TOKEN}&format=json&data=1`);
  }

  // TODO: It is should be REST API request
  public getTrailerLink(): string {
    return trailerLinkExample;
  }

  public addToFavorite(film: IFilm) {
    let favoriteFilms = JSON.parse(localStorage.getItem('favoriteFilms'));
    favoriteFilms = favoriteFilms ? [...favoriteFilms, film] : [film];
    favoriteFilms = JSON.stringify(favoriteFilms);
    localStorage.setItem('favoriteFilms', favoriteFilms);
    this.toaster.success('The movie was successfully added to favorite!');
  }

  public setFavoriteFilms(films: IFilm []) {
    const favoriteFilms = JSON.parse(localStorage.getItem('favoriteFilms'));
    if (!favoriteFilms) {
      return films;
    }
    return films.map((film: IFilm) => {
      return favoriteFilms.some((f) => film.idIMDB === f.idIMDB) ? film = {...film, favorite: true} : {...film, favorite: false};
    });
  }

  public deleteFilm(films: IFilm[]) {
    localStorage.setItem('favoriteFilms', JSON.stringify(films));
    const movies = this.setFavoriteFilms(this.films$.value);
    this.films$.next(movies);
    this.toaster.success('The movie was successfully deleted!');
  }

  public createBubbleChartData(allFilms: IFilm[]) {
    const data = {children: []};

    this.decades.forEach((decade: string) => {
      data.children.push({
        name: decade,
        films: {children: []},
        size: 0
      });
    });

    if (!allFilms) {
      return;
    }

    allFilms.forEach((film: IFilm) => {
      const year = Number(film.year);

      this.decades.forEach((decade: string, i) => {
        const from = decade.slice(0, 4);
        const till = this.decades[i + 1] ? this.decades[i + 1].slice(0, 4) : '2020';
        if (year >= +from && year < +till) {
          data.children[i].films.children.push({
            name: film.title,
            size: 1
          });
          data.children[i] = {...data.children[i], size: data.children[i].films.children.length};
        }
      });
    });
    return data;
  }
}
