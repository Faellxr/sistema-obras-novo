import { z } from "zod";

export const tarefaSchema = z.object({
  obraId: z.string().min(1, "Selecione uma obra."),
  titulo: z.string().min(3, "O título deve ter pelo menos 3 caracteres."),
  descricao: z.string().optional(),
  status: z.enum(["A_FAZER", "EM_ANDAMENTO", "CONCLUIDO"]),
  prioridade: z.enum(["BAIXA", "MEDIA", "ALTA"]),
  responsavel: z.string().optional(),
  dataLimite: z.string().optional(),
});

export type TarefaSchema = z.infer<typeof tarefaSchema>;