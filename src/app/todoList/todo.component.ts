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
  todoList: Todo[] = [
    { id: 1, name: 'Chinese' },
    { id: 2, name: 'English' },
    { id: 3, name: 'Japanese' },
  ];

  // search
  todoSearch$!: Observable<Todo[]>;
  private searchTerms = new Subject<string>();

  constructor(private todoService: TodoService) {}

  search(term: string): void {
    this.searchTerms.next(term);
  }

  // display todo list
  getTodoList(): void {
    this.todoService.getTodoList().subscribe((todoList) => {
      this.todoList = todoList;
    });
  }

  // add todo list
  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.todoService.addTodoList({ name } as Todo).subscribe((todo) => {
      this.todoList.push(todo);
    });
  }

  // delete todo list
  delete(todoDelete: Todo): void {
    this.todoList = this.todoList.filter((todo) => todo !== todoDelete);
    //this.todoService.deleteTodo(todoDelete.id).subscribe();
  }

  ngOnInit(): void {
    this.getTodoList();
    this.todoSearch$ = this.searchTerms.pipe(
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.todoService.searchTodo(term))
    );
  }
}
