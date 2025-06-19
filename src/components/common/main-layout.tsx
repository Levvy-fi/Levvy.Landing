import React, { ReactNode } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
}

const theme = createTheme({
    palette: {
        background: {
            default: "#ffffff"
        }
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