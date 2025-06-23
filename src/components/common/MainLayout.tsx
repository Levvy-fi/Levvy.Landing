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
          default: "#12100F",
          paper: "#201B13"
        },
        primary: {
          light: "#FFD89F",
          main: "#F9B63E",
          dark: "#844C1F",
          contrastText: "#7F5700"
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
        levvy: {
          primary: "#FFCA60",
        },
        gradient: {
          levvy: {
            main: "#50CEC8",
            main_light: "#F7FF19",
            main_dark: "#CD6600",
            secondary: "#FFE77F",
            secondary_light: "#FF700F",
            secondary_dark: "#FFC560"
          },
          button: {
            10: "#FFE0A2",
            20: "#F9B63E",
            30: "#B7792A",
            40: "#FFB119",
            50: "#4C2B0F",
            60: "#B77828",
            70: "#F2E0CA",
          },
          background: {
            10: "#2A2112",
            20: "#12100F"
          }
        },
        chart: {
          50: "#2F2920",
          100: "#FEBA42",
          200: "#C08501",
          300: "#7F5700",
          400: "#1A0F00"
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
          900: "#3F382F",
          A100: "#101921"
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