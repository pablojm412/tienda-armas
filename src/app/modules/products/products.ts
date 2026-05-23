import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class ProductsComponent implements OnInit {
  productos: any[] = [];
  query = '';
  esBusqueda = false;

  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.query = params['q'] || '';
      const categoria = params['categoria'] || '';
      if (this.query) {
        this.esBusqueda = true;
        this.productos = this.productService.search(this.query);
      } else if (categoria) {
        this.esBusqueda = false;
        this.query = categoria;
        this.productos = this.productService.getByCategoria(categoria);
      } else {
        this.productos = this.productService.getAll();
      }
    });
  }
}