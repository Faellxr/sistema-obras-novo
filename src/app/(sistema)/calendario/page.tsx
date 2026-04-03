import { PageHeader } from "@/components/layout/page-header";
import { prisma } from "@/lib/prisma";
import { CalendarView } from "@/components/calendario/calendar-view";

export default async function CalendarioPage() {
  const obras = await prisma.obra.findMany({
    where: {
      prazoFinal: {
        not: null,
      },
    },
    select: {
      id: true,
      nome: true,
      cliente: true,
      prazoFinal: true,
    },
    orderBy: {
      prazoFinal: "asc",
    },
  });

  const tarefas = await prisma.tarefa.findMany({
    where: {
      dataLimite: {
        not: null,
      },
    },
    include: {
      obra: {
        select: {
          nome: true,
        },
      },
    },
    orderBy: {
      dataLimite: "asc",
    },
  });

  const events = [
    ...obras
      .filter((obra) => obra.prazoFinal)
      .map((obra) => ({
        id: `obra-${obra.id}`,
        title: obra.nome,
        date: obra.prazoFinal!.toISOString(),
        type: "obra" as const,
        subtitle: obra.cliente ? `Cliente: ${obra.cliente}` : "Prazo final da obra",
      })),

    ...tarefas
      .filter((tarefa) => tarefa.dataLimite)
      .map((tarefa) => ({
        id: `tarefa-${tarefa.id}`,
        title: tarefa.titulo,
        date: tarefa.dataLimite!.toISOString(),
        type: "tarefa" as const,
        subtitle: `Obra: ${tarefa.obra.nome}`,
      })),
  ];

  return (
    <div>
      <PageHeader
        title="Calendário"
        description="Acompanhe os prazos das obras e tarefas em uma visualização mensal."
      />

      <CalendarView events={events} />
    </div>
  );
}