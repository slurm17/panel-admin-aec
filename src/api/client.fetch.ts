// src/api/client.fetch.ts
export const API_URL = import.meta.env.VITE_API_URL
export interface ApiError {
  status: number;
  message: string;
}
export async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const headers: HeadersInit = {};

  // 👉 Solo agrego JSON si el body no es FormData
  if (!(options?.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        ...headers,
        ...options?.headers, // dejo que el caller pueda sobreescribir si quiere
      },
    });

    if (!response.ok) {
      // Intentamos parsear el body como JSON para extraer el error del back
      let message = "Error inesperado en el servidor";
      try {
        const errorData = await response.json();
        message = errorData.error || errorData.message || message;
      } catch {
        // Si no es JSON válido, dejamos el mensaje genérico
      }
      const error: ApiError = { status: response.status, message };
      throw error;
    }

    // 👇 si es DELETE y no hay contenido, corto acá
    if (options?.method === "DELETE" || response.status === 204) {
      return undefined as unknown as T; // tipo "fake", no se usa nunca
    }

    return response.json() as Promise<T>;
  } catch (err) {
      // Caso: error estándar de JS
    if (err instanceof Error) {
      throw { status: 0, message: err.message } as ApiError;
    }
    // Caso: error que ya venía con estructura ApiError
    throw err as ApiError;
  }
}
