import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent {
  categorias = ['Cortas', 'Largas', 'Munición', 'Ópticas', 'Cuchillería'];
  categoriaActiva = '';
  cartCount = 0;

  authService = inject(AuthService);

  seleccionarCategoria(cat: string) {
    this.categoriaActiva = cat;
  }

  logout() {
    this.authService.logout();
  }
}