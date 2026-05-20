import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class CartComponent implements OnInit {
  items: any[] = [];
  private cartSvc: any;

  constructor() {
    this.cartSvc = inject(CartService);
  }

  ngOnInit() {
    this.cartSvc.items$.subscribe((items: any[]) => this.items = items);
  }

  getTotal(): number {
    return this.cartSvc.getTotal();
  }

  eliminar(id: number) {
    this.cartSvc.eliminar(id);
  }

  actualizarCantidad(id: number, cantidad: number) {
    this.cartSvc.actualizarCantidad(id, cantidad);
  }
}