import { Component, effect, EventEmitter, inject, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Crud } from '../user.service';
import { User } from '../../user';
import { UserList } from '../user-list';

@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css',
})
export class UserForm {
  @Output() close = new EventEmitter()

  crudService = inject(Crud)
  
  isUpdate: boolean = false

  userForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    isActive: new FormControl(true)
  })

  constructor() {
      const user = this.crudService.editUser;
      if (user) {
        this.userForm.patchValue(user);
      } else {
        this.userForm.reset({name: '', email: '', isActive: false});
      }
    
  }

  onSubmit() {
    const user = this.crudService.editUser;
    if (user) {
      this.isUpdate = true
      this.crudService.updateUser({ ...this.userForm.value, id: user.id } as User, user.id).subscribe({
        next: (updUser) => {
          this.crudService.userList = this.crudService.userList.map(u=> u.id === updUser.id ? updUser : u)

          setTimeout(() => {
            this.isUpdate = false
            this.close.emit();
          }, 1000);

          this.crudService.editUser = null;
        },
        error: (err) => console.log(err)
      });
    } else {
      console.log(this.userForm);
      
      this.crudService.postUser(this.userForm.value as User).subscribe({
        next: (data) => {
          console.log(data);
          
          this.crudService.userList = [
            ...this.crudService.userList,
            data
          ]
          this.close.emit();
        },
        error: (err) => console.log(err)
      });
    }
  }

  onClose() {
    this.close.emit()
  }
}