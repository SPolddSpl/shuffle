import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { WelcomeDialogComponent } from './welcome-dialog/welcome-dialog.component';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  constructor(private dialogCtrl: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.initRoute();
  }

  initRoute() {
    let userName = localStorage.getItem('userName');
    if (userName) {
      this.router.navigate(['/home']);
    } else {
      const dialog = this.dialogCtrl.open(WelcomeDialogComponent, {
        width: '250px',
        data: { userName: '' }
      });
      dialog.afterClosed().subscribe((res) => {
        if (res) {
          localStorage.setItem('userName', res);

          this.router.navigate(['/home']);
        }
      })
    }
  }

}

