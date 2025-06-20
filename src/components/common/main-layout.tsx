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
      button: {
        10: string,
        20: string,
        30: string,
        40: string,
        50: string,
        60: string
      }
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
      button?: {
        10: string,
        20: string,
        30: string,
        40: string,
        50: string,
        60: string
      }
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
          secondary: "#6C4900",
          disabled: "#504535"
        },
        gradient: {
          levvy: {
            main: "#50CEC8",
            main_light: "#F7FF19",
            secondary: "#FFE77F",
            secondary_light: "#FF700F"
          },
          button: {
            10: "#FFE0A2",
            20: "#F9B63E",
            30: "#B7792A",
            40: "#FFB119",
            50: "#4C2B0F",
            60: "#B77828",
          }
        },
        error: {
          main: "#C34642"
        },
        grey: {
          50: "#FFFFFF",
          100: "#D5C4AF",
          200: "#7B7B7B",
          300: "#2F2920",
          400: "#3A342B",
          500: "#251F16",
          900: "#3F382F"
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