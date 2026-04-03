import { deleteServente, updateServente } from "@/actions/servente-actions";
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

export default async function EditarServentePage({ params }: PageProps) {
  const { id } = await params;

  const servente = await prisma.servente.findUnique({
    where: { id },
  });

  if (!servente) notFound();

  return (
    <div className="max-w-3xl">
      <div className="mb-6 flex items-center justify-between gap-4">
        <PageHeader
          title="Editar servente"
          description="Atualize os dados do servente."
        />
        <BackButton fallbackHref="/serventes" />
      </div>

      <form action={updateServente} className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <input type="hidden" name="id" value={servente.id} />

        <div className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium">Nome</label>
            <input
              name="nome"
              type="text"
              defaultValue={servente.nome}
              required
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Telefone</label>
            <input
              name="telefone"
              type="text"
              defaultValue={servente.telefone ?? ""}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Valor da diária</label>
            <input
              name="valorDiaria"
              type="number"
              step="0.01"
              min="0.01"
              required
              defaultValue={Number(servente.valorDiaria)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Ativo</label>
            <select
              name="ativo"
              defaultValue={servente.ativo ? "true" : "false"}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none"
            >
              <option value="true">Sim</option>
              <option value="false">Não</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="rounded-xl bg-slate-900 px-5 py-3 font-medium text-white hover:bg-slate-800"
        >
          Salvar alterações
        </button>
      </form>

      <form action={deleteServente} className="mt-4">
        <input type="hidden" name="id" value={servente.id} />
        <DeleteButton confirmMessage="Tem certeza que deseja excluir este servente? Os apontamentos relacionados também poderão ser removidos." />
      </form>
    </div>
  );
}