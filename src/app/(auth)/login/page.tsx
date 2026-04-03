import { LoginForm } from "@/components/auth/login-form";
import { Building2, CheckSquare, HardHat, Wallet } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <div className="grid min-h-screen lg:grid-cols-2">
        <div className="hidden flex-col justify-between bg-slate-950 p-10 text-white lg:flex">
          <div>
            <div className="inline-flex rounded-2xl bg-white/10 px-4 py-2 text-sm text-slate-200">
              Sistema web de gerenciamento de obras
            </div>

            <h1 className="mt-6 max-w-xl text-5xl font-bold leading-tight">
              Controle obras, equipe, tarefas e custos em um só lugar.
            </h1>

            <p className="mt-6 max-w-lg text-lg text-slate-300">
              Plataforma desenvolvida para apoiar a gestão operacional e financeira
              das obras, reunindo cadastro de obras, tarefas, apontamentos,
              calendário e indicadores gerenciais em um único ambiente.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <HardHat size={22} />
              <h2 className="mt-4 text-lg font-semibold">Gestão de obras</h2>
              <p className="mt-2 text-sm text-slate-300">
                Cadastro, acompanhamento e detalhamento das obras ativas e finalizadas.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <Wallet size={22} />
              <h2 className="mt-4 text-lg font-semibold">Controle de custos</h2>
              <p className="mt-2 text-sm text-slate-300">
                Apontamentos por servente e cálculo automático do custo por obra.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <CheckSquare size={22} />
              <h2 className="mt-4 text-lg font-semibold">Kanban de tarefas</h2>
              <p className="mt-2 text-sm text-slate-300">
                Organização visual do andamento das atividades da obra.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <Building2 size={22} />
              <h2 className="mt-4 text-lg font-semibold">Dashboard gerencial</h2>
              <p className="mt-2 text-sm text-slate-300">
                Indicadores e gráficos para acompanhamento estratégico.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center bg-slate-100 p-6 md:p-10">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl">
            <div className="mb-8">
              <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
                Área restrita
              </p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                Entrar
              </h2>
              <p className="mt-2 text-slate-600">
                Informe suas credenciais para acessar o sistema.
              </p>
            </div>

            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}