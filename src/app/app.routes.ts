import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Dashboard } from './dashboard/dashboard';
import { ListarUsuarios } from './usuarios/listar-usuarios/listar-usuarios';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: Login },
  { path: 'dashboard', component: Dashboard },
  { path: 'usuarios', component: ListarUsuarios },
  { path: '**', redirectTo: 'login' },
];
