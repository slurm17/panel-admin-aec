import { format } from "date-fns";

// 📅 Devuelve la fecha en formato "yyyy-MM-dd"
export const formatDate = (date: Date | null): string => {
  return date ? format(date, "yyyy-MM-dd") : "";
};

// ⏰ Devuelve la hora en formato "HH:mm"
export const formatTime = (date: Date | null): string => {
  return date ? format(date, "HH:mm") : "";
};