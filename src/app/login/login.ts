import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginRequest } from '../core/models/auth.model';
import { AuthService } from '../core/service/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  imports: [FormsModule, CommonModule],
  selector: 'login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {

  credentials: LoginRequest = {
    correo: '',
    password: ''
  };

  loading = false;
  errorMessage = '';

  constructor( private authService : AuthService, private router : Router ){}

  iniciarSesion() : void {
    if( this.loading ) return;

    this.loading = true;
    this.errorMessage = '';

    this.authService.login(this.credentials).subscribe({
      next: (response) =>{
        console.log('Inicio de sesión exitoso');
        this.router.navigate(['/dashboard']);
      }, 
      error : ( error : HttpErrorResponse ) => {
        if (error.status === 401) this.errorMessage = 'Correo o contraseña incorrectos.';
        else if ( error.status === 0 ) this.errorMessage = 'No fue posible conectar con el servidor.';
        else this.errorMessage = error.error?.errorMessage || 'Ocurrió un error al iniciar sesión';
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }


}
