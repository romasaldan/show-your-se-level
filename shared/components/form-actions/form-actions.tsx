import { Button } from "@/shared/components/button/button";
import styles from "./form-actions.module.css";

type FormActionsProps = {
  cancelLabel: string;
  submitLabel: string;
  onCancel: () => void;
  cancelDisabled?: boolean;
  submitDisabled?: boolean;
};

export function FormActions({
  cancelLabel,
  submitLabel,
  onCancel,
  cancelDisabled = false,
  submitDisabled = false,
}: FormActionsProps) {
  return (
    <div className={styles.root}>
      <Button
        type="button"
        variant="ghost"
        onClick={onCancel}
        disabled={cancelDisabled}
      >
        {cancelLabel}
      </Button>
      <Button type="submit" disabled={submitDisabled}>
        {submitLabel}
      </Button>
    </div>
  );
}

