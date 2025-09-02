// Hora HH:mm usando el offset de OpenWeather (en segundos)
export const formatLocalTime = (dt: number, timezone: number) => {
    const d = new Date((dt + timezone) * 1000); // shift a la hora local de la ciudad
    // Leemos en UTC para NO aplicar tu TZ otra vez
    const hh = String(d.getUTCHours()).padStart(2, "0");
    const mm = String(d.getUTCMinutes()).padStart(2, "0");
    return `${hh}:${mm}`;
};

// Fecha DD/MM/YYYY usando el offset
export const formatLocalDate = (dt: number, timezone: number) => {
    const d = new Date((dt + timezone) * 1000);
    const day = String(d.getUTCDate()).padStart(2, "0");
    const month = String(d.getUTCMonth() + 1).padStart(2, "0");
    const year = d.getUTCFullYear();
    return `${day}/${month}/${year}`;
};