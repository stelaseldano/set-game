export enum Theme {
  Light = "light",
  Dark = "dark",
}

export const light = {
  backgroundColor: "#d9e0ea",
  card: {
    background: "#fff",
    boxShadow: {
      selected: "0px 0px 15px #4B5563",
      default: "0px 0px 15px #97aac6",
    },
  },
};

export const dark = {
  backgroundColor: "#333",
  card: {
    background: "#222",
    boxShadow: {
      selected: "0px 0px 10px #97aac6",
      default: "0px 0px 3px #97aac6",
    },
  },
};
