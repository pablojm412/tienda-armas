import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home';
import { ProductDetailComponent } from './modules/product-detail/product-detail';
import { CartComponent } from './modules/cart/cart';
import { CheckoutComponent } from './modules/checkout/checkout';
import { LoginComponent } from './modules/login/login';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'producto/:id', component: ProductDetailComponent },
  { path: 'carrito', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];