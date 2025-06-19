import { Paper, Typography, useTheme } from "@mui/material";
import React from "react";
import CardImage from "../../images/section6/card_bg.webp"
import Section6Bg from "../../images/section6/section6_bg.webp"
import AngelCoin from "../../images/section6/angel_coin.webp"

const Section6: React.FC = () => {
    const theme = useTheme()

    return (
        <section className="h-screen flex items-center justify--center relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-500 -z-10">
                <img
                    src={Section6Bg}
                    alt="section 6 bg"
                    className="w-full object-contain"
                />
            </div>
            <Paper
                className="container mx-auto mt-100 relative"
                sx={{
                    backgroundImage: `linear-gradient(to bottom right, ${theme.palette.primary.dark}, ${theme.palette.secondary.main}, ${theme.palette.secondary.light})`,
                    borderRadius: "32px",
                    padding: "2px"
                }}
            >
                <div className="flex items-center justify-center absolute inset-x-0 -top-24 z-20">
                    <div className="w-50 aspect-square">
                        <img
                            src={AngelCoin}
                            alt="angel coin"
                        />
                    </div>
                </div>
                <div 
                    className="w-full flex flex-col items-center justify-center rounded-4xl h-118 !px-26 !pt-16 relative overflow-hidden"
                    style={{
                        backgroundColor: theme.palette.primary.main,
                    }}
                >
                    <div className="absolute opacity-20 w-500">
                        <img
                            src={CardImage}
                            alt="angels background"
                            className="w-full object-contain"
                        />
                    </div>
                    <div className="flex flex-col items-center gap-4 z-20">
                        <Typography
                            sx={{
                                fontFamily: "Cinzel",
                                color: theme.palette.text.secondary,
                                fontWeight: 900
                            }}
                            className="!text-[64px]"
                        >
                            JOIN THE COMMUNITY
                        </Typography>   
                        <Typography
                            sx={{
                                color: theme.palette.text.secondary,
                                textAlign: "center",
                                fontWeight: 500
                            }}
                            className="!text-[32px] !leading-10"
                        >
                            Become part of the Angel ecosystem—follow us on X and join us in our Discord server. Join a passionate community of Cardano users, dApp developers, and DeFi enthusiasts. Together, we grow on-chain and off-chain.   
                        </Typography>
                    </div>
                </div>
            </Paper>
        </section>
    );
};

export default Section6;