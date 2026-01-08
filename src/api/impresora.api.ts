import type { Impresora, ImpresoraBase, ImpresoraConId } from "../types/Impresora";
import { apiFetch } from "./client.fetch";

// Obtener todos los impresoras
export async function getImpresoras() {
  return apiFetch<ImpresoraConId[]>("/impresoras");
}

// Obtener un Impresora por ID
export async function getImpresora(id: number) {
  return apiFetch<Impresora>(`/impresoras/${id}`);
}

// Crear un nuevo Impresora
export async function createImpresora(data: ImpresoraBase) {
  return apiFetch<Impresora>("/impresoras", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// Actualizar un Impresora existente
export async function updateImpresora(id: number, data: ImpresoraBase) {
  return apiFetch<Impresora>(`/impresoras/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

// Eliminar un Impresora
export async function deleteImpresora(id: number) {
  return apiFetch<void>(`/impresoras/${id}`, {
    method: "DELETE",
  });
}
