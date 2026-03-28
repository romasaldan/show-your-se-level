export function mergeUnique<T>(first: T[], second: T[]): T[] {
  return [...new Set([...first, ...second])];
}
