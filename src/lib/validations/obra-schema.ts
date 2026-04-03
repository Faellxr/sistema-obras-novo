import { z } from "zod";

export const obraSchema = z.object({
  nome: z.string().min(3, "O nome da obra deve ter pelo menos 3 caracteres."),
  cliente: z.string().optional(),
  endereco: z.string().optional(),
  descricao: z.string().optional(),
  status: z.enum(["ATIVA", "PAUSADA", "FINALIZADA"]),
  dataInicio: z.string().optional(),
  prazoFinal: z.string().optional(),
  custoEstimado: z.coerce
    .number()
    .min(0, "O custo estimado deve ser maior ou igual a zero."),
});

export type ObraSchema = z.infer<typeof obraSchema>;