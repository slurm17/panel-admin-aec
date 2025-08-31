// export type Imagen = {
//   id: number;
//   url: string;
//   titulo?: string;
//   descripcion?: string;
//   activa: boolean;
//   orden: number | null;
// };

// export type ImagenSinId = Omit<Imagen, "id">;

// El texto nuevo no tiene id
export interface ImagenBase {
  url: string;
  titulo: string;
  descripcion: string;
  activa: boolean;
  orden: string;
}

export interface ImagenConId extends ImagenBase {
  id: number;
}

// Unión de tipos
export type Imagen = ImagenConId | ImagenBase