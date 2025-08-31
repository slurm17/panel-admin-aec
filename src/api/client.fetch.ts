// src/api/client.fetch.ts
export const API_URL = import.meta.env.VITE_API_URL

export async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const headers: HeadersInit = {};

  // 👉 Solo agrego JSON si el body no es FormData
  if (!(options?.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      ...headers,
      ...options?.headers, // dejo que el caller pueda sobreescribir si quiere
    },
  });
  
  // const response = await fetch(`${API_URL}${endpoint}`, {
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   ...options,
  // });

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  // 👇 si es DELETE y no hay contenido, corto acá
  if (options?.method === "DELETE" || response.status === 204) {
    return undefined as unknown as T; // tipo "fake", no se usa nunca
  }

  return response.json() as Promise<T>;
}
