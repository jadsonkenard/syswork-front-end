export function formatBRL(value: number | string): string {
  if (value === null || value === undefined) return "";

  const number = Number(value);
  if (isNaN(number)) return "";

  return number.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
