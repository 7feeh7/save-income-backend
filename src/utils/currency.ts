export function formatCurrencyForPostgres(value: number): string {
  const cleanedValue = value.toString().replace(/\./g, "")

  const formattedValue = cleanedValue.replace(",", ".")
  return formattedValue
}
