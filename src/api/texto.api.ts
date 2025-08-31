import type { Texto, TextoBase, TextoConId } from "../types/Texto";
import { apiFetch } from "./client.fetch";

// Obtener todos los textos
export async function getTextos() {
  return apiFetch<TextoConId[]>("/textos");
}

// Obtener un texto por ID
export async function getTexto(id: number) {
  return apiFetch<Texto>(`/textos/${id}`);
}

// Crear un nuevo texto
export async function createTexto(data: TextoBase) {
  return apiFetch<Texto>("/textos", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// Actualizar un texto existente
export async function updateTexto(id: number, data: TextoBase) {
  return apiFetch<Texto>(`/textos/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

// Eliminar un texto
export async function deleteTexto(id: number) {
  return apiFetch<void>(`/textos/${id}`, {
    method: "DELETE",
  });
}
