// src/api/imagen.api.ts
import type { Imagen, ImagenBase, ImagenConId } from "../types/Imagen";
import { apiFetch } from "./client.fetch";

// Obtener todas las imágenes
export async function getImagenes() {
  return apiFetch<ImagenConId[]>("/imagenes");
}

// Obtener una imagen por ID
export async function getImagen(id: number) {
  return apiFetch<ImagenConId>(`/imagenes/${id}`);
}

// Crear una nueva imagen
export async function createImagen(data: ImagenBase, file: File | null) {
  const formData = new FormData();
  formData.append("file", file || '');
  formData.append("titulo", data.titulo);
  formData.append("descripcion", data.descripcion);
  formData.append("activa", String(data.activa));
  formData.append("orden", data.orden)
  return apiFetch<Imagen>("/imagenes", {
    method: "POST",
    body: formData,
  });
}

// Actualizar una imagen existente
export async function updateImagen(data: ImagenConId, file: File | null, imgUrl: string) {
  const formData = new FormData();
  formData.append("file", file || '');
  formData.append("url", imgUrl);
  formData.append("titulo", data.titulo);
  formData.append("descripcion", data.descripcion);
  formData.append("activa", String(data.activa));
  formData.append("orden", data.orden)
  return apiFetch<Imagen>(`/imagenes/${data.id}`, {
    method: "PUT",
    body: formData,
  });
}

// Eliminar una imagen
export async function deleteImagen(id: number) {
  return apiFetch<void>(`/imagenes/${id}`, {
    method: "DELETE",
  });
}
