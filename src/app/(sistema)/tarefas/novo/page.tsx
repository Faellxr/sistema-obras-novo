import { PageHeader } from "@/components/layout/page-header";
import { createTarefa } from "@/actions/tarefa-actions";
import { prisma } from "@/lib/prisma";
import { BackButton } from "@/components/layout/back-button";

export default async function NovaTarefaPage() {
  const obras = await prisma.obra.findMany({
    where: { status: { in: ["ATIVA", "PAUSADA"] } },
    orderBy: { nome: "asc" },
  });

  return (
    <div className="max-w-3xl">
      <div className="mb-6 flex items-center justify-between gap-4">
        <PageHeader
          title="Nova tarefa"
          description="Cadastre uma tarefa vinculada a uma obra."
        />
        <BackButton fallbackHref="/tarefas" />
      </div>

      <form
        action={createTarefa}
        className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium">Obra</label>
            <select
              name="obraId"
              required
              defaultValue=""
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none"
            >
              <option value="" disabled>
                Selecione uma obra
              </option>
              {obras.map((obra) => (
                <option key={obra.id} value={obra.id}>
                  {obra.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium">Título</label>
            <input
              name="titulo"
              type="text"
              required
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none"
              placeholder="Ex.: Finalizar laje"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Status</label>
            <select
              name="status"
              defaultValue="A_FAZER"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none"
            >
              <option value="A_FAZER">A Fazer</option>
              <option value="EM_ANDAMENTO">Em Andamento</option>
              <option value="CONCLUIDO">Concluído</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Prioridade</label>
            <select
              name="prioridade"
              defaultValue="MEDIA"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none"
            >
              <option value="BAIXA">Baixa</option>
              <option value="MEDIA">Média</option>
              <option value="ALTA">Alta</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Responsável</label>
            <input
              name="responsavel"
              type="text"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none"
              placeholder="Nome do responsável"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Data limite</label>
            <input
              name="dataLimite"
              type="date"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium">Descrição</label>
            <textarea
              name="descricao"
              rows={4}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none"
              placeholder="Descrição da tarefa"
            />
          </div>
        </div>

        <button
          type="submit"
          className="rounded-xl bg-slate-900 px-5 py-3 font-medium text-white hover:bg-slate-800"
        >
          Salvar tarefa
        </button>
      </form>
    </div>
  );
}