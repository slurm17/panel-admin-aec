// src/api/user.api.ts

import { apiFetch } from "./client.fetch";

export async function getUsers() {
  return apiFetch<{ id: number; name: string }[]>("/users");
}
