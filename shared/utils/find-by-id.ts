type WithId = {
  id: string;
};

export function findById<TItem extends WithId>(
  items: TItem[],
  id: string | null,
): TItem | null {
  if (!id) return null;
  return items.find((item) => item.id === id) ?? null;
}
