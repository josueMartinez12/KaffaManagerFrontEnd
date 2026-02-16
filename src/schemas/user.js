import { z } from "zod";

export const userSchema = z.object({
  nombre: z.string().min(3, { message: "Nombre obligatorio" }),
  email: z.string().email({ message: "Correo inválido" }),
  password: z.string().min(6, { message: "Mínimo 6 caracteres" }),
  role: z.enum(["ADMIN_ROLE", "VENDEDOR_ROLE", "BODEGUERO_ROLE"], {
    errorMap: () => ({ message: "Selecciona un rol válido" })
  }),
});