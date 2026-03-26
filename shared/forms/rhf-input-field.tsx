import type { InputHTMLAttributes } from "react";
import type {
  FieldValues,
  Path,
  RegisterOptions,
  FieldError,
} from "react-hook-form";
import { useFormContext } from "react-hook-form";
import { FormField } from "@/shared/components/form-field/form-field";
import styles from "./rhf-fields.module.css";

type RhfInputFieldTypedProps<T extends FieldValues, TName extends Path<T>> = {
  name: TName;
  label: string;
  rules?: RegisterOptions<T, TName>;
  inputProps?: Omit<InputHTMLAttributes<HTMLInputElement>, "name">;
};

export function RhfInputField<T extends FieldValues, TName extends Path<T>>({
  name,
  label,
  rules,
  inputProps,
}: RhfInputFieldTypedProps<T, TName>) {
  const { register, formState } = useFormContext<T>();
  const htmlId = String(name);
  const fieldError = (formState.errors as Record<string, FieldError | undefined>)[
    htmlId
  ];

  return (
    <FormField label={label} htmlFor={htmlId} error={fieldError?.message}>
      <input
        id={htmlId}
        className={styles.input}
        {...register(name, rules)}
        {...inputProps}
      />
    </FormField>
  );
}

