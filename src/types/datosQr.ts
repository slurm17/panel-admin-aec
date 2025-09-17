export interface DatosQR {
    codigo: string;
    tipo: string;
    documento: string;
    id_invitado?: string;
    fecha_emitido?: string;
    fecha_venc: string;
    tarea?: string
}