import React, { ReactNode } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { WalletProvider } from "../../contexts/WalletContext";

declare module "@mui/material/styles" {
  interface Palette {
    gradient: {
      levvy: {
        main: string;
        main_light: string;
        main_dark: string;
        secondary: string;
        secondary_light: string;
        secondary_dark: string;
      },
      button: {
        10: string,
        20: string,
        30: string,
        40: string,
        50: string,
        60: string,
        70: string
      },
      background: {
        10: string,
        20: string
      }
    },
    chart: {
      50: string,
      100: string,
      200: string,
      300: string,
      400: string,    
    },
    levvy: {
      primary: string;
      secondary: string;
      secondary_dark: string;
    }
      
  }

  interface PaletteOptions {
    gradient?: {
      levvy?: {
        main?: string;
        main_light?: string;
        main_dark?: string;
        secondary?: string;
        secondary_light?: string;
        secondary_dark?: string;
      },
      button?: {
        10: string,
        20: string,
        30: string,
        40: string,
        50: string,
        60: string,
        70: string
      },
      background?: {
        10: string,
        20: string
      }
    },
    levvy?: {
      primary: string;
      secondary: string;
      secondary_dark: string;
    },
    chart?: {
      50: string,
      100: string,
      200: string,
      300: string,
      400: string,    
    }
  }
}

const theme = createTheme({
    palette: {
        background: {
          default: "#151412",
          paper: "#232121"
        },
        primary: {
          light: "#FFD89F",
          main: "#FCB040",
          dark: "#B77828",
          contrastText: "#151412"
        },
        secondary: {
          light: "#F8F8F8",
          main: "#E1B33A",
          dark: "#432C00"
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#EDDCBD",
          disabled: "#707070"
        },
        levvy: {
          primary: "#FCB040",
          secondary: "#B77828",
          secondary_dark: "#432C00"
        },
        gradient: {
          levvy: {
            main: "#50CEC8",
            main_light: "#F7FF19",
            main_dark: "#E1B33A",
            secondary: "#FFE77F",
            secondary_light: "#FF700F",
            secondary_dark: "#432C00"
          },
          button: {
            10: "#EDDCBD",
            20: "#FCB040",
            30: "#B77828",
            40: "#E1B33A",
            50: "#232121",
            60: "#432C00",
            70: "#F8F8F8",
          },
          background: {
            10: "#232121",
            20: "#151412"
          }
        },
        chart: {
          50: "#232121",
          100: "#FCB040",
          200: "#E1B33A",
          300: "#B77828",
          400: "#151412"
        },
        error: {
          main: "#C34642"
        },
        grey: {
          50: "#FFFFFF",
          100: "#F8F8F8",
          200: "#EDDCBD",
          300: "#707070",
          400: "#232121",
          500: "#151412",
          600: "#151412",
          900: "#232121",
          A100: "#151412"
        }
    },
    typography: {
      fontFamily: ["Albert Sans", "serif"].join(","),
    }
});

const MainLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <WalletProvider>
        {children}
      </WalletProvider>
    </ThemeProvider>
  );
};

export default MainLayout;