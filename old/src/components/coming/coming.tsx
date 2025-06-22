import { Typography, useTheme } from "@mui/material";
import React from "react";

export default function ComingSoon() {
    const theme = useTheme();
  return (
    <section className="w-full !h-full pt-30">
        <div className="container h-full mx-auto flex flex-col justify-center">
            <Typography 
                variant="h1"
                className="!text-xl sm:!text-3xl lg:!text-6xl"
                sx={{
                    fontFamily: "Cinzel",
                    fontWeight: 700,
                    color: theme.palette.primary.main,
                    textAlign: "center",
                }}
            >
                Coming Soon
            </Typography>
            <Typography 
                variant="body1" 
                className="text-center mt-4"
                sx={{ 
                    color: theme.palette.text.primary
                }}
            >
                We're working hard to bring you this page. Stay tuned!
            </Typography>
        </div>
    </section>
  );
}