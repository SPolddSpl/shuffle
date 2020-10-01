import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-draw-details',
  templateUrl: './draw-details.component.html',
  styleUrls: ['./draw-details.component.scss']
})
export class DrawDetailsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DrawDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  ngOnInit(): void {
    console.log(this.data)
  }

  redirectToWinner(userName) {
    const url = `https://instagram.com/${userName}`;
    window.open(url, "_blank");
  }
}
