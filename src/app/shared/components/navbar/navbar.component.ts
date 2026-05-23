import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent {
  categorias = ['Cortas', 'Largas', 'Munición', 'Ópticas', 'Cuchillería'];
  categoriaActiva = '';
  cartCount = 0;
  busqueda = '';

  authService = inject(AuthService);
  private router = inject(Router);

  seleccionarCategoria(cat: string) {
  this.categoriaActiva = cat;
  this.router.navigate(['/productos'], { queryParams: { categoria: cat } });
}

  logout() {
    this.authService.logout();
  }

  buscar() {
    if (this.busqueda.trim()) {
      this.router.navigate(['/productos'], { queryParams: { q: this.busqueda } });
    }
  }

  buscarEnter(event: KeyboardEvent) {
    if (event.key === 'Enter') this.buscar();
  }
}