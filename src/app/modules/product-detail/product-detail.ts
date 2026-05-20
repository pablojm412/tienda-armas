import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css'
})
export class ProductDetailComponent implements OnInit {
  product: any;
  cuotas = { cantidad: 12, valorCuota: 0 };
  cantidad = 1;
  imagenActiva = '';
  agregado = false;

  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private cartService = inject(CartService);

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.product = this.productService.getById(id);
    if (this.product) {
      this.cuotas = this.productService.getCuotas(this.product.precio);
      this.imagenActiva = this.product.imagen;
    }
  }

  cambiarImagen(img: string) { this.imagenActiva = img; }
  incrementar() { if (this.product && this.cantidad < this.product.stock) this.cantidad++; }
  decrementar() { if (this.cantidad > 1) this.cantidad--; }

  agregarAlCarrito() {
    if (this.product) {
      this.cartService.agregar(this.product, this.cantidad);
      this.agregado = true;
      setTimeout(() => this.agregado = false, 2000);
    }
  }
}