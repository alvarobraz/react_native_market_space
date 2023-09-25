export function formatValueBRL(price: number): string {
  const priceFormat = (price / 100).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return priceFormat
}