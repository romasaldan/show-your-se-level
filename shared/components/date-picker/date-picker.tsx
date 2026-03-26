"use client";

import { Popover } from "@base-ui/react/popover";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Calendar } from "@/shared/components/ui/calendar";

type DatePickerProps = {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  locale?: string;
};

function parseIsoDate(value?: string) {
  if (!value) {
    return undefined;
  }

  const parts = value.split("-").map((part) => Number(part));
  if (parts.length !== 3 || parts.some((part) => Number.isNaN(part))) {
    return undefined;
  }

  const [year, month, day] = parts;
  return new Date(year, month - 1, day);
}

function toIsoDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function toDisplayDate(date: Date, locale = "en") {
  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function DatePicker({
  value,
  onChange,
  placeholder = "Pick a date",
  locale = "en",
}: DatePickerProps) {
  const selectedDate = parseIsoDate(value);
  const label = selectedDate ? toDisplayDate(selectedDate, locale) : placeholder;

  return (
    <Popover.Root>
      <Popover.Trigger
        render={
          <Button
            variant="outline"
            data-empty={!value}
            className="w-full justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
          />
        }
      >
        <CalendarIcon className="size-4" />
        {label}
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Positioner sideOffset={6} className="z-50">
          <Popover.Popup className="w-auto rounded-lg border border-[var(--border)] bg-[var(--popover)] p-0 text-[var(--popover-foreground)] shadow-md ring-1 ring-black/10 dark:ring-white/10">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => {
                if (date) {
                  onChange(toIsoDate(date));
                }
              }}
              captionLayout="dropdown"
              navLayout="after"
            />
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}
