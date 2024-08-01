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

export const authToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YWE3Y2JkYTEwNTc4MmZhZTBmM2NhMSIsImlhdCI6MTcyMjQ1MDAxNX0.T-bZ3Jck5V-DaWNM4VM5SGPJbEpN810ZRaC25C5exkM";

export const api_url = import.meta.env.VITE_API_URL;

export const randomColor = () => {
  const randNum = Math.floor(Math.random() * 10);
  return colors[randNum];
};
