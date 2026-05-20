import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product } from '../../shared/models/product.model';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css'
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;
  cuotas = { cantidad: 12, valorCuota: 0 };
  cantidad = 1;
  imagenActiva = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.product = this.productService.getById(id);
    if (this.product) {
      this.cuotas = this.productService.getCuotas(this.product.precio);
      this.imagenActiva = this.product.imagen;
    }
  }

  cambiarImagen(img: string) {
    this.imagenActiva = img;
  }

  incrementar() {
    if (this.product && this.cantidad < this.product.stock) {
      this.cantidad++;
    }
  }

  decrementar() {
    if (this.cantidad > 1) this.cantidad--;
  }
}