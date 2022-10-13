import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Todo } from './todo';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todoUrl = 'api/todoList';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  // get todoList
  getTodoList(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.todoUrl).pipe(
      tap((_) => console.log('Success')),
      catchError(this.handleError<Todo[]>('getTodo', []))
    );
  }

  // get detail todo
  getDetailTodo(id: Number): Observable<Todo> {
    return this.http.get<Todo>(`${this.todoUrl}/${id}`).pipe(
      tap((_) => console.log('Success detail')),
      catchError(this.handleError<Todo>('Detail todo'))
    );
  }

  // add todoList
  addTodoList(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.todoUrl, todo, this.httpOptions).pipe(
      tap((newTodo: Todo) => console.log('Add Success', newTodo)),
      catchError(this.handleError<Todo>('addTodo'))
    );
  }

  // update todoList
  updateTodo(todo: Todo): Observable<any> {
    return this.http.put(this.todoUrl, todo, this.httpOptions).pipe(
      tap((_) => console.log(`updated todo id=${todo.id}`)),
      catchError(this.handleError<any>('updateTodo'))
    );
  }

  //delete todoList
  deleteTodo(todoId: Number): Observable<Todo> {
    const urlDelete = `${this.todoUrl}/${todoId}`;
    return this.http.delete<Todo>(urlDelete, this.httpOptions).pipe(
      tap((_) => console.log('Delete Success')),
      catchError(this.handleError<Todo>('deleteTodo'))
    );
  }

  //search Todo list
  searchTodo(term: String): Observable<Todo[]> {
    if (!term.trim()) {
      return of([]);
    }

    return this.http.get<Todo[]>(`${this.todoUrl}/?name=${term}`).pipe(
      tap((todo) => console.log('Search Success', todo)),
      catchError(this.handleError<Todo[]>('searchTodo', []))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
