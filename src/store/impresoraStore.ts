import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ImpresoraConId } from "../types/Impresora";

type ImpresoraState = {
  impresoraActiva: ImpresoraConId | null;
  setImpresoraActiva: (impresora: ImpresoraConId | null) => void;
};

export const useImpresoraStore = create<ImpresoraState>()(
  persist(
    (set) => ({
      impresoraActiva: null,
      setImpresoraActiva: (impresora) => set({ impresoraActiva: impresora }),
    }),
    {
      name: "impresora-activa", // se guarda solo el id
    }
  )
);
