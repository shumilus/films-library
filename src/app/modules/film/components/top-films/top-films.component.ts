import { Component, OnDestroy, OnInit } from '@angular/core';
import { IFilm } from '../../../../shared/interfaces/filmData.interfaces';
import { FilmsService } from 'src/app/modules/film/services/films.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-top-films',
  templateUrl: './top-films.component.html',
  styleUrls: ['./top-films.component.scss'],
})

export class TopFilmsComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  public films: IFilm[];

  constructor(private filmService: FilmsService) {
  }

  ngOnInit(): void {
    this.subscription.add(this.filmService.films$
      .subscribe((films: IFilm []) => {
        this.films = films;
      })
    );
    this.filmService.getTopFilms();
    this.films = this.filmService.getFilms();
  }

  public addToFavorite(film: IFilm) {
    this.filmService.addToFavorite(film);
    this.films = this.filmService.setFavoriteFilms(this.films.slice());
  }

  public trackByFn(index, item) {
    return !item ? null : index;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
