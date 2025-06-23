import { Button, Typography, useTheme } from "@mui/material";
import React from "react";

const Section3: React.FC = () => {
    const theme = useTheme()

    return (
        <section
            id="section3"
            style={{ backgroundColor: theme.palette.grey.A100 }}
            className="h-267 flex items-center relative overflow-hidden [mask-image:_linear-gradient(to_bottom,transparent_0,_black_80px,_black_calc(100%-200px),transparent_100%)]"
        >
            <div className="w-full absolute top-0 left-0">
                <img src="/images/section3/stars_top_background.svg" alt="Stars Top Background" />
            </div>
            <div className="container mx-auto flex flex-col items-center justify-center">
                <div className="absolute flex items-center">
                    <div
                        className="w-100 lg:w-120 xl:w-180 2xl:w-220 h-190 rounded-full !opacity-20 !blur-3xl"
                        style={{
                            backgroundImage: `linear-gradient(to right, ${theme.palette.gradient.levvy.main}, ${theme.palette.gradient.levvy.main_light})`
                        }}
                    />
                    <div
                        className="w-20 sm:w-50 :md:w-80 lg:w-120 xl:w-180 2xl:w-220 h-100 rounded-r-full !opacity-20 !blur-3xl"
                        style={{
                            backgroundImage: `linear-gradient(to right, ${theme.palette.gradient.levvy.secondary}, ${theme.palette.gradient.levvy.secondary_light})`
                        }}
                    />
                </div>
                <div className="z-10">
                    <div className="flex flex-col items-center justify-center">
                        <Typography
                            sx={{
                                fontWeight: 600,
                                color: theme.palette.primary.light
                            }}
                            className="!text-base !mb-4 lg:mb-0 lg:!text-[24px]"
                        >
                            Coming Soon...
                        </Typography>
                        <img
                            src="/images/section3/levvy_logo.webp"
                            alt="levvy logo"
                            className="object-contain h-12 lg:h-16"
                        />
                        <div className="bg-linear-to-r from-[#FF9934] to-[#FFCC66] !p-6">
                            <Typography
                                className="!text-[64px] !leading-[66px] !text-center !font-black bg-gradient-to-r from-[#FF9934] to-[#FFCC66] text-transparent bg-clip-text"
                            >
                                <span>Effortless </span>
                                <span style={{ color: theme.palette.grey[50] }}>Lending,</span><br />
                                <span> Instant Liquidity</span>
                            </Typography>
                        </div>
                        <Typography
                            sx={{
                                fontWeight: 500,
                                color: theme.palette.text.primary,
                                textAlign: "center",
                            }}
                            className="max-w-159 !tracking-[1px] !text-base p-5 !mb-6 lg:!text-lg lg:p-0"
                        >
                            Maximize liquidity & earnings lending and borrowing tokens or NFTs.
                        </Typography>
                        <div className="flex items-center !gap-4">
                            <Button
                                startIcon={<img src="/images/icons/white_paper.svg" alt="White Paper Icon" />}
                                sx={{
                                    backgroundColor: theme.palette.levvy.primary,
                                    textTransform: "capitalize",
                                    color: theme.palette.grey.A100,
                                    fontWeight: 700,
                                    borderRadius: "12px"
                                }}
                                className="w-[137px] h-[40px]"
                            >
                                White Paper
                            </Button>
                            <div 
                                style={{
                                    backgroundImage: `linear-gradient(to right, ${theme.palette.gradient.levvy.main_dark}, ${theme.palette.gradient.levvy.secondary_dark})`,
                                    borderRadius: "12px"
                                }} 
                                className="!p-[2px]"
                            >
                                <Button
                                    startIcon={<img src="/images/icons/levvy.svg" alt="White Paper Icon" />}
                                    sx={{
                                        backgroundColor: theme.palette.grey.A100,
                                        textTransform: "capitalize",
                                        color: theme.palette.primary.main,
                                        fontWeight: 700,
                                        borderRadius: "12px"
                                    }}
                                    className="w-[137px] h-[40px]"
                                >
                                    Open App
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="relative z-5">
                        <div className="mt-20 ml-10 lg:mt-18 lg:!ml-10 lg:w-200 xl:mt-10 xl:!ml-[85px] xl:w-250 2xl:w-[700px]">
                            <img
                                src="/images/section3/levvy_mascot.webp"
                                alt="levvy showcase"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full absolute bottom-0 left-0 !z-0">
                <img src="/images/section3/stars_bottom_background.svg" alt="Stars Bottom Background" />
            </div>
        </section>
    );
};

export default Section3;