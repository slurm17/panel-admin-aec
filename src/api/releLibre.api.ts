import { apiFetch } from "./client.fetch";

export async function postReleLibre(puerto: string) {
    return apiFetch<{ qr: string }>(`/rele-libre`, { 
        method: 'POST', 
        body: JSON.stringify({puerto}) 
    });
}