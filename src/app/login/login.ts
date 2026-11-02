import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

export interface LoginCredentials {
  email: string;
  password: string;
}

@Component({
  imports: [FormsModule],
  selector: 'login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  @Output() readonly loginRequested = new EventEmitter<LoginCredentials>();

  email = '';
  password = '';

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    this.loginRequested.emit({ email: this.email, password: this.password });
  }
}
