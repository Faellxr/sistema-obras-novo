type StatsCardsProps = {
  obrasAtivas: number;
  obrasFinalizadas: number;
  serventesAtivos: number;
  custoTotal: string;
};

function Card({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-slate-500">{title}</p>
      <h3 className="mt-2 text-3xl font-bold text-slate-900">{value}</h3>
    </div>
  );
}

export function StatsCards({
  obrasAtivas,
  obrasFinalizadas,
  serventesAtivos,
  custoTotal,
}: StatsCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <Card title="Obras ativas" value={obrasAtivas} />
      <Card title="Obras finalizadas" value={obrasFinalizadas} />
      <Card title="Serventes ativos" value={serventesAtivos} />
      <Card title="Custo acumulado" value={custoTotal} />
    </div>
  );
}