import { Paper, Typography, useTheme } from "@mui/material";
import React from "react";
import CardImage from "../../images/section6/card_bg.webp"
import Section6Bg from "../../images/section6/section6_bg.webp"
import AngelCoin from "../../images/section6/angel_coin.webp"

const Section5: React.FC = () => {
    const theme = useTheme()

    return (
        <section className="h-screen flex items-center justify--center relative px-4">
            <div className="mt-100 relative w-full">
                <div className="absolute left-1/2 transform -translate-x-1/2 -z-10 w-full -top-34 sm:-top-56 lg:-top-54 xl:-top-75 2xl:w-400">
                    <img
                        src={Section6Bg}
                        alt="section 6 bg"
                        className="w-full object-contain"
                    />
                </div>
                <Paper
                    className="container mx-auto relative"
                    sx={{
                        backgroundImage: `linear-gradient(to bottom right, ${theme.palette.primary.dark}, ${theme.palette.secondary.main}, ${theme.palette.secondary.light})`,
                        borderRadius: "32px",
                        padding: "4px"
                    }}
                >
                    <div className="flex items-center justify-center absolute inset-x-0 z-20 -top-15 sm:-top-24">
                        <div className="aspect-square w-32 sm:w-50">
                            <img
                                src={AngelCoin}
                                alt="angel coin"
                            />
                        </div>
                    </div>
                    <div 
                        className="w-full flex flex-col items-center justify-center rounded-4xl relative overflow-hidden !pt-24 !pb-12 !px-5 sm:!px-10 md:!pt-36 lg:h-118 lg:!px-18 xl:!px-26 xl:!pt-20"
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
                                    color: theme.palette.secondary.dark,
                                    fontWeight: 900
                                }}
                                className="!text-center !text-[32px] sm:!text-[40px] lg:!text-[52px] xl:!text-[64px]"
                            >
                                JOIN THE COMMUNITY
                            </Typography>   
                            <Typography
                                sx={{
                                    color: theme.palette.text.secondary,
                                    textAlign: "center",
                                    fontWeight: 500
                                }}
                                className="!text-lg sm:!text-[24px] lg:!leading-10 lg:!text-[32px] "
                            >
                                Become part of the Angel ecosystem—follow us on X and join us in our Discord server. Join a passionate community of Cardano users, dApp developers, and DeFi enthusiasts. Together, we grow on-chain and off-chain.   
                            </Typography>
                        </div>
                    </div>
                </Paper>
            </div>
        </section>
    );
};

export default Section5;