"use client";

import { useState } from "react";

export function useEditModalState<TId extends string>() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<TId | null>(null);

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const openCreateModal = () => {
    setEditingId(null);
    setIsModalOpen(true);
  };

  const openEditModal = (id: TId) => {
    setEditingId(id);
    setIsModalOpen(true);
  };

  return {
    isModalOpen,
    editingId,
    closeModal,
    openCreateModal,
    openEditModal,
  };
}
