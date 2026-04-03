"use server";

import { prisma } from "@/lib/prisma";
import { apontamentoSchema } from "@/lib/validations/apontamento-schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createApontamento(formData: FormData) {
  const parsed = apontamentoSchema.safeParse({
    obraId: formData.get("obraId"),
    serventeId: formData.get("serventeId"),
    semanaReferencia: formData.get("semanaReferencia"),
    diasTrabalhados: formData.get("diasTrabalhados"),
    valorDiaria: formData.get("valorDiaria"),
    observacoes: formData.get("observacoes") || undefined,
  });

  if (!parsed.success) {
    throw new Error("Dados do apontamento inválidos.");
  }

  const data = parsed.data;
  const custoTotal = data.diasTrabalhados * data.valorDiaria;

  await prisma.apontamento.create({
    data: {
      obraId: data.obraId,
      serventeId: data.serventeId,
      semanaReferencia: new Date(data.semanaReferencia),
      diasTrabalhados: data.diasTrabalhados,
      valorDiaria: data.valorDiaria,
      custoTotal,
      observacoes: data.observacoes,
    },
  });

  revalidatePath("/apontamentos");
  revalidatePath("/dashboard");
  redirect("/apontamentos");
}