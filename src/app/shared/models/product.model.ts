export interface Product {
  id: number;
  nombre: string;
  categoria: 'Cortas' | 'Largas' | 'Munición' | 'Ópticas' | 'Cuchillería';
  precio: number;
  stock: number;
  imagen: string;
  imagenes?: string[];
  descripcion: string;
  especificaciones: {
    calibre?: string;
    peso?: string;
    sistemaDisparo?: string;
    longitud?: string;
    capacidad?: string;
    material?: string;
  };
  envioGratis: boolean;
  condicion: 'Nuevo' | 'Usado';
  vendidos?: number;
}