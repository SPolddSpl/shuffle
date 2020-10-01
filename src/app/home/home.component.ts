import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { InstagramService } from '../services/instagram.service';
import { ShuffleService } from '../services/shuffle.service';
import { WelcomeDialogComponent } from '../start/welcome-dialog/welcome-dialog.component';
import { DrawDetailsComponent } from './draw-details/draw-details.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  draws: Draw[];
  userName: string;
  instProfile: InstUser;
  searchUser: string;
  drawMembers: InstUser[];
  drawName: string;
  drawPrizeName: string;
  selectedTab: number = 0;
  createdDraw: FormDraw;
  winnerUser: InstUser;

  constructor(private shuffleService: ShuffleService, private instagramService: InstagramService, private dialogCtrl: MatDialog) {
    this.drawMembers = [];
    this.draws = [];
  }

  ngOnInit(): void {
    this.userName = localStorage.getItem('userName');
    this.getDraws();
  }

  getDraws() {
    this.shuffleService.getDraws(this.userName).subscribe((res: Draw[]) => {
      this.draws = res;
    });
  }

  test() {
    if (this.searchUser) {
      this.instagramService.getProfile(this.searchUser).subscribe((data: any) => {
        this.instProfile = data.graphql.user;
        if (this.instProfile) {
          if (!this.drawMembers.find(x => x.username == this.searchUser)) {
            this.drawMembers.push(this.instProfile)
          }
        }
      })
    }
    else {
      alert('Пожалуйста, введите имя пользователя в инстаграм')
    }
    console.log(this.drawMembers)
  }

  deleteMember(userId) {
    let foundUser = this.drawMembers.find(x => x.id == userId);
    if (foundUser) {
      this.drawMembers = this.drawMembers.filter(x => x.id !== foundUser.id);
    }
  }

  submitDrawForm() {
    if (this.drawName && this.drawPrizeName) {
      this.createdDraw = {
        Prize: '',
        DrawName: '',
        InitiatorName: '',
        DrawMembers: []
      }
      this.createdDraw.Prize = this.drawPrizeName;
      this.createdDraw.DrawName = this.drawName;
      console.log(this.createdDraw)
      this.selectedTab++;
    }
  }

  submitDrawMembers() {
    if (this.drawMembers.length) {
      this.drawMembers.forEach(x => {
        this.createdDraw.DrawMembers.push(x.username);
      })
      this.createdDraw.InitiatorName = this.userName;
      this.shuffleService.createDraw(this.createdDraw).subscribe((res) => {
        if (res) {
          this.winnerUser = this.drawMembers.find(x => x.username == res);
          this.getDraws();
          this.selectedTab++;
        }
      })
    }
  }

  drawDetails(draw) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { draw: draw };
    const dialog = this.dialogCtrl.open(DrawDetailsComponent, dialogConfig);

    dialog.afterClosed().subscribe((res) => {
      console.log(res)
    })
  }

  deleteDraw(drawId) {
    this.shuffleService.deleteDraw(drawId).subscribe((res) => {
      if (res) {
        alert('Запись удалена')
        this.getDraws();
      }
    })
  }
}

export interface Draw {
  CreatedDate: string;
  DoneDate: string;
  Id: string;
  Initiator: string;
  Name: string;
  Prize: string;
  WinnerName: string;
}

export interface InstUser {
  biography: string;
  profile_pic_url_hd: string;
  id: string;
  username: string;
  full_name: string;
}

export interface FormDraw {
  DrawName: string;
  Prize: string;
  InitiatorName: string;
  DrawMembers: string[];
}