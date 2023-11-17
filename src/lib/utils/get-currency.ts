export const getCurrency = (number: number) => {
  if (number === undefined || number === null) return;
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(number);
};
