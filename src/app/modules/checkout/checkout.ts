import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class CheckoutComponent implements OnInit {
  compraExitosa = false;
  nombre = '';
  direccion = '';
  pago = 'efectivo';
  total = 0;

  private cartService = inject(CartService);
  private router = inject(Router);

  ngOnInit() {
    this.total = this.cartService.getTotal();
    if (this.total === 0) this.router.navigate(['/']);
  }

  confirmar() {
    if (this.nombre && this.direccion) {
      this.compraExitosa = true;
      this.cartService.vaciar();
    }
  }
}