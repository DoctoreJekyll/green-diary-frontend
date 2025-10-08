// src/app/app.ts
import { Component } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <app-navbar></app-navbar>
    <main class="p-6">
      <router-outlet></router-outlet>
    </main>
  `,
  standalone: true,
  imports: [NavbarComponent, RouterOutlet]
})
export class App {}
