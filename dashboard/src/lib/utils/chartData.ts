export const defaultColors = [
  "#264653",
  "#2a9d8f",
  "#e9c46a",
  "#f4a261",
  "#e76f51",
  "#e63946",
  "#f1faee",
  "#a8dadc",
  "#457b9d",
  "#1d3557",
];

export const getLineColor = (index: number) => {
  return defaultColors[index % defaultColors.length];
};
