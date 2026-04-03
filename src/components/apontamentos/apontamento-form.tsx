"use client";

import { useMemo, useState } from "react";

type Obra = {
  id: string;
  nome: string;
};

type Servente = {
  id: string;
  nome: string;
  valorDiaria: number;
};

type Props = {
  obras: Obra[];
  serventes: Servente[];
  action: (formData: FormData) => void;
};

export function ApontamentoForm({ obras, serventes, action }: Props) {
  const [serventeId, setServenteId] = useState("");

  const diariaSelecionada = useMemo(() => {
    const servente = serventes.find((item) => item.id === serventeId);
    return servente ? servente.valorDiaria : 0;
  }, [serventeId, serventes]);

  return (
    <form action={action} className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
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

        <div>
          <label className="mb-1 block text-sm font-medium">Servente</label>
          <select
            name="serventeId"
            required
            value={serventeId}
            onChange={(e) => setServenteId(e.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none"
          >
            <option value="" disabled>
              Selecione um servente
            </option>
            {serventes.map((servente) => (
              <option key={servente.id} value={servente.id}>
                {servente.nome}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Semana de referência</label>
          <input
            name="semanaReferencia"
            type="date"
            required
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Dias trabalhados</label>
          <input
            name="diasTrabalhados"
            type="number"
            min="1"
            max="7"
            required
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
            readOnly
            value={diariaSelecionada}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium">Observações</label>
          <textarea
            name="observacoes"
            rows={4}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none"
            placeholder="Observações do apontamento"
          />
        </div>
      </div>

      <button
        type="submit"
        className="rounded-xl bg-slate-900 px-5 py-3 font-medium text-white hover:bg-slate-800"
      >
        Salvar apontamento
      </button>
    </form>
  );
}