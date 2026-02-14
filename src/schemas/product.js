import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .min(3, { message: "El nombre debe tener al menos 3 caracteres" })
    .max(50, { message: "El nombre no puede exceder los 50 caracteres" }),
  
  description: z
    .string()
    .min(10, { message: "La descripción debe ser más detallada (min. 10 caracteres)" })
    .optional(),

  price: z
    .number({ invalid_type_error: "El precio debe ser un número" })
    .positive({ message: "El precio debe ser mayor a 0" }),

  stock: z
    .number({ invalid_type_error: "El stock debe ser un número" })
    .int({ message: "El stock debe ser un número entero" })
    .nonnegative({ message: "El stock no puede ser negativo" }),

  category: z
    .string()
    .min(1, { message: "Debes seleccionar una categoría" }),

  image: z
    .string()
    .url({ message: "Debe ser una URL de imagen válida" })
    .optional()
    .or(z.literal("")), // Permite string vacío si no hay imagen
});