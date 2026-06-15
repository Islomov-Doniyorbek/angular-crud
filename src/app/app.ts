import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserForm } from "./user-list/user-form/user-form";
import { Crud } from './user-list/user.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UserForm],
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('crud');

  crudService = inject(Crud)
}
