import { z } from "zod";

export const batchSchema = z.object({
  producto: z.string().min(1, { message: "El producto es obligatorio" }),
  tipo: z.enum(["Entrada", "Salida"], { message: "Tipo inválido" }),
  cantidad: z.number().positive({ message: "La cantidad debe ser mayor a 0" }),
  tempFinal: z.number().min(100).max(300).optional(),
  nivelTueste: z.enum(["Claro", "Medio", "Medio Oscuro", "Oscuro"]).optional(),
  motivo: z.string().min(5, { message: "El motivo debe ser más descriptivo" }).optional(),
});