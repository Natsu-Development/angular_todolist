import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';

import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  todoList: Todo[] = [];

  constructor(private todoService: TodoService) {}

  search(term: string): void {
    this.todoList = this.todoService.searchTodo(term);
  }

  // display todo list
  getTodoList(): void {
    this.todoList = this.todoService.getTodoList();
  }

  // add todo list
  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.todoService.addTodoList(name);
    this.getTodoList();
  }

  // delete todo list
  delete(id: Number): void {
    this.todoService.deleteTodo(id);
    this.getTodoList();
  }

  ngOnInit(): void {
    this.getTodoList();
  }
}
