import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private BASE_URL = 'https://reqres.in/';

  constructor(private http: HttpClient) { }

  signUser(userData: any){
    return this.http.post(`${this.BASE_URL}api/login`, userData);
  }

  registerUser(userData: any){
    return this.http.post(`${this.BASE_URL}api/register`, userData);
  }

  fetchUsers(){
    return this.http.get(`${this.BASE_URL}api/users?page=2`);
  }

  fetchUserInfo(id: any){
    return this.http.get(`${this.BASE_URL}api/users/${id}`);
  }
}
