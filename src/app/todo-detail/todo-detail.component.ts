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

  ngOnInit(): void {
    this.getTodo();
  }

  getTodo(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.todoService.getDetailTodo(id).subscribe((todo) => (this.todo = todo));
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.todo) {
      this.todoService.updateTodo(this.todo).subscribe(() => this.goBack());
    }
  }
}
