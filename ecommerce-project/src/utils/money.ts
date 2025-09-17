export function formatMoney(amountCents: number) {
  if (amountCents < 0) {
    return `-$${(amountCents / -100).toFixed(2)}`
  } else {
    return `$${(amountCents / 100).toFixed(2)}`
  }
  
}