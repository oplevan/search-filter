import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";
import theme from "./styles/theme";

import { ThemeProvider } from "@mui/material/styles";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);
