import { apiFetch } from "./client.fetch";

export async function postRele(puerto: string) {
    return apiFetch<{ qr: string }>(`/rele`, { 
        method: 'POST', 
        body: JSON.stringify({puerto}) 
    });
}