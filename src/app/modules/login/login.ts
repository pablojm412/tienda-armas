import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  private authService = inject(AuthService);
  private router = inject(Router);

  login() {
    if (this.authService.login(this.email, this.password)) {
      this.router.navigate(['/']);
    } else {
      this.error = 'Email o contraseña incorrectos.';
    }
  }
}