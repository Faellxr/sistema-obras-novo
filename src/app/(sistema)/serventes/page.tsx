import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/layout/page-header";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";

export default async function ServentesPage() {
  const serventes = await prisma.servente.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <PageHeader
          title="Serventes"
          description="Cadastre e acompanhe os trabalhadores auxiliares."
        />
        <Link
          href="/serventes/novo"
          className="rounded-xl bg-slate-900 px-4 py-3 text-white hover:bg-slate-800"
        >
          Novo servente
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr className="text-left">
              <th className="p-4">Nome</th>
              <th className="p-4">Telefone</th>
              <th className="p-4">Diária</th>
              <th className="p-4">Ativo</th>
              <th className="p-4">Ações</th>
            </tr>
          </thead>
          <tbody>
            {serventes.map((servente) => (
              <tr key={servente.id} className="border-t border-slate-200">
                <td className="p-4 font-medium">{servente.nome}</td>
                <td className="p-4">{servente.telefone || "-"}</td>
                <td className="p-4">
                  {formatCurrency(Number(servente.valorDiaria))}
                </td>
                <td className="p-4">{servente.ativo ? "Sim" : "Não"}</td>
                <td className="p-4">
                  <Link
                    href={`/serventes/${servente.id}/editar`}
                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm hover:bg-slate-50"
                  >
                    Editar
                  </Link>
                </td>
              </tr>
            ))}

            {serventes.length === 0 && (
              <tr>
                <td colSpan={5} className="p-6 text-center text-slate-500">
                  Nenhum servente cadastrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}