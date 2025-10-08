// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PlantList } from './plant/plant-list/plant-list';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'plants', component: PlantList, canActivate: [authGuard] },
  { path: '**', redirectTo: 'login' },
];
