import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '' }
];