export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/layout/page-header";
import { formatCurrency, formatDate } from "@/lib/utils";
import Link from "next/link";

export default async function ApontamentosPage() {
  const apontamentos = await prisma.apontamento.findMany({
    include: {
      obra: true,
      servente: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <PageHeader
          title="Apontamentos"
          description="Controle de dias trabalhados e custo por obra."
        />

        <Link
          href="/apontamentos/novo"
          className="w-full rounded-xl bg-slate-900 px-4 py-3 text-center text-white hover:bg-slate-800 sm:w-auto"
        >
          Novo apontamento
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px]">
            <thead className="bg-slate-50">
              <tr className="text-left">
                <th className="p-4">Obra</th>
                <th className="p-4">Servente</th>
                <th className="p-4">Semana</th>
                <th className="p-4">Dias</th>
                <th className="p-4">Custo</th>
              </tr>
            </thead>
            <tbody>
              {apontamentos.map((item) => (
                <tr key={item.id} className="border-t border-slate-200">
                  <td className="p-4 font-medium">{item.obra.nome}</td>
                  <td className="p-4">{item.servente.nome}</td>
                  <td className="p-4">{formatDate(item.semanaReferencia)}</td>
                  <td className="p-4">{item.diasTrabalhados}</td>
                  <td className="p-4">
                    {formatCurrency(Number(item.custoTotal))}
                  </td>
                </tr>
              ))}

              {apontamentos.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-slate-500">
                    Nenhum apontamento cadastrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}