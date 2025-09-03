import type { SocioAccess } from "../types/socioAccess";
import { apiFetch } from "./client.fetch";

export async function getSocioLocal(dni: string) {
    return apiFetch<{ dni: string; name: string }>(`/socios/${dni}`);
}

export async function getSocioAccess(dni: string) {
    return apiFetch<SocioAccess>(`/socios/access/${dni}`);
}
