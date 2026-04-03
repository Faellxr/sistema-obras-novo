import { prisma } from "@/lib/prisma";

export async function getDashboardData() {
  const obrasAtivas = await prisma.obra.count({
    where: { status: "ATIVA" },
  });

  const obrasFinalizadas = await prisma.obra.count({
    where: { status: "FINALIZADA" },
  });

  const serventesAtivos = await prisma.servente.count({
    where: { ativo: true },
  });

  const apontamentos = await prisma.apontamento.findMany({
    include: {
      obra: true,
    },
  });

  const total = apontamentos.reduce((acc, item) => {
    return acc + Number(item.custoTotal);
  }, 0);

  const custoPorObraMap = new Map<string, number>();

  for (const item of apontamentos) {
    const atual = custoPorObraMap.get(item.obra.nome) || 0;
    custoPorObraMap.set(item.obra.nome, atual + Number(item.custoTotal));
  }

  const custoPorObra = Array.from(custoPorObraMap.entries()).map(([nome, custo]) => ({
    nome,
    custo,
  }));

  const tarefas = await prisma.tarefa.findMany();

  const tarefasPorStatus = [
    {
      name: "A Fazer",
      value: tarefas.filter((item) => item.status === "A_FAZER").length,
    },
    {
      name: "Em Andamento",
      value: tarefas.filter((item) => item.status === "EM_ANDAMENTO").length,
    },
    {
      name: "Concluído",
      value: tarefas.filter((item) => item.status === "CONCLUIDO").length,
    },
  ];

  return {
    obrasAtivas,
    obrasFinalizadas,
    serventesAtivos,
    custoTotal: total,
    custoPorObra,
    tarefasPorStatus,
  };
}