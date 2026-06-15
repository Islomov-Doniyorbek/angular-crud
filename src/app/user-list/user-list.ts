import { ChangeDetectorRef, Component, effect, inject, OnInit, signal } from '@angular/core';
import { Crud } from './user.service';
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
export class UserList implements OnInit {


  private cdr = inject(ChangeDetectorRef)
  crudService = inject(Crud)
  
  isLoading: boolean = true
  
  ngOnInit(): void {
     this.crudService.getUsers().subscribe({
      next: (res)=> {
         this.crudService.userList = res.data
         this.isLoading = false;
         this.cdr.detectChanges()
        },
        error: (err)=>{
          console.log(err);
          this.isLoading = false;          
          this.cdr.detectChanges()
        }
     })
  }

  onUpdate(user:User, id: number){
    this.crudService.editUser = user
    this.crudService.open()    
  }

  onDelete(id: number){
    this.crudService.delUser(id).subscribe({
      next: () =>{
        this.crudService.userList = [...this.crudService.userList.filter(c=>c.id !==id)]
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
