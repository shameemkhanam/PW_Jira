import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/myServices/api.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private dialog: MatDialog) { }



  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: "30%"
    });

    // openDialog() {
    //   const dialogRef = this.dialog.open(DialogComponent, {
    //     width: "30%"
    //   }).afterClosed().subscribe((val) => {
    //     if (val === 'save') {
    //       this.apiService.getProject();
    //     }
    //   });
  }



}
