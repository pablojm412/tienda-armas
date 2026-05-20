import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home';
import { ProductDetailComponent } from './modules/product-detail/product-detail';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'producto/:id', component: ProductDetailComponent },
  { path: '**', redirectTo: '' }
];