import { Card, IconButton, Typography, useTheme } from "@mui/material";
import React from "react";
import XIcon from "../../images/socials/xIcon";
import DiscordIcon from "../../images/socials/discordIcon";
import CardBG from "../../images/section4/card_bg.webp";
import SectionBg from "../../images/section4/section_bg.webp";


const Section4: React.FC = () => {
    const theme = useTheme()

    return (
        <section className="flex relative bg-cover !py-50" style={{ backgroundImage: `url(${SectionBg})` }}>
            <div className="container mx-auto text-center">
                <div>
                    <Typography
                        sx={{
                            fontFamily: "Cinzel",
                            color: theme.palette.primary.main,
                            textTransform: "uppercase"
                        }}
                        className="!text-[56px] !font-bold"
                    >
                        angel finance
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: "Cinzel",
                            color: theme.palette.primary.light,
                            textTransform: "uppercase"
                        }}
                        className="!text-[120px] !font-bold"
                    >
                        $Angels sale
                    </Typography>
                </div>
                <div className="w-full flex flex-col items-center justify-center">
                    <Typography 
                        sx={{
                            color: theme.palette.text.primary,
                            fontSize: 24
                        }}
                        className="w-198"
                    >
                        <span className="font-bold">$ANGELS </span>
                        <span>is not another governance token. It's a token with </span>
                        <span className="font-bold">real utility</span> <span>that rewards you with ADA on the 15th of every month.</span>
                        <br/>
                    </Typography>
                    <Typography 
                        sx={{
                            color: theme.palette.text.primary,
                            fontSize: 24
                        }}
                        className="w-204 !mt-4"
                    >
                        <span>Join us as we undergo one of the largest project expansions on Cardano. </span>
                        <span>For more information, visit:</span>
                    </Typography>
                    <div className="!space-x-4 !mt-4">
                        <IconButton 
                            aria-label="x"
                            sx={{
                                width: "48px",
                                height: "48px",
                                backgroundColor: theme.palette.primary.light
                            }}
                            className="!rounded-full"
                        >
                            <XIcon sx={{color: theme.palette.text.disabled}}/>
                        </IconButton>
                        <IconButton 
                            aria-label="x"
                            sx={{
                                width: "48px",
                                height: "48px",
                                backgroundColor: theme.palette.primary.light
                            }}
                            className="!rounded-full"
                        >
                            <DiscordIcon sx={{color: theme.palette.text.disabled}}/>
                        </IconButton>
                    </div>
                </div>
                <div className="grid grid-cols-4 h-66 gap-8 !mt-20">
                    <Card
                        sx={{
                            borderRadius: "40px",
                            display: "flex",
                            transition: "all 0.3s ease-in-out",
                            "&:hover": {
                                backgroundColor: theme.palette.primary.main,
                            },
                            "&:hover .hover-target": {
                                color: theme.palette.secondary.dark
                            },
                        }}
                        className="!flex-col !items-start !justify-center !px-14 cursor-pointer"
                    >
                        <Typography
                            sx={{
                                fontFamily: "Cinzel",
                                fontWeight: 700,
                                color: theme.palette.primary.light
                            }}
                            className="hover-target !text-[64px]"
                        >
                            504K
                        </Typography>
                        <Typography
                            className="hover-target !text-lg uppercase !text-left"
                        >
                            <span>New token supply <br/> for </span>
                            <span className="font-bold">
                                $ANGELS
                            </span>
                        </Typography>
                    </Card>
                    <Card
                        sx={{
                            borderRadius: "40px",
                            display: "flex",
                            transition: "all 0.3s ease-in-out",
                            "&:hover": {
                                backgroundColor: theme.palette.primary.main,
                            },
                            "&:hover .hover-target": {
                                color: theme.palette.secondary.dark
                            },
                        }}
                        className="!flex-col !items-start !justify-center !px-14 cursor-pointer"
                    >
                        <Typography
                            sx={{
                                fontFamily: "Cinzel",
                                fontWeight: 700,
                                color: theme.palette.primary.light
                            }}
                            className="hover-target !text-[64px]"
                        >
                            60K
                        </Typography>
                        <Typography
                            className="hover-target !text-lg uppercase !text-left"
                        >
                            <span className="font-bold">$ANGELS </span>
                            <span>
                                RESERVED <br/> FOR LP
                            </span>
                        </Typography>
                    </Card>
                    <Card
                        sx={{
                            borderRadius: "40px",
                            display: "flex",
                            transition: "all 0.3s ease-in-out",
                            "&:hover": {
                                backgroundColor: theme.palette.primary.main,
                            },
                            "&:hover .hover-target": {
                                color: theme.palette.secondary.dark
                            },
                        }}
                        className="!flex-col !items-start !justify-center !px-14 cursor-pointer"
                    >
                        <Typography
                            sx={{
                                fontFamily: "Cinzel",
                                fontWeight: 700,
                                color: theme.palette.primary.light
                            }}
                            className="hover-target !text-[64px]"
                        >
                            444K
                        </Typography>
                        <Typography
                            className="hover-target !text-lg uppercase !text-left"
                        >
                            <span className="font-bold">$ANGELS </span>
                            <span>
                                RESERVED <br/> FOR SALE
                            </span>
                        </Typography>
                    </Card>
                    <Card
                        sx={{
                            borderRadius: "40px",
                            display: "flex",
                            transition: "all 0.3s ease-in-out",
                            "&:hover": {
                                backgroundColor: theme.palette.primary.main,
                            },
                            "&:hover .hover-target": {
                                color: theme.palette.secondary.dark
                            },
                        }}
                        className="!flex-col !items-start !justify-center !px-14 cursor-pointer"
                    >
                        <Typography
                            sx={{
                                fontFamily: "Cinzel",
                                fontWeight: 700,
                                color: theme.palette.primary.light
                            }}
                            className="hover-target !text-[64px]"
                        >
                            ₳3
                        </Typography>
                        <Typography
                            className="hover-target !text-lg uppercase !text-left"
                        >
                            <span className="font-bold">$ANGELS </span>
                            <span>
                                TOKEN <br/> SALE PRICE
                            </span>
                        </Typography>
                    </Card>
                </div>
                <div className="flex flex-col items-center justify-center !mt-10 !space-y-4">
                    <Typography
                        sx={{
                            color: theme.palette.text.primary
                        }}
                        className="!text-2xl"
                    >
                        Sale opens in: 
                    </Typography>
                    <div className="grid grid-cols-4  !gap-6">
                        <div className="flex flex-col items-center gap-4">
                            <Card
                                sx={{
                                    backgroundImage: `linear-gradient(to bottom right, ${theme.palette.primary.dark}, ${theme.palette.secondary.main}, ${theme.palette.secondary.light})`,
                                    borderRadius: "8px",
                                    padding: "4px"
                                }}
                            >
                                <div className="rounded-lg !px-3" style={{backgroundColor: theme.palette.primary.main}}>
                                    <Typography 
                                        sx={{
                                            fontFamily: "Cinzel",
                                            color: theme.palette.secondary.dark
                                        }}
                                        className="!text-[64px] !font-bold"
                                    >
                                        03
                                    </Typography>
                                </div>
                            </Card>
                            <Typography
                                sx={{
                                    color: theme.palette.text.primary,
                                }}
                                className="!text-2xl"
                            >
                                Days
                            </Typography>
                        </div>
                        <div className="flex flex-col items-center gap-4">
                            <Card
                                sx={{
                                    backgroundImage: `linear-gradient(to bottom right, ${theme.palette.primary.dark}, ${theme.palette.secondary.main}, ${theme.palette.secondary.light})`,
                                    borderRadius: "8px",
                                    padding: "4px"
                                }}
                            >
                                <div className="rounded-lg !px-3" style={{backgroundColor: theme.palette.primary.main}}>
                                    <Typography 
                                        sx={{
                                            fontFamily: "Cinzel",
                                            color: theme.palette.secondary.dark
                                        }}
                                        className="!text-[64px] !font-bold"
                                    >
                                        03
                                    </Typography>
                                </div>
                            </Card>
                            <Typography
                                sx={{
                                    color: theme.palette.text.primary,
                                }}
                                className="!text-2xl"
                            >
                                Hours
                            </Typography>
                        </div>
                        <div className="flex flex-col items-center gap-4">
                            <Card
                                sx={{
                                    backgroundImage: `linear-gradient(to bottom right, ${theme.palette.primary.dark}, ${theme.palette.secondary.main}, ${theme.palette.secondary.light})`,
                                    borderRadius: "8px",
                                    padding: "4px"
                                }}
                            >
                                <div className="rounded-lg !px-3" style={{backgroundColor: theme.palette.primary.main}}>
                                    <Typography 
                                        sx={{
                                            fontFamily: "Cinzel",
                                            color: theme.palette.secondary.dark
                                        }}
                                        className="!text-[64px] !font-bold"
                                    >
                                        03
                                    </Typography>
                                </div>
                            </Card>
                            <Typography
                                sx={{
                                    color: theme.palette.text.primary,
                                }}
                                className="!text-2xl"
                            >
                                Minutes
                            </Typography>
                        </div>
                        <div className="flex flex-col items-center gap-4">
                            <Card
                                sx={{
                                    backgroundImage: `linear-gradient(to bottom right, ${theme.palette.primary.dark}, ${theme.palette.secondary.main}, ${theme.palette.secondary.light})`,
                                    borderRadius: "8px",
                                    padding: "4px"
                                }}
                            >
                                <div className="rounded-lg !px-3" style={{backgroundColor: theme.palette.primary.main}}>
                                    <Typography 
                                        sx={{
                                            fontFamily: "Cinzel",
                                            color: theme.palette.secondary.dark
                                        }}
                                        className="!text-[64px] !font-bold"
                                    >
                                        03
                                    </Typography>
                                </div>
                            </Card>
                            <Typography
                                sx={{
                                    color: theme.palette.text.primary,
                                }}
                                className="!text-2xl"
                            >
                                Seconds
                            </Typography>
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-col items-center justify-center !gap-10 !mt-10">
                    <Card
                        sx={{
                            backgroundImage: `linear-gradient(to bottom right, ${theme.palette.primary.dark}, ${theme.palette.secondary.main}, ${theme.palette.secondary.light})`,
                            borderRadius: "8px",
                            padding: "4px"
                        }}
                        className="!w-150"
                    >
                        <div 
                            style={{backgroundColor: theme.palette.grey[900]}} 
                            className="!rounded-lg w-full !flex !items-center !justify-between !py-6 !px-10 relative overflow-hidden"
                        >
                            <div className="absolute w-200 left-0">
                                <img
                                    src={CardBG}
                                    alt="card background"
                                    className="w-full object-contain"
                                />
                            </div>
                            <div className="z-10">
                                <Typography
                                    sx={{
                                        fontFamily: "Cinzel",
                                        fontWeight: 700,
                                        color: theme.palette.primary.main
                                    }}
                                    className="!text-[40px]"
                                >
                                    PUBLIC MINT
                                </Typography>
                            </div>
                            <div className="z-10">
                                <Typography
                                    sx={{
                                        color: theme.palette.text.primary,
                                        fontWeight: 700
                                    }}
                                    className="!text-2xl"
                                >
                                    6/21/2025
                                </Typography>
                                <Typography
                                    sx={{
                                        color: theme.palette.text.primary,
                                    }}
                                    className="!text-2xl"
                                >
                                    9:00:00 PM
                                </Typography>
                            </div>
                        </div>
                    </Card>
                    <Typography
                        sx={{
                            fontWeight: 600,
                            color: theme.palette.text.primary
                        }}
                        className="!text-[36px]"
                    >
                        The sale has not started yet
                    </Typography>
                </div>
            </div>
        </section>
    );
};

export default Section4;