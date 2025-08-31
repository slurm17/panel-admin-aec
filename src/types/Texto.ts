// Texto completo con ID
// export type Texto = {
//   id: number;
//   contenido: string;
//   orden: string;
//   activo: boolean;
// };

// // Tipo para crear/actualizar sin ID
// export type TextoSinId = Omit<Texto, "id">;

// El texto nuevo no tiene id
export interface TextoBase {
  contenido: string;
  orden: string;
  activo: boolean;
}

export interface TextoConId extends TextoBase {
  id: number;
}

// Unión de tipos
export type Texto = TextoConId | TextoBase;
