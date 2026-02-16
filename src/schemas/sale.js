import { z } from "zod";

export const saleSchema = z.object({
  cliente: z.string().min(1, { message: "El ID del cliente es obligatorio" }),
  numeroFactura: z.string().min(1, { message: "El número de factura es obligatorio" }),
  items: z.array(z.object({
    productoId: z.string().min(1, { message: "ID de producto requerido" }),
    nombre: z.string(),
    cantidad: z.number().int().positive({ message: "La cantidad debe ser mayor a 0" }),
    precio: z.number().positive({ message: "El precio debe ser mayor a 0" }),
  })).min(1, { message: "Debe haber al menos un producto" }),
  total: z.number().nonnegative(),
  metodoPago: z.enum(["Efectivo", "Tarjeta", "Transferencia"]),
  tipo: z.string().default("Venta") // Campo que pedía tu backend
});