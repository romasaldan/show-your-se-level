"use client";
import { useEffect, useState, type ReactNode } from "react";
import { X } from "lucide-react";
import { Modal } from "@/shared/components/modal/modal";
import { Button } from "@/shared/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/shared/components/ui/drawer";

type ModalWithDrawerProps = {
  open: boolean;
  title?: string;
  onClose: () => void;
  children: ReactNode;
};

export function ModalWithDrawer({
  open,
  title,
  onClose,
  children,
}: ModalWithDrawerProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");

    const updateIsMobile = () => {
      setIsMobile(mediaQuery.matches);
    };

    updateIsMobile();
    mediaQuery.addEventListener("change", updateIsMobile);

    return () => {
      mediaQuery.removeEventListener("change", updateIsMobile);
    };
  }, []);

  if (!isMobile) {
    return (
      <Modal open={open} title={title} onClose={onClose}>
        {children}
      </Modal>
    );
  }

  if (!open) return null;

  return (
    <Drawer
      open={open}
      modal={false}
      dismissible
      onOpenChange={(nextOpen) => !nextOpen && onClose()}
    >
      <DrawerContent>
        {(title ?? "") !== "" ? (
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label="Close dialog"
              onClick={onClose}
            >
              <X />
            </Button>
          </DrawerHeader>
        ) : null}
        <div className="max-h-[calc(90vh-4.5rem)] overflow-auto p-4">{children}</div>
      </DrawerContent>
    </Drawer>
  );
}

