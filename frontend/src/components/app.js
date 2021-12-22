import React, { Component, useState } from "react";
import { render } from "react-dom";
import HomePage from "./homepage";
import {
  createTheme,
  ThemeProvider,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { FormControlLabel, Switch } from "@mui/material";

export default function App(props) {
  const [toggleDark, settoggleDark] = useState(true);
  const theme = createTheme({
    palette: {
      mode: toggleDark ? "dark" : "light",
    },
  });

  return (
    <div className="center">
        <ThemeProvider theme={theme}>
          <CssBaseline/>
            <HomePage/>
        </ThemeProvider>
    </div>
  );
}
/*
Für switchen von light und dark mode
<FormControlLabel control={ 
            <Switch checked={toggleDark} onChange={() => {settoggleDark(!toggleDark)}}/>
          } label="Theme"/>
*/

const appDiv = document.getElementById("app");
render(<App/>, appDiv);
