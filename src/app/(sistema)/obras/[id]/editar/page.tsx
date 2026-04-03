import { deleteObra, updateObra } from "@/actions/obra-actions";
import { PageHeader } from "@/components/layout/page-header";
import { BackButton } from "@/components/layout/back-button";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { DeleteButton } from "@/components/ui/delete-button";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

function formatInputDate(date: Date | null) {
  if (!date) return "";
  return new Date(date).toISOString().split("T")[0];
}

export default async function EditarObraPage({ params }: PageProps) {
  const { id } = await params;

  const obra = await prisma.obra.findUnique({
    where: { id },
  });

  if (!obra) notFound();

  return (
    <div className="max-w-3xl">
      <div className="mb-6 flex items-center justify-between gap-4">
        <PageHeader
          title="Editar obra"
          description="Atualize os dados da obra."
        />
        <BackButton fallbackHref={`/obras/${obra.id}`} />
      </div>

      <form action={updateObra} className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <input type="hidden" name="id" value={obra.id} />

        <div className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium">Nome da obra</label>
            <input
              name="nome"
              type="text"
              defaultValue={obra.nome}
              required
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Cliente</label>
            <input
              name="cliente"
              type="text"
              defaultValue={obra.cliente ?? ""}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Status</label>
            <select
              name="status"
              defaultValue={obra.status}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none"
            >
              <option value="ATIVA">Ativa</option>
              <option value="PAUSADA">Pausada</option>
              <option value="FINALIZADA">Finalizada</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium">Endereço</label>
            <input
              name="endereco"
              type="text"
              defaultValue={obra.endereco ?? ""}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Data de início</label>
            <input
              name="dataInicio"
              type="date"
              defaultValue={formatInputDate(obra.dataInicio)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Prazo final</label>
            <input
              name="prazoFinal"
              type="date"
              defaultValue={formatInputDate(obra.prazoFinal)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Custo estimado</label>
            <input
              name="custoEstimado"
              type="number"
              step="0.01"
              min="0"
              defaultValue={Number(obra.custoEstimado ?? 0)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium">Descrição</label>
            <textarea
              name="descricao"
              rows={4}
              defaultValue={obra.descricao ?? ""}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            className="rounded-xl bg-slate-900 px-5 py-3 font-medium text-white hover:bg-slate-800"
          >
            Salvar alterações
          </button>
        </div>
      </form>

      <form action={deleteObra} className="mt-4">
        <input type="hidden" name="id" value={obra.id} />
        <DeleteButton confirmMessage="Tem certeza que deseja excluir esta obra? Todos os apontamentos e tarefas relacionados também serão removidos." />
      </form>
    </div>
  );
}