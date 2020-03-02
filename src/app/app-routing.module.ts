import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AppPreloadingStrategy } from './shared/app-preloading-strategy';
import { FilmsModule } from './modules/film/films.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => FilmsModule,
    data: {preload: true, delay: false},
  },
  {path: 'not-found', component: PageNotFoundComponent},
  {path: '**', redirectTo: '/not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: AppPreloadingStrategy})],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
