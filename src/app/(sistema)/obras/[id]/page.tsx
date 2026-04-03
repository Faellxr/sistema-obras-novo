import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/layout/page-header";
import { formatCurrency, formatDate } from "@/lib/utils";
import { notFound } from "next/navigation";
import Link from "next/link";
import { updateTarefaStatus } from "@/actions/tarefa-actions";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

function nextStatus(status: string) {
  if (status === "A_FAZER") return "EM_ANDAMENTO";
  if (status === "EM_ANDAMENTO") return "CONCLUIDO";
  return "CONCLUIDO";
}

function prevStatus(status: string) {
  if (status === "CONCLUIDO") return "EM_ANDAMENTO";
  if (status === "EM_ANDAMENTO") return "A_FAZER";
  return "A_FAZER";
}

export default async function ObraDetalhePage({ params }: PageProps) {
  const { id } = await params;

  const obra = await prisma.obra.findUnique({
    where: { id },
    include: {
      tarefas: {
        orderBy: { createdAt: "desc" },
      },
      apontamentos: {
        include: {
          servente: true,
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!obra) {
    notFound();
  }

  const custoTotal = obra.apontamentos.reduce((acc, item) => {
    return acc + Number(item.custoTotal);
  }, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <PageHeader
          title={obra.nome}
          description="Detalhes da obra, custos, tarefas e apontamentos."
        />

        <div className="flex gap-2">
          <Link
            href={`/obras/${obra.id}/editar`}
            className="rounded-xl border border-slate-300 px-4 py-3 text-slate-700 hover:bg-slate-50"
          >
            Editar obra
          </Link>

          <Link
            href="/tarefas/novo"
            className="rounded-xl bg-slate-900 px-4 py-3 text-white hover:bg-slate-800"
          >
            Nova tarefa
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Cliente</p>
          <h3 className="mt-2 text-lg font-semibold">{obra.cliente || "-"}</h3>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Status</p>
          <h3 className="mt-2 text-lg font-semibold">{obra.status}</h3>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Prazo final</p>
          <h3 className="mt-2 text-lg font-semibold">
            {obra.prazoFinal ? formatDate(obra.prazoFinal) : "-"}
          </h3>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Custo acumulado</p>
          <h3 className="mt-2 text-lg font-semibold">
            {formatCurrency(custoTotal)}
          </h3>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-xl font-semibold">Descrição</h3>
        <p className="mt-2 text-slate-600">{obra.descricao || "Sem descrição."}</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-xl font-semibold">Tarefas da obra</h3>

          <div className="space-y-3">
            {obra.tarefas.map((tarefa) => (
              <div
                key={tarefa.id}
                className="rounded-xl border border-slate-200 p-4"
              >
                <p className="font-medium">{tarefa.titulo}</p>
                <p className="mt-1 text-sm text-slate-500">
                  Status: {tarefa.status} | Prioridade: {tarefa.prioridade}
                </p>

                <div className="mt-3 flex gap-2">
                  {tarefa.status !== "A_FAZER" && (
                    <form action={updateTarefaStatus}>
                      <input type="hidden" name="tarefaId" value={tarefa.id} />
                      <input type="hidden" name="status" value={prevStatus(tarefa.status)} />
                      <input type="hidden" name="redirectTo" value={`/obras/${obra.id}`} />
                      <button
                        type="submit"
                        className="rounded-lg border border-slate-300 px-3 py-2 text-sm hover:bg-slate-50"
                      >
                        Voltar
                      </button>
                    </form>
                  )}

                  {tarefa.status !== "CONCLUIDO" && (
                    <form action={updateTarefaStatus}>
                      <input type="hidden" name="tarefaId" value={tarefa.id} />
                      <input type="hidden" name="status" value={nextStatus(tarefa.status)} />
                      <input type="hidden" name="redirectTo" value={`/obras/${obra.id}`} />
                      <button
                        type="submit"
                        className="rounded-lg bg-slate-900 px-3 py-2 text-sm text-white hover:bg-slate-800"
                      >
                        Avançar
                      </button>
                    </form>
                  )}
                </div>
              </div>
            ))}

            {obra.tarefas.length === 0 && (
              <p className="text-sm text-slate-500">Nenhuma tarefa cadastrada.</p>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-xl font-semibold">Apontamentos da obra</h3>

          <div className="space-y-3">
            {obra.apontamentos.map((apontamento) => (
              <div
                key={apontamento.id}
                className="rounded-xl border border-slate-200 p-4"
              >
                <p className="font-medium">{apontamento.servente.nome}</p>
                <p className="mt-1 text-sm text-slate-500">
                  {apontamento.diasTrabalhados} dia(s) |{" "}
                  {formatCurrency(Number(apontamento.custoTotal))}
                </p>
              </div>
            ))}

            {obra.apontamentos.length === 0 && (
              <p className="text-sm text-slate-500">
                Nenhum apontamento cadastrado.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}