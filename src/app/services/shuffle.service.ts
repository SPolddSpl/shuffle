import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShuffleService {
  basePath: string;
  constructor(private http: HttpClient) {
    this.basePath = environment.baseURL;
  }


  getDraws(userName) {
    return this.http.get(`${this.basePath}/api/shuffle/getMyDraws?userName=${userName}`).pipe();
  }

  createDraw(data) {
    return this.http.post(`${this.basePath}/api/shuffle/createDraw`, data).pipe();
  }

  deleteDraw(drawId) {
    return this.http.get(`${this.basePath}/api/shuffle/deletedraw?drawId=${drawId}`).pipe();
  }
}
