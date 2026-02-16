import { z } from "zod";

export const orderSchema = z.object({
  // Validamos que el cliente sea un string no vacío
  cliente: z
    .string()
    .min(1, { message: "El nombre del cliente es obligatorio" }),

  // Validamos el total como número positivo
  total: z
    .number({ invalid_type_error: "El total debe ser un número" })
    .nonnegative({ message: "El total no puede ser negativo" }),

  // Método de pago opcional o string
  metodoPago: z
    .string()
    .optional()
    .or(z.literal("")),

  // Array de items (la parte que agregaste)
  items: z
    .array(
      z.object({
        productoId: z
          .string()
          .min(1, { message: "El ID del producto es requerido" }),
        cantidad: z
          .number({ invalid_type_error: "La cantidad debe ser un número" })
          .int({ message: "La cantidad debe ser un número entero" })
          .positive({ message: "La cantidad debe ser mayor a 0" }),
      })
    )
    .min(1, { message: "La orden debe tener al menos un producto" }),

  // Estado basado en tu enum de Mongoose
  estado: z
    .enum(['Pendiente', 'Pagado', 'Enviado', 'Entregado'], {
      errorMap: () => ({ message: "Estado de orden no válido" }),
    })
    .default('Pendiente'),
});