export interface DataPaseDiario {
  nombre: string;
  apellido?: string;
  dni: string;
  codigo: string;
  fechaVencimiento: string;
  fechaEmision: string;
}

export interface DataPaseMantenimiento {
  nombre: string;
  apellido: string;
  dni: string;
  tarea: string;
}