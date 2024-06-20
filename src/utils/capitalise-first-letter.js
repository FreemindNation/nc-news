export const capitaliseFirstLetter = (string) => {
  if (typeof string !== "string" || string.length === 0) return string;

  const firstLetter = string.charAt().toUpperCase();
  const restOfString = string.slice(1).toLowerCase();

  return `${firstLetter}${restOfString}`;
};


