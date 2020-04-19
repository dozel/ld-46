const Colors = {
  lightPurple: "594e9e",
  blue: "3b4cb0",
  navy: "090f31",
  pink: "c76eaf",
  red: "ad2525",
  hexColor: (color) => {
    return parseInt(color, 16);
  },
  allColors: () => {
    return [
      Colors.lightPurple,
      Colors.blue,
      Colors.navy,
      Colors.pink,
      Colors.red
    ];
  },
  randomColor: () => {
    const allColors = Colors.allColors();
    return allColors[Math.floor(Math.random() * allColors.length)];
  }
};

export default Colors;
