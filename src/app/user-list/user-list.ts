import { Component, effect, inject, signal } from '@angular/core';
import { Crud } from '../service/crud.service';
import { User } from '../user';

interface ItemData {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}
@Component({
  selector: 'app-user-list',
  imports: [],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList {

  crudService = inject(Crud)

  
  // userData = signal<User[]>([])
  isLoading = signal(true)
  constructor(){
    effect(()=>{
      this.crudService.getUsers().subscribe({
        next: (data:any)=>{
          console.log(data.data);
          this.crudService.userData.set(data.data)
          // this.userData.set(this.crudService.userData())
          this.isLoading.update(v=>v=false)
          // console.log(this.userData())
        },error: (err)=>{
          console.log(err);
          
        }
      })
    })
  }

  onUpdate(user:User, id: number){
    this.crudService.editUser.set(user)
    this.crudService.open()
    
  }

  onDelete(id: number){
    console.log(id);
    
    // if(confirm("Haqiqatan o'chirasizmi?"))
    this.crudService.delUser(id).subscribe({
      next: data=>{
        this.crudService.userData.update(user=>user.filter(c=>c.id !==id))
        console.log(data)
      },
      error: err=>console.log(err)
      
      
    })
  }

  // data = signal([
  //   {
  //     id: 0,
  //     name: "Ali",
  //     email: "Ali@gmail.com",
  //     isActive: true
  //   },
  //   {
  //     id: 1,
  //     name: "Ali",
  //     email: "Ali@gmail.com",
  //     isActive: false
  //   },
  // ])
}
