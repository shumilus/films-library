import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { IFilm } from '../../../../shared/interfaces/filmData.interfaces';
import {FilmsService} from "../../services/films.service";

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class FilmComponent implements OnInit {
  @Input() film: IFilm;
  @Input() favorite: boolean;
  @Output() buttonClickEmit = new EventEmitter<IFilm>();
  public isOpenModal: boolean;
  public trailerLink: string;

  constructor(private filmService: FilmsService) {
  }

  ngOnInit(): void {
  }

  public handelButtonClick(film: IFilm) {
    this.buttonClickEmit.emit(film);
  }

  public playVideo() {
    this.trailerLink = this.filmService.getTrailerLink();
    this.isOpenModal = !this.isOpenModal;
  }

}
