"use client";

import { Combobox, type ComboboxOption } from "@/shared/components/combobox/combobox";
import { mergeUnique } from "@/shared/utils/merge-unique";
import { normalizeStringList } from "@/shared/utils/normalize-string-list";

type SkillsComboboxProps = {
  skills: string[];
  values: string[];
  onChange: (values: string[]) => void;
  label?: string;
  placeholder?: string;
  createOptionLabel?: (value: string) => string;
};

function toOption(skill: string): ComboboxOption {
  return { value: skill, label: skill };
}

export function SkillsCombobox({
  skills,
  values,
  onChange,
  label,
  placeholder,
  createOptionLabel,
}: SkillsComboboxProps) {
  const normalizedSkills = normalizeStringList(skills);
  const normalizedSelectedValues = normalizeStringList(values);
  const options = mergeUnique(normalizedSkills, normalizedSelectedValues).map(toOption);

  return (
    <Combobox
      label={label}
      options={options}
      values={values}
      onChange={onChange}
      placeholder={placeholder}
      allowCreate
      createOptionLabel={createOptionLabel}
    />
  );
}
