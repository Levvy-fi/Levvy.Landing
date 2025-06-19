import React, { ReactNode } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
}

const theme = createTheme({
    palette: {
        background: {
            default: "#12100F",
            paper: "#201B13"
        },
        primary: {
          light: "#FFD89F",
          main: "#F9B63E",
          dark: "#844C1F"
        },
        text: {
          primary: "#EDE1D3"
        }
    },
    typography: {
      fontFamily: ["Albert Sans", "serif"].join(","),
    }
});

const MainLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
};

export default MainLayout;