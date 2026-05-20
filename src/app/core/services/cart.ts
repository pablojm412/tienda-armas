import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  product: any;
  cantidad: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items = new BehaviorSubject<CartItem[]>([]);
  items$ = this.items.asObservable();

  agregar(product: any, cantidad: number = 1) {
    const actual = this.items.getValue();
    const existe = actual.find(i => i.product.id === product.id);
    if (existe) {
      existe.cantidad += cantidad;
      this.items.next([...actual]);
    } else {
      this.items.next([...actual, { product, cantidad }]);
    }
  }

  eliminar(id: number) {
    this.items.next(this.items.getValue().filter(i => i.product.id !== id));
  }

  actualizarCantidad(id: number, cantidad: number) {
    const actual = this.items.getValue();
    const item = actual.find(i => i.product.id === id);
    if (item) {
      item.cantidad = cantidad;
      this.items.next([...actual]);
    }
  }

  getTotal(): number {
    return this.items.getValue().reduce((acc, i) => acc + i.product.precio * i.cantidad, 0);
  }

  getCount(): number {
    return this.items.getValue().reduce((acc, i) => acc + i.cantidad, 0);
  }

  vaciar() {
    this.items.next([]);
  }
}