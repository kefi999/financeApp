export const currencyFormatter = new Intl.NumberFormat(undefined, {
  currency: "usd",
  style: "currency",
  minimumFractionDigits: 0,
});
//converts the passsed number into a formated value with a currency attached to it, for an"undefined", probably uses the default now.
