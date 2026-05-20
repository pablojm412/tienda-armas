import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../shared/models/product.model';
import { ProductService } from '../../core/services/product.service';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit {
  productos: Product[] = [];
  categorias = ['Cortas', 'Largas', 'Munición', 'Ópticas', 'Cuchillería'];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productos = this.productService.getAll();
  }
}