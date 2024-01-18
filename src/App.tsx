import Game from "./components/Game";
import { ThemeProvider } from "styled-components";
import React from "react";
import { Theme, dark, light } from "./theme/theme";
import { Normalize } from "styled-normalize";

function App() {
  const [theme, setTheme] = React.useState<Theme>(Theme.Dark);

  return (
    <>
      <Normalize />
      <ThemeProvider theme={theme === Theme.Light ? light : dark}>
        <Game
          onThemeChange={() =>
            setTheme(theme === Theme.Light ? Theme.Dark : Theme.Light)
          }
        />
      </ThemeProvider>
    </>
  );
}

export default App;
