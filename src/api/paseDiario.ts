// import { DataPaseDiario } from types/dataPaseDiario";
import type { DataPaseDiario } from "../types/dataPaseDiario";
import { apiFetch } from "./client.fetch";


export async function imprimir(data: DataPaseDiario) {
  return apiFetch<DataPaseDiario>("/imprimir", {
    method: "POST",
    body: JSON.stringify(data),
  });
}