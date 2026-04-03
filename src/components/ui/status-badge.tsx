type StatusBadgeProps = {
  value: string;
  type?: "obra" | "tarefa" | "prioridade";
};

function getClasses(value: string, type: "obra" | "tarefa" | "prioridade") {
  if (type === "obra") {
    if (value === "ATIVA") return "bg-green-100 text-green-700";
    if (value === "PAUSADA") return "bg-yellow-100 text-yellow-700";
    if (value === "FINALIZADA") return "bg-slate-200 text-slate-700";
  }

  if (type === "tarefa") {
    if (value === "A_FAZER") return "bg-slate-200 text-slate-700";
    if (value === "EM_ANDAMENTO") return "bg-blue-100 text-blue-700";
    if (value === "CONCLUIDO") return "bg-green-100 text-green-700";
  }

  if (type === "prioridade") {
    if (value === "BAIXA") return "bg-slate-200 text-slate-700";
    if (value === "MEDIA") return "bg-yellow-100 text-yellow-700";
    if (value === "ALTA") return "bg-red-100 text-red-700";
  }

  return "bg-slate-100 text-slate-700";
}

function formatLabel(value: string) {
  return value
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/(^\w|\s\w)/g, (char) => char.toUpperCase());
}

export function StatusBadge({
  value,
  type = "obra",
}: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getClasses(
        value,
        type
      )}`}
    >
      {formatLabel(value)}
    </span>
  );
}