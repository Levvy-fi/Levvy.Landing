import { Paper, Typography, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import LevvyLogo from "../../images/section3/levvy_logo.webp"
import LevvyShowcase from "../../images/section3/levvy_showcase.webp"
import LevvyMascot from "../../images/section3/levvy_mascot.webp"
import LevvyAngel from "../../images/section3/levvy_angel.webp"
import StarsTops from "../../images/section3/stars_top_background.svg"
import StarsBottom from "../../images/section3/stars_bottom_background.svg"

const Section3: React.FC = () => {
    const theme = useTheme()

    return (
        <section 
            id="section3"
            style={{backgroundColor: theme.palette.grey.A100}}
            className="h-267 flex items-center relative overflow-hidden"
        >
            <div className="w-full absolute top-0 left-0">
                <img src={StarsTops} alt="Stars Top Background"/>
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
                <div className="flex flex-col items-center justify-center">
                    <Typography 
                        sx={{
                            fontWeight: 600,
                            color: theme.palette.primary.light
                        }}
                        className="!text-base !mb-2 lg:mb-0 lg:!text-6"
                    >
                        Coming Soon...
                    </Typography>
                    <img
                        src={LevvyLogo}
                        alt="levvy logo"
                        className="object-contain h-12 lg:h-16"
                    />
                    <Typography 
                        sx={{
                            fontWeight: 500,
                            color: theme.palette.text.primary,
                            textAlign: "center",
                            marginTop: "20px"
                        }}
                        className="max-w-159 !tracking-[1px] !text-base p-5 !mt-4 lg:!text-lg lg:p-0"
                    >
                        Levvy V3 is the next-gen NFT and token lending platform on Cardano—faster, smarter, and powered by Angel Finance.
                    </Typography>
                </div>
                <div className="relative">
                    <div className="absolute !w-[112px] left-5 top-5 sm:!w-[150px] sm:bottom-93  md:bottom-[445px]] md:left-[33px] lg:-left-[58px] lg:top-75 lg:!w-80 xl:!w-95 xl:!top-[350px] 2xl:-left-12 2xl:!top-[500px] 2xl:!w-100">
                        <img
                            src={LevvyAngel}
                            alt="levvy angel"
                        />
                    </div>
                    <div className="absolute !w-20 right-22 top-9 sm:!w-25 sm:right-20 sm:top-[26px] lg:!w-30 lg:top-[5px] lg:right-[109px]  xl:!w-40 xl:-top-[50px] xl:right-[120px] 2xl:-top-14 2xl:right-[195px] 2xl:!w-46">
                        <img
                            src={LevvyMascot}
                            alt="levvy mascot"
                        />
                    </div>
                    <div className="mt-20 ml-10 lg:mt-18 lg:!ml-10 lg:w-200 xl:mt-10 xl:!ml-[85px] xl:w-250 2xl:w-320">
                        <img
                            src={LevvyShowcase}
                            alt="levvy showcase"
                        />
                    </div>
                </div>
            </div>
            <div className="w-full absolute bottom-0 left-0">
                <img src={StarsBottom} alt="Stars Bottom Background"/>
            </div>
        </section>
    );
};

export default Section3;