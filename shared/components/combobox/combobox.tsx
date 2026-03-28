"use client";

import { useMemo, useState } from "react";
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
import { XIcon } from "lucide-react";

export type ComboboxOption = { value: string; label: string };

type ComboboxProps = {
  options: ComboboxOption[];
  values: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  label?: string;
  allowCreate?: boolean;
  createOptionLabel?: (value: string) => string;
};

export function Combobox({
  options,
  values,
  onChange,
  placeholder,
  label,
  allowCreate = false,
  createOptionLabel = (value) => `Add "${value}"`,
}: ComboboxProps) {
  const [inputValue, setInputValue] = useState("");
  const anchorRef = useComboboxAnchor();
  const normalizedOptionValues = useMemo(
    () => new Set(options.map((opt) => opt.value.trim().toLowerCase())),
    [options],
  );
  const createCandidate = inputValue.trim();
  const shouldShowCreateCandidate =
    allowCreate &&
    createCandidate.length > 0 &&
    !normalizedOptionValues.has(createCandidate.toLowerCase());
  const optionLabelByValue = new Map<string, string>(
    [
      ...options,
      ...(shouldShowCreateCandidate
        ? [{ value: createCandidate, label: createOptionLabel(createCandidate) }]
        : []),
    ].map((opt) => [opt.value, opt.label] as const),
  );
  const items = [
    ...options.map((o) => o.value),
    ...(shouldShowCreateCandidate ? [createCandidate] : []),
  ];

  return (
    <div className="w-full">
      {label ? <div className="sr-only">{label}</div> : null}

      <ShadcnCombobox
        multiple
        items={items}
        value={values}
        onValueChange={onChange}
        onInputValueChange={setInputValue}
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
          {values.length > 0 ? (
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              className="shrink-0"
              onClick={() => onChange([])}
              aria-label="Clear selected skills"
            >
              <XIcon className="pointer-events-none" />
            </Button>
          ) : null}
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

    </div>
  );
}
