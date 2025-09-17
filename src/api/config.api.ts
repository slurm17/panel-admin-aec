import { apiFetch } from "./client.fetch";

interface Config {
    venc_pase_hs: number,
    pase_permitidos: number,
    duracion_img_seg: number
}
export async function getConfig() {
    return apiFetch<Config>("/config");
}

export async function updateConfig(data: Config) {
    return apiFetch<Config>("/config", {
        method: "PUT",
        body: JSON.stringify(data),
    });
}