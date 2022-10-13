import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const todoList = [
      { id: 1, name: 'Chinese' },
      { id: 2, name: 'English' },
      { id: 3, name: 'Japanese' },
    ];
    return { todoList };
  }

  genId(todoList: Todo[]): number {
    return todoList.length > 0
      ? Math.max(...todoList.map((hero) => hero.id)) + 1
      : 1;
  }
}
