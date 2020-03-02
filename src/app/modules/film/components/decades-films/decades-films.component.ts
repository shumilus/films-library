import { Component, OnInit } from '@angular/core';
import { FilmsService } from '../../services/films.service';
import { IFilmData } from '../../../../shared/interfaces/filmData.interfaces';

@Component({
  selector: 'app-decades-films',
  templateUrl: './decades-films.component.html',
  styleUrls: ['./decades-films.component.scss']
})

export class DecadesFilmsComponent implements OnInit {
  public bubbleChartData: any;
  public toggleButton: boolean;

  constructor(private filmsService: FilmsService) {
  }

  ngOnInit(): void {
    this.getFilmsForDecades();
  }

  private getFilmsForDecades() {
    this.filmsService.getFilmsForDecades(1, 250)
      .subscribe((res: IFilmData) => {
        this.bubbleChartData = this.filmsService.createBubbleChartData(res.data.movies);
      });
  }

  public updateBubbleChartData() {
    this.bubbleChartData = {...this.bubbleChartData};
    this.toggleButton = !this.toggleButton;
  }

}
