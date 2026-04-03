import { z } from "zod";

export const apontamentoSchema = z.object({
  obraId: z.string().min(1, "Selecione uma obra."),
  serventeId: z.string().min(1, "Selecione um servente."),
  semanaReferencia: z.string().min(1, "Informe a semana de referência."),
  diasTrabalhados: z.coerce
    .number()
    .min(1, "Informe pelo menos 1 dia.")
    .max(7, "O máximo permitido é 7 dias."),
  valorDiaria: z.coerce.number().positive("O valor da diária deve ser maior que zero."),
  observacoes: z.string().optional(),
});

export type ApontamentoSchema = z.infer<typeof apontamentoSchema>;