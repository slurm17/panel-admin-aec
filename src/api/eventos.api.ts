import { apiFetch } from "./client.fetch";
export interface Evento {
    nro_socio: number;
    documento: string;
    nom_y_ap: string;
    tipo: string;
    tipo_pase: string;
    fecha_hora: string;
    mensaje: string;
}

type EventoQueryParams = {
  identificador?: string;
  tipo_pase?: string;
  tipo?: string;
  nom_y_ap?: string;
  fecha_inicio?: string;
  fecha_fin?: string;
  hora_inicio?: string;
  hora_fin?: string;
  offset?: number;
};
// const query = `?
// identificador=
// &tipo_pase=
// &tipo=
// &nom_y_ap=
// &fecha_inicio=
// &fecha_fin=
// &hora_inicio=
// &hora_fin=
// &offset=0
// `
export async function getEvento(params: EventoQueryParams = {}) {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
        query.append(key, String(value));
    }
    });
    const queryString = query.toString() ? `?${query.toString()}` : "";
    return apiFetch<Evento[]>(`/eventos${queryString}`);
}