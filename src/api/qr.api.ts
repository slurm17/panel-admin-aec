import type { DatosQR } from "../types/datosQr";
import { apiFetch } from "./client.fetch";

// export async function getQr() {
//     return apiFetch<{ qr: string }>(`/qr`);
// }

export async function postQrCode(data: DatosQR) {
    return apiFetch<{ qr: string }>(`/qr`, { 
        method: 'POST', 
        body: JSON.stringify(data) 
    });
}