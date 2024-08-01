const colors = [
  "#84cc16",
  "#10b981",
  "#14b8a6",
  "#06b6d4",
  "#0ea5e9",
  "#6366f1",
  "#8b5cf6",
  "#a855f7",
  "#d946ef",
  "#ec4899",
];

export const randomColor = () => {
  const randNum = Math.floor(Math.random() * 10);
  return colors[randNum];
};
