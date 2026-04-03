export const dynamic = "force-dynamic";

import { PageHeader } from "@/components/layout/page-header";
import { createApontamento } from "@/actions/apontamento-actions";
import { prisma } from "@/lib/prisma";
import { ApontamentoForm } from "@/components/apontamentos/apontamento-form";
import { BackButton } from "@/components/layout/back-button";

export default async function NovoApontamentoPage() {
  const obras = await prisma.obra.findMany({
    where: { status: { in: ["ATIVA", "PAUSADA"] } },
    orderBy: { nome: "asc" },
  });

  const serventes = await prisma.servente.findMany({
    where: { ativo: true },
    orderBy: { nome: "asc" },
  });

  return (
    <div className="max-w-3xl">
      <div className="mb-6 flex items-center justify-between gap-4">
        <PageHeader
          title="Novo apontamento"
          description="Registre dias trabalhados por servente em uma obra."
        />
        <BackButton fallbackHref="/apontamentos" />
      </div>

      <ApontamentoForm
        action={createApontamento}
        obras={obras.map((obra) => ({
          id: obra.id,
          nome: obra.nome,
        }))}
        serventes={serventes.map((servente) => ({
          id: servente.id,
          nome: servente.nome,
          valorDiaria: Number(servente.valorDiaria),
        }))}
      />
    </div>
  );
}