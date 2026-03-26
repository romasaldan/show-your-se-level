import type { TextareaHTMLAttributes } from "react";
import type {
  FieldValues,
  Path,
  RegisterOptions,
  FieldError,
} from "react-hook-form";
import { useFormContext } from "react-hook-form";
import { FormField } from "@/shared/components/form-field/form-field";
import styles from "./rhf-fields.module.css";

type RhfTextareaFieldProps<T extends FieldValues, TName extends Path<T>> = {
  name: TName;
  label: string;
  rules?: RegisterOptions<T, TName>;
  textareaProps?: Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "name">;
};

export function RhfTextareaField<
  T extends FieldValues,
  TName extends Path<T>,
>({
  name,
  label,
  rules,
  textareaProps,
}: RhfTextareaFieldProps<T, TName>) {
  const { register, formState } = useFormContext<T>();
  const htmlId = String(name);
  const fieldError = (formState.errors as Record<string, FieldError | undefined>)[
    htmlId
  ];

  return (
    <FormField label={label} htmlFor={htmlId} error={fieldError?.message}>
      <textarea
        id={htmlId}
        className={styles.textarea}
        {...register(name, rules)}
        {...textareaProps}
      />
    </FormField>
  );
}

