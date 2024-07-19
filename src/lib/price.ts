export const shipping = 3.99; // Flat shipping fee
export const price = 18
export const cryptoDiscount = 0.1

export const getPriceInEth = (ethToUsd: number | null) => {
  if (!ethToUsd) return 0
  return ((price - price * cryptoDiscount) / ethToUsd)
}

export const getTotalPriceInEth = (ethToUsd: number | null) => {
  if (!ethToUsd) return 0
  return (((price - price * cryptoDiscount) + shipping) / ethToUsd)
}
