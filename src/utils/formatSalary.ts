export function formatSalary(value: string): string {
  if (!value) return value;
  return value.replace(",", ".");
}
