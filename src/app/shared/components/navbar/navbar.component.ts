import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth';
import { CartService } from '../../../core/services/cart';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent implements OnInit {
  categorias = ['Cortas', 'Largas', 'Munición', 'Ópticas', 'Cuchillería', 'Accesorios'];
  categoriaActiva = '';
  cartCount = 0;
  busqueda = '';

  authService = inject(AuthService);
  private cartService = inject(CartService);
  private router = inject(Router);

  ngOnInit() {
    this.cartService.items$.subscribe(() => {
      this.cartCount = this.cartService.getCount();
    });
  }

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