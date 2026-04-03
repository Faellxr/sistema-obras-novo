"use server";

import { prisma } from "@/lib/prisma";
import { tarefaSchema } from "@/lib/validations/tarefa-schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createTarefa(formData: FormData) {
  const parsed = tarefaSchema.safeParse({
    obraId: formData.get("obraId"),
    titulo: formData.get("titulo"),
    descricao: formData.get("descricao") || undefined,
    status: formData.get("status"),
    prioridade: formData.get("prioridade"),
    responsavel: formData.get("responsavel") || undefined,
    dataLimite: formData.get("dataLimite") || undefined,
  });

  if (!parsed.success) {
    throw new Error("Dados da tarefa inválidos.");
  }

  const data = parsed.data;

  await prisma.tarefa.create({
    data: {
      obraId: data.obraId,
      titulo: data.titulo,
      descricao: data.descricao,
      status: data.status,
      prioridade: data.prioridade,
      responsavel: data.responsavel,
      dataLimite: data.dataLimite ? new Date(data.dataLimite) : null,
    },
  });

  revalidatePath("/tarefas");
  revalidatePath("/dashboard");
  revalidatePath(`/obras/${data.obraId}`);
  redirect("/tarefas");
}

export async function updateTarefaStatus(formData: FormData) {
  const tarefaId = String(formData.get("tarefaId"));
  const status = String(formData.get("status"));
  const redirectTo = String(formData.get("redirectTo") || "/tarefas");

  await prisma.tarefa.update({
    where: { id: tarefaId },
    data: {
      status: status as "A_FAZER" | "EM_ANDAMENTO" | "CONCLUIDO",
    },
  });

  revalidatePath("/tarefas");
  revalidatePath("/dashboard");
  revalidatePath(redirectTo);

  redirect(redirectTo);
}