import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TodoDetailComponent } from './todo-detail/todo-detail.component';
import { TodoComponent } from './todoList/todo.component';

const routes: Routes = [
  { path: '', component: TodoComponent },
  { path: 'detail/:id', component: TodoDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
