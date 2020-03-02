import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { IFilm } from '../../../../shared/interfaces/filmData.interfaces';
import { FilmsService } from '../../services/films.service';

@Component({
  selector: 'app-favorite-films',
  templateUrl: './favorite-films.component.html',
  styleUrls: ['./favorite-films.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class FavoriteFilmsComponent implements OnInit {
  public favoriteFilms: IFilm [];

  constructor(private filmService: FilmsService) {
  }

  ngOnInit(): void {
    this.getFavoriteFilms();
  }

  private getFavoriteFilms() {
    try {
      this.favoriteFilms = JSON.parse(localStorage.getItem('favoriteFilms'));
    } catch (e) {
      this.favoriteFilms = [];
    }
  }

  public deleteFilm(index: number) {
    this.favoriteFilms.splice(index, 1);
    this.filmService.deleteFilm(this.favoriteFilms);

  }

  public trackByFn(index, item) {
    return !item ? null : index;
  }
}
