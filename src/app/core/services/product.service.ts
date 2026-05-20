import { Injectable } from '@angular/core';
import { Product } from '../../shared/models/product.model';
import productsData from '../../data/products.mock.json';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products: Product[] = productsData as unknown as Product[];

  getAll(): Product[] {
    return this.products;
  }

  getById(id: number): Product | undefined {
    return this.products.find(p => p.id === id);
  }

  getByCategoria(categoria: string): Product[] {
    return this.products.filter(p => p.categoria === categoria);
  }

  search(query: string): Product[] {
    const q = query.toLowerCase();
    return this.products.filter(p =>
      p.nombre.toLowerCase().includes(q) ||
      p.descripcion.toLowerCase().includes(q) ||
      p.categoria.toLowerCase().includes(q)
    );
  }

  getCategorias(): string[] {
    return [...new Set(this.products.map(p => p.categoria))];
  }

  getCuotas(precio: number): { cantidad: number; valorCuota: number } {
    const cantidad = precio > 150000 ? 12 : 6;
    const valorCuota = Math.round(precio / cantidad);
    return { cantidad, valorCuota };
  }
}