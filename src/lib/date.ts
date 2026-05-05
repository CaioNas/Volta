export type WeekDay = {
  date: Date;
  dateKey: string;
  label: string;
  dayNumber: number;
};

export function getTodayDateKey(): string {
  return getDateKey(new Date());
}

export function getWeekDays(date = new Date()): WeekDay[] {
  const current = new Date(date);
  const day = current.getDay();
  const mondayOffset = day === 0 ? -6 : 1 - day;
  const monday = new Date(current);
  monday.setHours(0, 0, 0, 0);
  monday.setDate(current.getDate() + mondayOffset);

  return Array.from({ length: 7 }, (_, index) => {
    const item = new Date(monday);
    item.setDate(monday.getDate() + index);

    return {
      date: item,
      dateKey: getDateKey(item),
      label: item.toLocaleDateString("pt-BR", { weekday: "short" }).replace(".", ""),
      dayNumber: item.getDate(),
    };
  });
}

export function formatDateLabel(dateKey: string): string {
  const [year, month, day] = dateKey.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  const weekday = date.toLocaleDateString("pt-BR", { weekday: "short" }).replace(".", "");
  const formattedDate = date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
  });

  return `${capitalize(weekday)}, ${formattedDate}`;
}

export function getDateKey(date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
