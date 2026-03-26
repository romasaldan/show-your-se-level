"use client";

import {
  Combobox as ShadcnCombobox,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxChip,
  ComboboxValue,
  useComboboxAnchor,
} from "@/shared/components/ui/combobox";
import { Button } from "@/shared/components/button/button";

export type ComboboxOption = { value: string; label: string };

type ComboboxProps = {
  options: ComboboxOption[];
  values: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  label?: string;
};

export function Combobox({
  options,
  values,
  onChange,
  placeholder,
  label,
}: ComboboxProps) {
  const anchorRef = useComboboxAnchor();
  const optionLabelByValue = new Map<string, string>(
    options.map((opt) => [opt.value, opt.label] as const),
  );
  const items = options.map((o) => o.value);

  return (
    <div className="w-full">
      {label ? <div className="sr-only">{label}</div> : null}

      <ShadcnCombobox
        multiple
        items={items}
        value={values}
        onValueChange={onChange}
      >
        <ComboboxChips ref={anchorRef}>
          <ComboboxValue>
            {values.map((v) => (
              <ComboboxChip key={v}>
                {optionLabelByValue.get(v) ?? v}
              </ComboboxChip>
            ))}
          </ComboboxValue>

          <ComboboxChipsInput placeholder={placeholder ?? "Select..."} />
        </ComboboxChips>

        <ComboboxContent anchor={anchorRef}>
          <ComboboxEmpty>No items found.</ComboboxEmpty>
          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item} value={item}>
                {optionLabelByValue.get(item) ?? item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </ShadcnCombobox>

      {values.length > 0 ? (
        <Button
          type="button"
          variant="ghost"
          className="mt-2 w-full font-semibold"
          onClick={() => onChange([])}
        >
          Clear
        </Button>
      ) : null}
    </div>
  );
}
