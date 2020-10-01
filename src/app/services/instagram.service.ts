import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InstagramService {
  basePath: string;
  constructor(private http: HttpClient) {
    this.basePath = "https://www.instagram.com/"
  }


  getProfile(userName: string) {
    return this.http.get(`${this.basePath}${userName}/?__a=1`).pipe();
  }
}
