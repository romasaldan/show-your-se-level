"use client";

import {
  Select as ShadcnSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

export type SelectOption = { value: string; label: string };

type SelectProps = {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
};

export function Select({ options, value, onChange, label }: SelectProps) {
  const normalizedValue = value == null ? "" : String(value);
  const selectedOption = options.find((o) => o.value === normalizedValue);

  return (
    <div className="w-full">
      {label ? <div className="sr-only">{label}</div> : null}

      <ShadcnSelect
        value={normalizedValue}
        onValueChange={(nextValue) => {
          if (nextValue == null) return;
          onChange(String(nextValue));
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select...">
            {selectedOption?.label ?? null}
          </SelectValue>
        </SelectTrigger>

        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </ShadcnSelect>
    </div>
  );
}
