"use client";
import type { ReactNode } from "react";
import styles from "./modal.module.css";

type ModalProps = {
  open: boolean;
  title?: string;
  onClose: () => void;
  children: ReactNode;
};

export function Modal({ open, title, onClose, children }: ModalProps) {
  if (!open) return null;

  return (
    <div
      className={styles.overlay}
      role="presentation"
      onMouseDown={(e) => {
        // Close only when user clicks the overlay, not when interacting
        // with the modal content.
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={styles.content} role="dialog" aria-modal="true">
        {(title ?? "") !== "" ? (
          <div className={styles.header}>
            <h2 className={styles.title}>{title}</h2>
            <button
              type="button"
              className={styles.closeButton}
              aria-label="Close dialog"
              onClick={onClose}
            >
              ×
            </button>
          </div>
        ) : null}

        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
}

