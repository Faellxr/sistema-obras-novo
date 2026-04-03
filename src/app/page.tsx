import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-16 md:py-20">
        <div className="max-w-3xl">
          <p className="mb-4 inline-flex rounded-full bg-slate-800 px-4 py-2 text-xs text-slate-200 md:text-sm">
            Projeto acadêmico • Sistema Web de Gerenciamento de Obras
          </p>

          <h1 className="text-4xl font-bold leading-tight md:text-6xl">
            Controle obras, custos, tarefas e equipe em um só lugar.
          </h1>

          <p className="mt-6 text-base text-slate-300 md:text-lg">
            Plataforma desenvolvida para apoiar o mestre de obras no acompanhamento
            das obras ativas e finalizadas, no registro de serventes, no controle de
            custos operacionais e na gestão visual de tarefas.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/login"
              prefetch={false}
              className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-center font-medium text-slate-950 hover:bg-slate-200"
            >
              Acessar sistema
            </Link>

            <Link
              href="/dashboard"
              prefetch={false}
              className="inline-flex items-center justify-center rounded-xl border border-slate-700 px-6 py-3 text-center font-medium text-white hover:bg-slate-900"
            >
              Ir para dashboard
            </Link>
          </div>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-semibold">Gestão de obras</h2>
            <p className="mt-2 text-slate-300">
              Cadastre obras, acompanhe status, prazos, clientes e custos estimados.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-semibold">Controle operacional</h2>
            <p className="mt-2 text-slate-300">
              Registre serventes, dias trabalhados e custo por obra com apontamentos.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-semibold">Kanban e indicadores</h2>
            <p className="mt-2 text-slate-300">
              Visualize tarefas por status e acompanhe gráficos do andamento do projeto.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}