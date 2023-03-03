import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { iTask } from 'src/app/model/task';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todosForm !: FormGroup;
  tasks: iTask[] = [];
  inProgress: iTask[] = [];
  done: iTask[] = [];
  updateIndex: any;
  isEditEnabled: boolean = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.todosForm = this.fb.group({
      item: ['', Validators.required]
    });
  }

  drop(event: CdkDragDrop<iTask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  addTask() {
    this.tasks.push({
      description: this.todosForm.value.item,
      done: false
    });
    this.todosForm.reset();
  }

  deleteTask(i: number) {
    this.tasks.splice(i, 1);
  }

  deleteInProgress(i: number) {
    this.inProgress.splice(i, 1);
  }

  deleteDone(i: number) {
    this.done.splice(i, 1);
  }

  onEdit(item: iTask, i: number) {
    this.todosForm.controls['item'].setValue(item.description);
    this.updateIndex = i;
    this.isEditEnabled = true;
  }

  updateTask() {
    this.tasks[this.updateIndex].description = this.todosForm.value.item;
    this.tasks[this.updateIndex].done = false;
    this.todosForm.reset();
    this.updateIndex = undefined;
    this.isEditEnabled = false;
  }
}
