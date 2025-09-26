export function daysBetween(startDate: Date, endDate: Date): number {
    // Convertimos todo a milisegundos
    const start = startDate.getTime();
    const end = endDate.getTime();

    // Diferencia en milisegundos
    const diffMs = end - start;

    // Convertimos a días
    const diffDays = diffMs / (1000 * 60 * 60 * 24);

    return diffDays;
}