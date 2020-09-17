import { TestBed } from '@angular/core/testing';

import { TodoService } from './todo.service';
import { createPlatform } from '@angular/core';
import { ListComponent } from './list/list.component';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getTodos', () => {

    it('should return empty array by default', () => {
      expect(service.getTodos()).toEqual([]);
    });

    it('should return all todos', () => {
      service.addTodo({ text: 'test1', complete: false });
      service.addTodo({ text: 'test2', complete: true });
      expect(service.getTodos()).toEqual([{ text: 'test1', complete: false }, { text: 'test2', complete: true }]);
    });
  });

  describe('deleteTodo', () => {
    it('should remove the right todo', () => {
      const todo = { text: 'test1', complete: false };
      service.addTodo(todo);
      expect(service.getTodos()).toEqual([{ text: 'test1', complete: false }]);
      service.deleteTodo(todo);
      expect(service.getTodos()).toEqual([]);
    });
  });

  describe('toggleComplete', () => {
    it('should toggle complete on the item', () => {
      const completedTodo = { text: 'test1', complete: true };
      service.addTodo(completedTodo);
      service.toggleComplete(completedTodo);
      expect(service.getTodos().find(item => item === completedTodo).complete).toEqual(false);
      const uncompletedTodo = { text: 'test2', complete: false };
      service.addTodo(uncompletedTodo);
      service.toggleComplete(uncompletedTodo);
      expect(service.getTodos().find(item => item === uncompletedTodo).complete).toEqual(true);
    });
  });

});
