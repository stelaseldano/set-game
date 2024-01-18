import React from "react";
export const ScreenSizeContext = React.createContext("l");

function ScreenSizeProvider({ children }) {
  const { innerWidth: width } = window;
  const [size, setSize] = React.useState("l");

  React.useEffect(() => {
    if (width < 1000) {
      setSize("m");
    }
    if (width < 700) {
      setSize("s");
    }
  }, [width]);

  return (
    <ScreenSizeContext.Provider value={size}>
      {children}
    </ScreenSizeContext.Provider>
  );
}

export default ScreenSizeProvider;
