export function formatValueBRL(price: number): string {
  const priceFormat = (price / 100).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return priceFormat
  // const unformattedValue = price.replace(/[^0-9]/g, '');
  // // Divide o valor em parte inteira e parte decimal
  // const intValue = parseInt(unformattedValue, 10);
  // const decimalValue = (intValue / 100).toFixed(2);
  // return decimalValue
}

export function transformPaymentMethods(titlePaymentMethods: string) {
  switch (titlePaymentMethods) {
    case "pix":
      return "Pix";
    case "boleto":
      return "Boleto";
    case "cash":
      return "Dinheiro";
    case "card":
      return "Cartão de crédito";
    case "deposit":
      return "Depósito bancário";
    default:
      null
  }
}