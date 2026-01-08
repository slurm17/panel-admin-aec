// El texto nuevo no tiene id
export interface ImpresoraBase {
  nombre: string;
  ip: string;
  puerto: string;
}

export interface ImpresoraConId extends ImpresoraBase {
  id: number;
}

// Unión de tipos
export type Impresora = ImpresoraConId | ImpresoraBase;
