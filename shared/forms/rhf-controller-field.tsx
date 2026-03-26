import type { ReactNode } from "react";
import { Controller } from "react-hook-form";
import type {
  ControllerRenderProps,
  FieldValues,
  Path,
} from "react-hook-form";
import { useFormContext } from "react-hook-form";
import { FormField } from "@/shared/components/form-field/form-field";

type RhfControllerFieldTypedProps<T extends FieldValues, TName extends Path<T>> = {
  name: TName;
  label: string;
  render: (field: ControllerRenderProps<T, TName>) => ReactNode;
};

export function RhfControllerField<
  T extends FieldValues,
  TName extends Path<T>,
>({
  name,
  label,
  render,
}: RhfControllerFieldTypedProps<T, TName>) {
  const { control } = useFormContext<T>();

  return (
    <FormField label={label}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => <>{render(field)}</>}
      />
    </FormField>
  );
}

