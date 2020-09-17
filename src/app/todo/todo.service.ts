import { Injectable } from "@angular/core";
import { Item } from "./item";

import { Observable, BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class TodoService {
  todos: Item[] = [];
  allTodos$: BehaviorSubject<Item[]> = new BehaviorSubject(this.todos);
  todos$: Observable<Item[]> = this.allTodos$.pipe(
    map((todos) => todos.filter((todo) => !todo.complete && !todo.favorite))
  );
  favs$: Observable<Item[]> = this.allTodos$.pipe(
    map((todos) => todos.filter((todo) => todo.favorite && !todo.complete))
  );
  completes$: Observable<Item[]> = this.allTodos$.pipe(
    map((todos) => todos.filter((todo) => todo.complete))
  );

  addTodo(todo: Item): void {
    this.allTodos$.next([...this.allTodos$.getValue(), todo]);
  }

  deleteTodo(todo: Item): void {
    this.allTodos$.next(this.allTodos$.getValue().filter((t) => t !== todo));
  }

  favoriteTodo(todo: Item): void {
    todo.favorite = !todo.favorite;
    this.allTodos$.next(this.allTodos$.getValue());
  }

  toggleComplete(todo: Item): void {
    todo.complete = !todo.complete;
    if (todo.favorite) {
      todo.favorite = !todo.favorite;
    }
    this.allTodos$.next(this.allTodos$.getValue());
  }

  getCompletedTasksCount(): Observable<number> {
    return this.completes$.pipe(map((completes) => completes.length));
  }

  getUnCompletedTasksCount(): Observable<number> {
    return this.completes$.pipe(
      map((completes) => this.allTodos$.getValue().length - completes.length)
    );
  }

  getFavoriteTasksCount(): Observable<number> {
    return this.favs$.pipe(map((favs) => favs.length));
  }
}
