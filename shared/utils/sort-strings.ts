export function sortStrings(values: string[]): string[] {
  return [...values].sort((a, b) => a.localeCompare(b));
}
