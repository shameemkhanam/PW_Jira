import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './myComponents/board/board.component';
import { DashboardComponent } from './myComponents/dashboard/dashboard.component';
import { PageNotFoundComponent } from './myComponents/page-not-found/page-not-found.component';
import { TodosComponent } from './myComponents/todos/todos.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'board', component: BoardComponent },
  { path: 'todos', component: TodosComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
