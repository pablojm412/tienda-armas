import { Injectable } from '@angular/core';

export interface Usuario {
  nombre: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuarios = [
    { email: 'admin@saintpablo.com', password: 'admin123', nombre: 'Administrador' },
    { email: 'pablo@saintpablo.com', password: 'pablo123', nombre: 'Pablo' }
  ];

  private usuarioActual: Usuario | null = null;

  login(email: string, password: string): boolean {
    const encontrado = this.usuarios.find(
      u => u.email === email && u.password === password
    );
    if (encontrado) {
      this.usuarioActual = { nombre: encontrado.nombre, email: encontrado.email };
      return true;
    }
    return false;
  }

  logout() {
    this.usuarioActual = null;
  }

  getUsuario(): Usuario | null {
    return this.usuarioActual;
  }

  estaLogueado(): boolean {
    return this.usuarioActual !== null;
  }
}