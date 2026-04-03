"use server";

import { prisma } from "@/lib/prisma";
import { serventeSchema } from "@/lib/validations/servente-schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createServente(formData: FormData) {
  const parsed = serventeSchema.safeParse({
    nome: formData.get("nome"),
    telefone: formData.get("telefone") || undefined,
    valorDiaria: formData.get("valorDiaria"),
    ativo: formData.get("ativo") === "true",
  });

  if (!parsed.success) {
    throw new Error("Dados do servente inválidos.");
  }

  const data = parsed.data;

  await prisma.servente.create({
    data: {
      nome: data.nome,
      telefone: data.telefone,
      valorDiaria: data.valorDiaria,
      ativo: data.ativo,
    },
  });

  revalidatePath("/serventes");
  redirect("/serventes");
}

export async function updateServente(formData: FormData) {
  const id = String(formData.get("id"));

  const parsed = serventeSchema.safeParse({
    nome: formData.get("nome"),
    telefone: formData.get("telefone") || undefined,
    valorDiaria: formData.get("valorDiaria"),
    ativo: formData.get("ativo") === "true",
  });

  if (!parsed.success) {
    throw new Error("Dados do servente inválidos.");
  }

  const data = parsed.data;

  await prisma.servente.update({
    where: { id },
    data: {
      nome: data.nome,
      telefone: data.telefone,
      valorDiaria: data.valorDiaria,
      ativo: data.ativo,
    },
  });

  revalidatePath("/serventes");
  redirect("/serventes");
}

export async function deleteServente(formData: FormData) {
  const id = String(formData.get("id"));

  await prisma.servente.delete({
    where: { id },
  });

  revalidatePath("/serventes");
  revalidatePath("/dashboard");
  redirect("/serventes");
}