import { z } from "zod";

export const serventeSchema = z.object({
  nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres."),
  telefone: z.string().optional(),
  valorDiaria: z.coerce.number().positive("A diária deve ser maior que zero."),
  ativo: z.boolean(),
});

export type ServenteSchema = z.infer<typeof serventeSchema>;