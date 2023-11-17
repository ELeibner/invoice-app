export const padWithLeadingZeros = (num: number, length: number) => {
  return String(num).padStart(length, "0");
};
