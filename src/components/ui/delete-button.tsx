"use client";

type DeleteButtonProps = {
  label?: string;
  confirmMessage?: string;
};

export function DeleteButton({
  label = "Excluir",
  confirmMessage = "Tem certeza que deseja excluir este registro?",
}: DeleteButtonProps) {
  return (
    <button
      type="submit"
      onClick={(event) => {
        const confirmed = window.confirm(confirmMessage);
        if (!confirmed) {
          event.preventDefault();
        }
      }}
      className="rounded-xl bg-red-600 px-5 py-3 font-medium text-white hover:bg-red-700"
    >
      {label}
    </button>
  );
}