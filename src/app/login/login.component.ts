import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';
import { ActivatedRoute } from '@angular/router';


@Component({
selector: 'app-login',
standalone: true,
imports: [FormsModule, CommonModule],
templateUrl: './login.component.html',
})
export class LoginComponent {
username = '';
password = '';
error?: string;
loading = false;

constructor(public authService: AuthService, public router: Router, private route: ActivatedRoute) {
  // Si venimos de una redirección por token expirado
  this.route.queryParams.subscribe(params => {
    if (params['expired']) {
      this.error = 'Tu sesión ha expirado. Por favor, inicia sesión de nuevo.';
    }
  });
}

login() {
  this.loading = true;
  this.error = undefined;

  this.authService.login(this.username, this.password).subscribe({
    next: (res) => {
      console.log('✅ Login exitoso');
      this.authService.setSession(res.token, res.user);
      this.loading = false;
      this.router.navigate(['/plants']);
    },
    error: (err) => {
      console.error('❌ Error en login:', err);
      this.loading = false;
      this.error = 'Usuario o contraseña incorrectos';
    }
  });
}
}