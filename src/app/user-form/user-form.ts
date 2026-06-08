import { Component, effect, EventEmitter, inject, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Crud } from '../service/crud.service';
import { User } from '../user';

@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css',
})
export class UserForm {
  @Output() close = new EventEmitter()

  crudService = inject(Crud)

  userForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    isActive: new FormControl(false)
  })

  constructor() {
    effect(() => {
      const user = this.crudService.editUser();
      if (user) {
        this.userForm.patchValue(user);
      } else {
        this.userForm.reset();
      }
    });
  }

  onSubmit() {
    const user = this.crudService.editUser();
    if (user) {
      console.log(typeof user.id, user.id);
      this.crudService.updateUser({ ...this.userForm.value, id: user.id } as User, +user.id).subscribe({
        next: (data) => {
          this.crudService.userData.update(list =>
            list.map(u => u.id === data.id ? data : u)
          );
          this.close.emit();
        },
        error: (err) => console.log(err)
      });
    } else {
      this.crudService.postUser(this.userForm.value as User).subscribe({
        next: (data) => {
          this.crudService.userData.update(list => [...list, data]);
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