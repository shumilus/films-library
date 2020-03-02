import { NgModule } from '@angular/core';
import { TopFilmsComponent } from './components/top-films/top-films.component';
import { FilmsRoutingModule } from './films-routing.module';
import { SharedModule } from '../../shared/modules/shared.module';
import { DecadesFilmsComponent } from './components/decades-films/decades-films.component';
import { FavoriteFilmsComponent } from './components/favorite-films/favorite-films.component';
import { BubbleChartComponent } from './components/decades-films/bubble-chart/bubble-chart.component';
import { FilmsComponent } from './components/films/films.component';
import { FilmComponent } from './components/film/film.component';

@NgModule({
  declarations: [
    FilmsComponent,
    TopFilmsComponent,
    DecadesFilmsComponent,
    FavoriteFilmsComponent,
    BubbleChartComponent,
    FilmComponent,
  ],
  imports: [
    FilmsRoutingModule,
    SharedModule,
  ],
  providers: []
})

export class FilmsModule {
}
