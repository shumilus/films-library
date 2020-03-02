import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { LoaderComponent } from '../components/loader/loader.component';
import { ModalWindowComponent } from '../../components/modal-window/modal-window.component';
import { MaterialModule } from './app-material.module';
import { PageNotFoundComponent } from '../../components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    LoaderComponent,
    ModalWindowComponent,
    PageNotFoundComponent,
  ],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
  ],

  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    LoaderComponent,
    ModalWindowComponent,
  ],
})

export class SharedModule {
}
