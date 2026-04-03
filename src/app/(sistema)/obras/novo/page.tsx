import { PageHeader } from "@/components/layout/page-header";
import { createObra } from "@/actions/obra-actions";
import { BackButton } from "@/components/layout/back-button";

export default function NovaObraPage() {
  return (
    <div className="max-w-3xl">
      <div className="mb-6 flex items-center justify-between gap-4">
        <PageHeader
          title="Nova obra"
          description="Cadastre uma nova obra no sistema."
        />
        <BackButton fallbackHref="/obras" />
      </div>

      <form action={createObra} className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium">Nome da obra</label>
            <input
              name="nome"
              type="text"
              required
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none"
              placeholder="Ex.: Residência Jardim Europa"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Cliente</label>
            <input
              name="cliente"
              type="text"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none"
              placeholder="Nome do cliente"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Status</label>
            <select
              name="status"
              defaultValue="ATIVA"
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
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none"
              placeholder="Endereço da obra"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Data de início</label>
            <input
              name="dataInicio"
              type="date"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Prazo final</label>
            <input
              name="prazoFinal"
              type="date"
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
              defaultValue="0"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium">Descrição</label>
            <textarea
              name="descricao"
              rows={4}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none"
              placeholder="Descrição da obra"
            />
          </div>
        </div>

        <button
          type="submit"
          className="rounded-xl bg-slate-900 px-5 py-3 font-medium text-white hover:bg-slate-800"
        >
          Salvar obra
        </button>
      </form>
    </div>
  );
}