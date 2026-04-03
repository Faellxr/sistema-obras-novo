import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/layout/page-header";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { StatusBadge } from "@/components/ui/status-badge";

export default async function ObrasPage() {
  const obras = await prisma.obra.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <PageHeader
          title="Obras"
          description="Gerencie as obras ativas, pausadas e finalizadas."
        />

        <Link
          href="/obras/novo"
          className="w-full sm:w-auto rounded-xl bg-slate-900 px-4 py-3 text-center text-white hover:bg-slate-800"
        >
          Nova obra
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead className="bg-slate-50">
              <tr className="text-left">
                <th className="p-4">Nome</th>
                <th className="p-4">Cliente</th>
                <th className="p-4">Status</th>
                <th className="p-4">Prazo final</th>
                <th className="p-4">Ações</th>
              </tr>
            </thead>

            <tbody>
              {obras.map((obra) => (
                <tr key={obra.id} className="border-t border-slate-200">
                  <td className="p-4 font-medium">
                    <Link
                      href={`/obras/${obra.id}`}
                      className="text-slate-900 hover:underline"
                    >
                      {obra.nome}
                    </Link>
                  </td>

                  <td className="p-4">{obra.cliente || "-"}</td>

                  <td className="p-4">
                    <StatusBadge value={obra.status} type="obra" />
                  </td>

                  <td className="p-4">
                    {obra.prazoFinal
                      ? formatDate(obra.prazoFinal)
                      : "-"}
                  </td>

                  <td className="p-4">
                    <Link
                      href={`/obras/${obra.id}/editar`}
                      className="rounded-lg border border-slate-300 px-3 py-2 text-sm hover:bg-slate-50"
                    >
                      Editar
                    </Link>
                  </td>
                </tr>
              ))}

              {obras.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-slate-500">
                    Nenhuma obra cadastrada.
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