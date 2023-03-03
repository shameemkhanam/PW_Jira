import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/myServices/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  todoForm!: FormGroup;
  // projectName: any;
  actionBtn: string = 'Save';

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public editData: any, private router: Router) { }

  ngOnInit(): void {
    this.todoForm = this.formBuilder.group({
      projectName: ['', Validators.required],
      status: ['', Validators.required],
      summary: ['', Validators.required]
    });
    // console.log(this.editData);
    if (this.editData) {
      this.actionBtn = 'Update';
      this.todoForm.controls['projectName'].setValue(this.editData.projectName);
      this.todoForm.controls['status'].setValue(this.editData.status);
      this.todoForm.controls['summary'].setValue(this.editData.summary);
    }

  }

  addProject() {
    // console.log(this.todoForm.value);
    if (!this.editData) {
      if (this.todoForm.valid) {
        this.apiService.postProject(this.todoForm.value)
          .subscribe((res) => {
            alert('project added successfully..');
            this.todoForm.reset();
            this.dialogRef.close('save');
            this.router.navigate(['board']);
          },
            (err) => {
              alert('error while adding project..');
            });
      }
    }
    else {
      this.updateProject();
    }
  }

  updateProject() {
    this.apiService.putProject(this.todoForm.value, this.editData.id)
      .subscribe((res) => {
        alert('Product updated successfully');
        this.todoForm.reset();
        this.dialogRef.close('update');
      }, (err) => {
        alert('error while updating..');
      });
  }

}
