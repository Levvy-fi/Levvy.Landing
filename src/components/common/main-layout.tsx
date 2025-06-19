import React, { ReactNode } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    gradient: {
      levvy: {
        main: string;
        main_light: string;
        secondary: string;
        secondary_light: string;
      },
    }
  }

  interface PaletteOptions {
    gradient?: {
      levvy?: {
        main: string;
        main_light: string;
        secondary: string;
        secondary_light: string;
      },
    }
  }
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
        secondary: {
          light: "#FFEFD2",
          main: "#FFD78E",
          dark: "#432C00"
        },
        text: {
          primary: "#EDE1D3",
          secondary: "#6C4900"
        },
        gradient: {
          levvy: {
            main: "#50CEC8",
            main_light: "#F7FF19",
            secondary: "#FFE77F",
            secondary_light: "#FF700F"
          }
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