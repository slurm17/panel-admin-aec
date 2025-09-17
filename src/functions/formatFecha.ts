import { format, set, addDays } from "date-fns";

interface Params {
  fecha?: Date; // fecha base (default: new Date())
  hours?: number;
  minutes?: number;
}

export const formatFecha = {
  /**
   * Devuelve un string en formato ISO-like local (yyyy-MM-dd'T'HH:mm')
   */
  string: ({ fecha = new Date(), hours, minutes }: Params): string => {
    const fechaAjustada =
      hours !== undefined || minutes !== undefined
        ? set(fecha, { hours, minutes, seconds: 0, milliseconds: 0 })
        : set(fecha, { seconds: 0, milliseconds: 0 });

    return format(fechaAjustada, "yyyy-MM-dd'T'HH:mm");
  },

  /**
   * Devuelve un objeto Date ajustado
   */
  date: ({ fecha = new Date(), hours, minutes }: Params): Date => {
    return hours !== undefined || minutes !== undefined
      ? set(fecha, { hours, minutes, seconds: 0, milliseconds: 0 })
      : set(fecha, { seconds: 0, milliseconds: 0 });
  },

  // -------------------------------
  // Shortcuts de uso frecuente
  // -------------------------------

  /**
   * String al final del día (23:59)
   */
  finDelDiaString: (fecha: Date = new Date()): string =>
    format(set(fecha, { hours: 23, minutes: 59, seconds: 0, milliseconds: 0 }), "yyyy-MM-dd'T'HH:mm"),

  /**
   * Date al final del día (23:59)
   */
  finDelDiaDate: (fecha: Date = new Date()): Date =>
    set(fecha, { hours: 23, minutes: 59, seconds: 0, milliseconds: 0 }),

  /**
   * String al comienzo del día siguiente (00:00)
   */
  comienzoDiaSiguienteString: (fecha: Date = new Date()): string =>
    format(set(addDays(fecha, 1), { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }), "yyyy-MM-dd'T'HH:mm"),

  /**
   * Date al comienzo del día siguiente (00:00)
   */
  comienzoDiaSiguienteDate: (fecha: Date = new Date()): Date =>
    set(addDays(fecha, 1), { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }),
};
