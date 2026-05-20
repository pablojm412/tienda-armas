import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  categorias = ['Cortas', 'Largas', 'Munición', 'Ópticas', 'Cuchillería'];
  categoriaActiva = '';
  cartCount = 0;

  seleccionarCategoria(cat: string) {
    this.categoriaActiva = cat;
  }
}