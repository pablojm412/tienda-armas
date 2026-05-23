import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, ProductCardComponent],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css'
})
export class ProductDetailComponent implements OnInit {
  product: any;
  cuotas = { cantidad: 12, valorCuota: 0 };
  cantidad = 1;
  imagenActiva = '';
  agregado = false;
  relacionados: any[] = [];

  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private router = inject(Router);

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = Number(params['id']);
      this.product = this.productService.getById(id);
      if (this.product) {
        this.cuotas = this.productService.getCuotas(this.product.precio);
        this.imagenActiva = this.product.imagen;
        this.relacionados = this.productService
          .getByCategoria(this.product.categoria)
          .filter(p => p.id !== this.product.id)
          .slice(0, 4);
      }
    });
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

  comprarAhora() {
    if (this.product) {
      this.cartService.agregar(this.product, this.cantidad);
      this.router.navigate(['/checkout']);
    }
  }
}