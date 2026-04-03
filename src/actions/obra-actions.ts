"use server";

import { prisma } from "@/lib/prisma";
import { obraSchema } from "@/lib/validations/obra-schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createObra(formData: FormData) {
  const parsed = obraSchema.safeParse({
    nome: formData.get("nome"),
    cliente: formData.get("cliente") || undefined,
    endereco: formData.get("endereco") || undefined,
    descricao: formData.get("descricao") || undefined,
    status: formData.get("status"),
    dataInicio: formData.get("dataInicio") || undefined,
    prazoFinal: formData.get("prazoFinal") || undefined,
    custoEstimado: formData.get("custoEstimado") || 0,
  });

  if (!parsed.success) {
    throw new Error("Dados da obra inválidos.");
  }

  const data = parsed.data;

  await prisma.obra.create({
    data: {
      nome: data.nome,
      cliente: data.cliente,
      endereco: data.endereco,
      descricao: data.descricao,
      status: data.status,
      dataInicio: data.dataInicio ? new Date(data.dataInicio) : null,
      prazoFinal: data.prazoFinal ? new Date(data.prazoFinal) : null,
      custoEstimado: data.custoEstimado,
    },
  });

  revalidatePath("/obras");
  revalidatePath("/dashboard");
  redirect("/obras");
}

export async function updateObra(formData: FormData) {
  const id = String(formData.get("id"));

  const parsed = obraSchema.safeParse({
    nome: formData.get("nome"),
    cliente: formData.get("cliente") || undefined,
    endereco: formData.get("endereco") || undefined,
    descricao: formData.get("descricao") || undefined,
    status: formData.get("status"),
    dataInicio: formData.get("dataInicio") || undefined,
    prazoFinal: formData.get("prazoFinal") || undefined,
    custoEstimado: formData.get("custoEstimado") || 0,
  });

  if (!parsed.success) {
    throw new Error("Dados da obra inválidos.");
  }

  const data = parsed.data;

  await prisma.obra.update({
    where: { id },
    data: {
      nome: data.nome,
      cliente: data.cliente,
      endereco: data.endereco,
      descricao: data.descricao,
      status: data.status,
      dataInicio: data.dataInicio ? new Date(data.dataInicio) : null,
      prazoFinal: data.prazoFinal ? new Date(data.prazoFinal) : null,
      custoEstimado: data.custoEstimado,
    },
  });

  revalidatePath("/obras");
  revalidatePath(`/obras/${id}`);
  redirect(`/obras/${id}`);
}

export async function deleteObra(formData: FormData) {
  const id = String(formData.get("id"));

  await prisma.obra.delete({
    where: { id },
  });

  revalidatePath("/obras");
  revalidatePath("/dashboard");
  redirect("/obras");
}