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
      <div className="mb-6 flex items-center justify-between gap-4">
        <PageHeader
          title="Apontamentos"
          description="Controle de dias trabalhados e custo por obra."
        />
        <Link
          href="/apontamentos/novo"
          className="rounded-xl bg-slate-900 px-4 py-3 text-white hover:bg-slate-800"
        >
          Novo apontamento
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full">
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
                <td className="p-4">{formatCurrency(Number(item.custoTotal))}</td>
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
  );
}