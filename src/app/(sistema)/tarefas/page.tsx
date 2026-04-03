export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/layout/page-header";
import Link from "next/link";
import { updateTarefaStatus } from "@/actions/tarefa-actions";
import { StatusBadge } from "@/components/ui/status-badge";

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

function Column({
  title,
  items,
}: {
  title: string;
  items: {
    id: string;
    titulo: string;
    obraNome: string;
    prioridade: string;
    status: string;
  }[];
}) {
  return (
    <div className="rounded-2xl bg-slate-100 p-4">
      <h3 className="mb-4 text-lg font-semibold">{title}</h3>

      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <p className="font-medium">{item.titulo}</p>
            <p className="mt-1 text-sm text-slate-500">{item.obraNome}</p>

            <div className="mt-3 flex flex-wrap gap-2">
              <StatusBadge value={item.status} type="tarefa" />
              <StatusBadge value={item.prioridade} type="prioridade" />
            </div>

            <div className="mt-4 flex gap-2">
              {item.status !== "A_FAZER" && (
                <form action={updateTarefaStatus}>
                  <input type="hidden" name="tarefaId" value={item.id} />
                  <input type="hidden" name="status" value={prevStatus(item.status)} />
                  <input type="hidden" name="redirectTo" value="/tarefas" />
                  <button
                    type="submit"
                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm hover:bg-slate-50"
                  >
                    Voltar
                  </button>
                </form>
              )}

              {item.status !== "CONCLUIDO" && (
                <form action={updateTarefaStatus}>
                  <input type="hidden" name="tarefaId" value={item.id} />
                  <input type="hidden" name="status" value={nextStatus(item.status)} />
                  <input type="hidden" name="redirectTo" value="/tarefas" />
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

        {items.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white p-4 text-sm text-slate-500">
            Nenhuma tarefa nesta coluna.
          </div>
        )}
      </div>
    </div>
  );
}

export default async function TarefasPage() {
  const tarefas = await prisma.tarefa.findMany({
    include: { obra: true },
    orderBy: { createdAt: "desc" },
  });

  const aFazer = tarefas
    .filter((item) => item.status === "A_FAZER")
    .map((item) => ({
      id: item.id,
      titulo: item.titulo,
      obraNome: item.obra.nome,
      prioridade: item.prioridade,
      status: item.status,
    }));

  const emAndamento = tarefas
    .filter((item) => item.status === "EM_ANDAMENTO")
    .map((item) => ({
      id: item.id,
      titulo: item.titulo,
      obraNome: item.obra.nome,
      prioridade: item.prioridade,
      status: item.status,
    }));

  const concluido = tarefas
    .filter((item) => item.status === "CONCLUIDO")
    .map((item) => ({
      id: item.id,
      titulo: item.titulo,
      obraNome: item.obra.nome,
      prioridade: item.prioridade,
      status: item.status,
    }));

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <PageHeader
          title="Tarefas"
          description="Acompanhamento visual das atividades das obras."
        />
        <Link
          href="/tarefas/novo"
          className="rounded-xl bg-slate-900 px-4 py-3 text-white hover:bg-slate-800"
        >
          Nova tarefa
        </Link>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Column title="A Fazer" items={aFazer} />
        <Column title="Em Andamento" items={emAndamento} />
        <Column title="Concluído" items={concluido} />
      </div>
    </div>
  );
}