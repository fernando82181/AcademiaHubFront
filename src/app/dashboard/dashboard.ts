import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavBar } from '../shared/nav-bar/nav-bar';

@Component({
  imports: [NavBar, RouterLink],
  selector: 'dashboard',
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
})
export class Dashboard {}
