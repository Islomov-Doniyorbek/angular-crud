import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Resp, User } from '../user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Crud {
  url = "http://localhost:3000"
  http = inject(HttpClient)
  isOpen = false
  editUser: User | null = null
  userList: User[] = []

  open(){
    this.isOpen = true
  }
  close(){
    this.isOpen = false
  }
 
  getUsers(){
    return this.http.get<Resp>(`${this.url}/users`);
  }
  postUser(user: User):Observable<User>{
    return this.http.post<User>(`${this.url}/users`, user)
  }
  delUser(id: number){
    return this.http.delete(`${this.url}/users/${id}`)
  }

  updateUser(user: User, id: number){
  return this.http.put<User>(`${this.url}/users/${id}`, user)
  }
}
