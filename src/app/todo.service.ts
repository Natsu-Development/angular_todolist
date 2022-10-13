import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Todo } from './todo';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  // no call api
  todoList: Todo[] = [
    { id: 1, name: 'Chinese' },
    { id: 2, name: 'English' },
    { id: 3, name: 'Japanese' },
  ];

  // get todoList
  getTodoList(): Todo[] {
    return this.todoList;
  }

  // get detail todo
  getTodoDetail(id: Number): Todo {
    // default is todo Chinese selected
    const todo = { id: 1, name: 'Chinese' };
    const todoSelected = this.todoList.find((todo) => todo.id === id) || todo;
    return todoSelected;
  }

  // add todoList
  addTodoList(name: string): void {
    const id = this.todoList[this.todoList.length - 1].id + 1;
    this.todoList.push({
      id,
      name,
    });
  }

  // update todoList
  updateTodo(todoUpdate: Todo): void {
    this.todoList.forEach((todo) => {
      if (todo.id === todoUpdate.id) {
        todo.name = todoUpdate.name;
      }
    });
  }

  //delete todoList
  deleteTodo(id: Number): void {
    this.todoList = this.todoList.filter((todo) => todo.id !== id);
  }

  //search Todo list
  searchTodo(term: string): Todo[] {
    if (!term.trim()) {
      return this.todoList;
    }
    let resultFind: Todo[] = [];
    this.todoList.forEach((todo) => {
      if (
        todo.name.includes(term.toLowerCase()) ||
        todo.name.includes(term.toUpperCase())
      ) {
        resultFind.push(todo);
      }
    });

    return resultFind;
  }
}
