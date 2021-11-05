import React, { Component, useState } from "react";
import { render } from "react-dom";
import HomePage from "./homepage";
import { createTheme, ThemeProvider, StyledEngineProvider, adaptV4Theme } from "@mui/material/styles";
import CssBaseline from '@mui/material/CssBaseline';

export default function App(props) {
	const [toggleDark, settoggleDark] = useState(false);
	const theme = createTheme(adaptV4Theme({
		palette: {
			//mode: toggleDark ? "dark" : "light",
			type: "dark",
		},
	}));

  return (
      <div className="center">
              <StyledEngineProvider injectFirst>
                  <ThemeProvider theme={theme}>
                      <CssBaseline/>
              <HomePage/>
                  </ThemeProvider>
              </StyledEngineProvider>
      </div>
  );
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);
