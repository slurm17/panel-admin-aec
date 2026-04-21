import { apiFetch } from "./client.fetch";

interface Carnet {
    bloqueo: boolean,
    minutos: number,
}
export async function getCarnet() {
    return apiFetch<Carnet>("/carnet");
}

export async function updateCarnet(data: Carnet) {
    return apiFetch<Carnet>("/carnet", {
        method: "PUT",
        body: JSON.stringify(data),
    });
}