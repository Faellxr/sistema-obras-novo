import { PageHeader } from "@/components/layout/page-header";
import { createServente } from "@/actions/servente-actions";
import { BackButton } from "@/components/layout/back-button";

export default function NovoServentePage() {
  return (
    <div className="max-w-3xl">
      <div className="mb-6 flex items-center justify-between gap-4">
        <PageHeader
          title="Novo servente"
          description="Cadastre um novo trabalhador auxiliar."
        />
        <BackButton fallbackHref="/serventes" />
      </div>

      <form action={createServente} className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium">Nome</label>
            <input
              name="nome"
              type="text"
              required
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none"
              placeholder="Nome do servente"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Telefone</label>
            <input
              name="telefone"
              type="text"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none"
              placeholder="(62) 99999-9999"
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
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none"
              placeholder="120.00"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Ativo</label>
            <select
              name="ativo"
              defaultValue="true"
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
          Salvar servente
        </button>
      </form>
    </div>
  );
}