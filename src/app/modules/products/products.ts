import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../core/services/product.service';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, FormsModule],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class ProductsComponent implements OnInit {
  productos: any[] = [];
  productosFiltrados: any[] = [];
  query = '';
  esBusqueda = false;
  precioMin: number | null = null;
  precioMax: number | null = null;

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
      this.aplicarFiltros();
    });
  }

  aplicarFiltros() {
    this.productosFiltrados = this.productos.filter(p => {
      const minOk = this.precioMin === null || p.precio >= this.precioMin;
      const maxOk = this.precioMax === null || p.precio <= this.precioMax;
      return minOk && maxOk;
    });
  }

  limpiarFiltros() {
    this.precioMin = null;
    this.precioMax = null;
    this.aplicarFiltros();
  }
}