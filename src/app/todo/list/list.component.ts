import { Component } from "@angular/core";

import { Item } from "../item";

import { TodoService } from "../todo.service";
import { Observable } from "rxjs";
import { FormGroup, FormControl } from "@angular/forms";
import {
  trigger,
  state,
  style,
  transition,
  animate
} from "@angular/animations";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
  animations: [
    trigger("flyInOut", [
      state("in", style({ transform: "translateX(0)" })),
      transition("void => *", [
        style({ transform: "translateX(-100%)" }),
        animate(100)
      ]),
      transition("* => void", [
        animate(100, style({ transform: "translateX(100%)" }))
      ])
    ])
  ]
})
export class ListComponent {
  items$: Observable<Item[]> = this.todoService.todos$;
  favorites$: Observable<Item[]> = this.todoService.favs$;
  completes$: Observable<Item[]> = this.todoService.completes$;
  uncompletedCount$: Observable<
    number
  > = this.todoService.getUnCompletedTasksCount();
  favoritesCount$: Observable<
    number
  > = this.todoService.getFavoriteTasksCount();
  completedCount$: Observable<
    number
  > = this.todoService.getCompletedTasksCount();

  addTodoGroup = new FormGroup({
    todoInput: new FormControl("")
  });

  constructor(private todoService: TodoService) { }

  deleteItem(item): void {
    this.todoService.deleteTodo(item);
  }

  favoriteItem(item): void {
    this.todoService.favoriteTodo(item);
  }

  toggleComplete(item): void {
    this.todoService.toggleComplete(item);
  }

  addTodo(): void {
    this.todoService.addTodo({
      text: this.addTodoGroup.value.todoInput,
      complete: false,
      favorite: false
    });
  }
}
