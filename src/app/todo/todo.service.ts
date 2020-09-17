import { Injectable } from '@angular/core';
import { Item } from './item';

import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  // todos: Item[] = [{ text: 'pouet', complete: false, favorite: false }, { text: 'cheh', complete: true, favorite: false }];
  todos: Item[] = [];
  allTodos$: BehaviorSubject<Item[]> = new BehaviorSubject(this.todos);
  todos$: Observable<Item[]> = this.allTodos$.pipe(map((todos) => todos.filter((todo) => !todo.complete && !todo.favorite)));
  favs$: Observable<Item[]> = this.allTodos$.pipe(map((todos) => todos.filter((todo) => todo.favorite && !todo.complete)));
  completes$: Observable<Item[]> = this.allTodos$.pipe(map((todos) => todos.filter((todo) => todo.complete)));

  constructor() { }

  getTodos(): Observable<Item[]> {
    // return this.todos.filter((todo) => !todo.complete && !todo.favorite);
    return this.todos$;
  }

  getFavs(): Observable<Item[]> {
    return this.favs$;
  }

  getCompletes(): Observable<Item[]> {
    return this.completes$;
  }

  addTodo(todo: Item): void {
    this.allTodos$.next([...this.allTodos$.value, todo]);
  }

  deleteTodo(todo: Item): void {
    this.allTodos$.next(this.allTodos$.value.filter((t) => t !== todo));
  }

  favoriteTodo(todo: Item): void {
    // this.allTodos$.pipe(map((todos) => todos.splice(todos.indexOf(todo), 1)));
    todo.favorite = !todo.favorite;
  }

  // updateTodo(todo: Item, values: object): void {
  //   Object.assign(this.todos.find((item) => item === todo), values);
  // }

  toggleComplete(todo: Item): void {
    // Object.assign(this.todos.find((item) => item === todo), { complete: !todo.complete });
    todo.complete = !todo.complete;
    if (todo.favorite) {
      todo.favorite = !todo.favorite;
    }
    // this.updateTodo(todo, { complete: !todo.complete });
  }

  getCompletedTasksCount(): Observable<number> {
    return this.completes$.pipe(
      map((completes) => completes.length)
    );
  }

  getUnCompletedTasksCount(): Observable<number> {
    return this.completes$.pipe(map((completes) => this.todos.length - completes.length));
  }

  getFavoriteTasksCount(): Observable<number> {
    return this.favs$.pipe(
      map((favs) => favs.length)
    );
  }
}
