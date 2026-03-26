"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./combobox.module.css";

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
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const [menuStyle, setMenuStyle] = useState<{
    top: number;
    left: number;
    width: number;
  } | null>(null);

  const optionLabelByValue = useMemo(() => {
    const map = new Map<string, string>();
    for (const opt of options) map.set(opt.value, opt.label);
    return map;
  }, [options]);

  useEffect(() => {
    function onDocMouseDown(e: MouseEvent) {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (!open) return;
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    function updateMenuPosition() {
      if (!triggerRef.current) return;
      const rect = triggerRef.current.getBoundingClientRect();
      setMenuStyle({
        top: rect.bottom + 6,
        left: rect.left,
        width: rect.width,
      });
    }

    if (!open) return;
    updateMenuPosition();
    window.addEventListener("resize", updateMenuPosition);
    window.addEventListener("scroll", updateMenuPosition, true);
    return () => {
      window.removeEventListener("resize", updateMenuPosition);
      window.removeEventListener("scroll", updateMenuPosition, true);
    };
  }, [open]);

  const selectedLabels = values.map((v) => optionLabelByValue.get(v) ?? v);

  function toggleValue(nextValue: string) {
    if (values.includes(nextValue)) {
      onChange(values.filter((v) => v !== nextValue));
    } else {
      onChange([...values, nextValue]);
    }
  }

  return (
    <div className={styles.root} ref={rootRef}>
      {label ? <div className={styles.srOnly}>{label}</div> : null}
      <button
        type="button"
        ref={triggerRef}
        className={styles.trigger}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {values.length === 0 ? (
          <span className={styles.placeholder}>{placeholder ?? "Select..."}</span>
        ) : (
          <span className={styles.chipsPreview}>{selectedLabels.join(", ")}</span>
        )}
        <span className={styles.caret}>▾</span>
      </button>

      {open && menuStyle
        ? createPortal(
            <div
              className={styles.menu}
              role="listbox"
              aria-label={label}
              style={{
                top: `${menuStyle.top}px`,
                left: `${menuStyle.left}px`,
                width: `${menuStyle.width}px`,
              }}
            >
              {options.map((opt) => {
                const isSelected = values.includes(opt.value);
                return (
                  <button
                    key={opt.value}
                    type="button"
                    className={`${styles.option} ${
                      isSelected ? styles.optionSelected : ""
                    }`}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => toggleValue(opt.value)}
                  >
                    <span className={styles.optionCheck}>
                      {isSelected ? "✓" : ""}
                    </span>
                    <span className={styles.optionLabel}>{opt.label}</span>
                  </button>
                );
              })}

              {values.length > 0 ? (
                <div className={styles.selectedFooter}>
                  <button
                    type="button"
                    className={styles.clearButton}
                    onClick={() => onChange([])}
                  >
                    Clear
                  </button>
                </div>
              ) : null}
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}

