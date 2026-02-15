import api from "../api/axiosInstance";

// Obtener stock actual de productos (La ruta base GET /)
export const getCurrentStock = async () => {
    const res = await api.get("/inventory"); 
    return res.data;
};

// Ajustar stock (Según tu controlador es una lógica interna, pero la ruta POST /move existe)
export const adjustStock = async (data) => {
    // Aquí usamos /move porque es lo que definiste en tu archivo de rutas
    const res = await api.post("/inventory/move", data);
    return res.data;
};

// Alertas de stock bajo
export const getLowStockAlerts = async () => {
    // Si no has creado esta ruta aún en el backend, dará 404. 
    // Por ahora, si falla, retornamos un array vacío.
    try {
        const res = await api.get("/inventory/alerts");
        return res.data;
    } catch (e) {
        return { alertas: [] };
    }
};