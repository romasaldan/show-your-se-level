import { Button } from "@/shared/components/button/button";
import styles from "./form-actions.module.css";

type FormActionsProps = {
  cancelLabel: string;
  submitLabel: string;
  onCancel: () => void;
};

export function FormActions({
  cancelLabel,
  submitLabel,
  onCancel,
}: FormActionsProps) {
  return (
    <div className={styles.root}>
      <Button type="button" variant="ghost" onClick={onCancel}>
        {cancelLabel}
      </Button>
      <Button type="submit">{submitLabel}</Button>
    </div>
  );
}

