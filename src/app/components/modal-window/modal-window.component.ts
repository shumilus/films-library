import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.scss'],
  animations: [
    trigger('positionTo', [
      transition(':enter', [
        style({
          top: 'calc(50% - 50px)',
          opacity: .66,
        }),
        animate('.250s ease',
          style({
            top: '50%',
            opacity: 1,
          })),
      ]),
      transition(':leave', [
        animate('.150s ease',
          style({
            top: 'calc(50% - 50px)',
            opacity: .1,
          })),
      ]),
    ]),
    trigger('overleyAnimate', [
      transition(':enter', [
        style({
          opacity: .22,
        }),
        animate('.150s linear',
          style({
            opacity: 1,
          })),
      ]),
      transition(':leave', [
        animate('.250s ease',
          style({
            opacity: 0,
          })),
      ]),
    ]),
  ],
})
export class ModalWindowComponent implements OnInit {
  @Input() trailerLink: string;
  @Output() modalClick = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit() {
  }

  closeModal() {
    this.modalClick.emit(false);
  }

}
