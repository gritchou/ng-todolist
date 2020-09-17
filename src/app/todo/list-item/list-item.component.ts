import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  HostListener,
  ElementRef,
  OnDestroy
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { Item } from "../item";
import { Subscription } from "rxjs";

@Component({
  selector: "app-list-item",
  templateUrl: "./list-item.component.html",
  styleUrls: ["./list-item.component.scss"]
})
export class ListItemComponent implements OnInit, OnDestroy {
  @Input() item: Item;

  @Output() deleteRequest: EventEmitter<any> = new EventEmitter();
  @Output() favoriteRequest: EventEmitter<any> = new EventEmitter();
  @Output() toggleCompleteRequest: EventEmitter<any> = new EventEmitter();

  @HostListener("mouseenter") onMouseEnter(): void {
    this.elementRef.nativeElement.classList.add("hover-todo");
  }

  @HostListener("mouseleave") onMouseLeave(): void {
    this.elementRef.nativeElement.classList.remove("hover-todo");
  }

  readonly subscription: Subscription;

  textForm = new FormControl("");

  constructor(public elementRef: ElementRef) {
    this.subscription = this.textForm.valueChanges.subscribe((val) => {
      this.item.text = val;
    });
  }

  ngOnInit(): void {
    this.textForm.setValue(this.item.text);
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
