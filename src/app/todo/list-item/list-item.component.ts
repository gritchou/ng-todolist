import { Component, OnInit, Input, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';

import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Item } from '../item';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {
  faStar = faStar;

  @Input() item: Item;

  @Output() deleteRequest: EventEmitter<any> = new EventEmitter();
  @Output() favoriteRequest: EventEmitter<any> = new EventEmitter();
  @Output() toggleCompleteRequest: EventEmitter<any> = new EventEmitter();

  @HostListener('mouseenter') onMouseEnter(): void {
    this.elementRef.nativeElement.classList.add('hover-todo');
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    this.elementRef.nativeElement.classList.remove('hover-todo');
  }
  constructor(public elementRef: ElementRef) { }

  ngOnInit(): void {
  }

  delete(): void {
    this.deleteRequest.emit(this.item);
  }

  favorite(): void {
    this.favoriteRequest.emit(this.item);
  }

  toggleComplete(): void {
    this.toggleCompleteRequest.emit(this.item);
  }

}
