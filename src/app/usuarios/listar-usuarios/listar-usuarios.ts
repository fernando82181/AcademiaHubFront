import { Component } from '@angular/core';
import { NavBar } from '../../shared/nav-bar/nav-bar';

@Component({
  imports: [NavBar],
  selector: 'app-listar-usuarios',
  styleUrl: './listar-usuarios.css',
  templateUrl: './listar-usuarios.html',
})
export class ListarUsuarios {}
