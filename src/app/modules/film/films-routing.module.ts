import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopFilmsComponent } from './components/top-films/top-films.component';
import { DecadesFilmsComponent } from './components/decades-films/decades-films.component';
import { FavoriteFilmsComponent } from './components/favorite-films/favorite-films.component';
import { FilmsComponent } from './components/films/films.component';

const FilmsRoutes: Routes = [
  {
    path: '', component: FilmsComponent, children: [
      {path: '', component: TopFilmsComponent},
      {path: 'decades-films', component: DecadesFilmsComponent},
      {path: 'favorite-films', component: FavoriteFilmsComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(FilmsRoutes)],
  exports: [RouterModule]
})

export class FilmsRoutingModule {

}
