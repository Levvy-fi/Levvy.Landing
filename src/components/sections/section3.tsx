import { Paper, Typography, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import LevvyLogo from "../../images/section3/levvy_logo.webp"
import LevvyShowcase from "../../images/section3/levvy_showcase.webp"
import LevvyMascot from "../../images/section3/levvy_mascot.webp"
import LevvyAngel from "../../images/section3/levvy_angel.webp"

const Section3: React.FC = () => {
    const theme = useTheme()

    return (
        <section 
            id="section3"
            className="h-267 flex items-center relative"
        >
            <div className="container mx-auto flex flex-col items-center justify-center">
                <div className="absolute flex items-center">
                    <div 
                        className="w-220 h-190 rounded-full !opacity-20 !blur-3xl"
                        style={{
                            backgroundImage: `linear-gradient(to right, ${theme.palette.gradient.levvy.main}, ${theme.palette.gradient.levvy.main_light})`
                        }}
                    />
                    <div 
                        className="w-100 h-100 rounded-r-full !opacity-20 !blur-3xl"
                        style={{
                            backgroundImage: `linear-gradient(to right, ${theme.palette.gradient.levvy.secondary}, ${theme.palette.gradient.levvy.secondary_light})`
                        }}
                    />
                </div>
                <div className="flex flex-col items-center justify-center">
                    <Typography 
                        sx={{
                            fontSize: 24,
                            fontWeight: 600,
                            color: theme.palette.primary.light
                        }}
                    >
                        Coming Soon...
                    </Typography>
                    <img
                        src={LevvyLogo}
                        alt="levvy logo"
                        className="object-contain h-16"
                    />
                    <Typography 
                        sx={{
                            fontSize: 18,
                            fontWeight: 500,
                            color: theme.palette.text.primary,
                            textAlign: "center",
                            marginTop: "20px"
                        }}
                        className="max-w-159 !tracking-[1px]"
                    >
                        Levvy V3 is the next-gen NFT and token lending platform on Cardano—faster, smarter, and powered by Angel Finance.
                    </Typography>
                </div>
                <div className="relative">
                    <div className="absolute w-100 -left-30 bottom-38">
                        <img
                            src={LevvyAngel}
                            alt="levvy mascot"
                        />
                    </div>
                    <div className="absolute w-46 right-47 -top-14">
                        <img
                            src={LevvyMascot}
                            alt="levvy mascot"
                        />
                    </div>
                    <div className="w-320 mt-10">
                        <img
                            src={LevvyShowcase}
                            alt="levvy showcase"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Section3;