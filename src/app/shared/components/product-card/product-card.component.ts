import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent implements OnInit {
  @Input() product!: Product;
  cuotas = { cantidad: 12, valorCuota: 0 };

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.cuotas = this.productService.getCuotas(this.product.precio);
  }
}