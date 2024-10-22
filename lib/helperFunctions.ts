const colors = [
  "#CDFF83",
  "#FFD483",
  "#F99FB4",
  "#F9C3C4",
  "#82c6d1",
  "#9cabdf",
];

export const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};
