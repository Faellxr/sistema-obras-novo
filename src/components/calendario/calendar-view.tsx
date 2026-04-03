"use client";

import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  parseISO,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type CalendarEvent = {
  id: string;
  title: string;
  date: string;
  type: "obra" | "tarefa";
  subtitle?: string;
};

type CalendarViewProps = {
  events: CalendarEvent[];
};

export function CalendarView({ events }: CalendarViewProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);

  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const days = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd,
  });

  const monthEvents = useMemo(() => {
    return events
      .filter((event) => {
        const eventDate = parseISO(event.date);
        return (
          eventDate.getMonth() === currentMonth.getMonth() &&
          eventDate.getFullYear() === currentMonth.getFullYear()
        );
      })
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [events, currentMonth]);

  function getEventsForDay(day: Date) {
    return events.filter((event) => isSameDay(parseISO(event.date), day));
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-2xl font-bold text-slate-900">
            {format(currentMonth, "MMMM 'de' yyyy", { locale: ptBR })}
          </h3>
          <p className="text-sm text-slate-500">
            Visualização mensal dos prazos de obras e tarefas
          </p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setCurrentMonth((prev) => subMonths(prev, 1))}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            <ChevronLeft size={16} />
            Anterior
          </button>

          <button
            type="button"
            onClick={() => setCurrentMonth(new Date())}
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Hoje
          </button>

          <button
            type="button"
            onClick={() => setCurrentMonth((prev) => addMonths(prev, 1))}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Próximo
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-4 flex flex-wrap gap-3 text-sm">
          <div className="inline-flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-blue-500" />
            <span className="text-slate-600">Prazo de obra</span>
          </div>

          <div className="inline-flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-amber-500" />
            <span className="text-slate-600">Prazo de tarefa</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[760px]">
            <div className="grid grid-cols-7 border-b border-slate-200 text-sm font-semibold text-slate-600">
              {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day) => (
                <div key={day} className="px-2 py-3 text-center">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7">
              {days.map((day) => {
                const dayEvents = getEventsForDay(day);
                const inCurrentMonth = isSameMonth(day, currentMonth);
                const isToday = isSameDay(day, new Date());

                return (
                  <div
                    key={day.toISOString()}
                    className={`min-h-[120px] border-b border-r border-slate-200 p-2 ${
                      inCurrentMonth ? "bg-white" : "bg-slate-50"
                    }`}
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <span
                        className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                          isToday
                            ? "bg-slate-900 text-white"
                            : inCurrentMonth
                            ? "text-slate-900"
                            : "text-slate-400"
                        }`}
                      >
                        {format(day, "d")}
                      </span>
                    </div>

                    <div className="space-y-1">
                      {dayEvents.slice(0, 3).map((event) => (
                        <div
                          key={event.id}
                          className={`rounded-lg px-2 py-1 text-xs font-medium ${
                            event.type === "obra"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                          title={event.title}
                        >
                          <span className="block truncate">{event.title}</span>
                        </div>
                      ))}

                      {dayEvents.length > 3 && (
                        <div className="text-xs text-slate-500">
                          +{dayEvents.length - 3} mais
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-xl font-semibold text-slate-900">
          Eventos do mês
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          Lista consolidada dos prazos exibidos no calendário
        </p>

        <div className="mt-4 space-y-3">
          {monthEvents.length > 0 ? (
            monthEvents.map((event) => (
              <div
                key={event.id}
                className="flex flex-col gap-2 rounded-xl border border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-medium text-slate-900">{event.title}</p>
                  {event.subtitle && (
                    <p className="text-sm text-slate-500">{event.subtitle}</p>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                      event.type === "obra"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {event.type === "obra" ? "Obra" : "Tarefa"}
                  </span>

                  <span className="text-sm font-medium text-slate-700">
                    {format(parseISO(event.date), "dd/MM/yyyy")}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-500">
              Nenhum evento encontrado neste mês.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}