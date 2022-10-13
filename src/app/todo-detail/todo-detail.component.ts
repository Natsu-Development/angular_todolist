import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Todo } from '../todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss'],
})
export class TodoDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService,
    private location: Location
  ) {}

  @Input() todo?: Todo;

  getTodo(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.todo = this.todoService.getTodoDetail(id);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.todo) {
      this.todoService.updateTodo(this.todo);
      this.goBack();
    }
  }

  ngOnInit(): void {
    this.getTodo();
  }
}
