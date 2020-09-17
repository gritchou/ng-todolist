import { Component, Input } from '@angular/core';

import { Item } from '../item';

import { TodoService } from '../todo.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  items$: Observable<Item[]> = this.todoService.getTodos();
  favorites$: Observable<Item[]> = this.todoService.getFavs();
  completes$: Observable<Item[]> = this.todoService.getCompletes();
  uncompletedCount$: Observable<number> = this.todoService.getUnCompletedTasksCount();
  favoritesCount$: Observable<number> = this.todoService.getFavoriteTasksCount();
  completedCount$: Observable<number> = this.todoService.getCompletedTasksCount();

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

  addTodo($event): void {
    this.todoService.addTodo({ text: $event.target.value, complete: false, favorite: false });
  }

}
