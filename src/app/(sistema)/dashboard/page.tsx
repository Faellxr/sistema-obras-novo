import { PageHeader } from "@/components/layout/page-header";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { getDashboardData } from "@/services/dashboard-service";
import { formatCurrency } from "@/lib/utils";
import { ObrasChart } from "@/components/dashboard/obras-chart";
import { TarefasChart } from "@/components/dashboard/tarefas-chart";

export default async function DashboardPage() {
  const data = await getDashboardData();

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Visão geral das obras, serventes, tarefas e custos."
      />

      <StatsCards
        obrasAtivas={data.obrasAtivas}
        obrasFinalizadas={data.obrasFinalizadas}
        serventesAtivos={data.serventesAtivos}
        custoTotal={formatCurrency(data.custoTotal)}
      />

      <div className="mt-6 grid gap-4 xl:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-xl font-semibold">Custo por obra</h3>
          <p className="mt-1 text-sm text-slate-500">
            Soma dos apontamentos por obra.
          </p>
          <div className="mt-4">
            <ObrasChart data={data.custoPorObra} />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-xl font-semibold">Tarefas por status</h3>
          <p className="mt-1 text-sm text-slate-500">
            Distribuição atual do quadro de tarefas.
          </p>
          <div className="mt-4">
            <TarefasChart data={data.tarefasPorStatus} />
          </div>
        </div>
      </div>
    </div>
  );
}