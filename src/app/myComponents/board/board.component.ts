import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/myServices/api.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  projectList: any;

  constructor(private apiService: ApiService, private dialog: MatDialog) { }

  ngOnInit(): void {

    this.getAllProjects();
  }

  getAllProjects() {
    this.apiService.getProject().subscribe((res) => {
      // console.log(res);  
      this.projectList = res;
    },
      (err) => {
        alert('error while fetching record..');
      });
  }

  editProject(itm: any) {
    this.dialog.open(DialogComponent, {
      width: '30%',
      data: itm
    }).afterClosed().subscribe((val) => {
      if (val === 'update') {
        this.getAllProjects();
      }
    });
  }

  deleteProject(id: number) {
    this.apiService.deleteProject(id)
      .subscribe((res) => {
        alert('deleted successfully..');
        this.getAllProjects();
      }, (err) => {
        alert('error while deleting');
      });
  }

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.projectList, event.previousIndex, event.currentIndex);
  }
}
