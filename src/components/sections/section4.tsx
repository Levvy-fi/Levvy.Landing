import { Button, Card, IconButton, keyframes, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import XIcon from "../../images/socials/xIcon";
import DiscordIcon from "../../images/socials/discordIcon";
import CardBG from "../../images/section4/card_bg.webp";
import CardBG2 from "../../images/section4/card_bg2.webp";
import SectionBg from "../../images/section4/section_bg.webp";
import QrCode from "../../images/section4/qr_code.webp";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import WalletIcon from "../../images/icons/wallet";
import Border from "../../images/section4/border.webp";

const Section4: React.FC = () => {
    const theme = useTheme()

    const [countDownTimer, setCountDownTimer] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });
    const [showDisplay, setShowDisplay] = useState(false);

    const gradientShift = keyframes`
        0%   { background-position:   0% 50%; }
        50%  { background-position: 100% 50%; }
        100% { background-position:   0% 50%; }
    `;

    useEffect(() => {
        const targetDate = new Date("2025-06-21T21:00:00+08:00").getTime();

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance <= 0) {
                clearInterval(interval);
                setCountDownTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                setShowDisplay(true)
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setCountDownTimer({ days, hours, minutes, seconds });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="flex relative bg-cover !py-50 [mask-image:_linear-gradient(to_bottom,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]" style={{ backgroundImage: `url(${SectionBg})` }}>
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
                        <br />
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
                                backgroundColor: theme.palette.primary.light,
                                "&:hover": {
                                    backgroundColor: theme.palette.primary.main
                                },
                                "&:active": {
                                    backgroundColor: theme.palette.primary.contrastText
                                }
                            }}
                            className="!rounded-full"
                        >
                            <XIcon sx={{ color: theme.palette.secondary.dark }} className="!text-2xl" />
                        </IconButton>
                        <IconButton
                            aria-label="x"
                            sx={{
                                width: "48px",
                                height: "48px",
                                backgroundColor: theme.palette.primary.light,
                                "&:hover": {
                                    backgroundColor: theme.palette.primary.main
                                },
                                "&:active": {
                                    backgroundColor: theme.palette.primary.contrastText
                                }
                            }}
                            className="!rounded-full"
                        >
                            <DiscordIcon sx={{ color: theme.palette.secondary.dark }} className="!text-2xl" />
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
                            <span>New token supply <br /> for </span>
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
                                RESERVED <br /> FOR LP
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
                                RESERVED <br /> FOR SALE
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
                                TOKEN <br /> SALE PRICE
                            </span>
                        </Typography>
                    </Card>
                </div>
                {showDisplay && (
                    <div className="w-full flex flex-col items-center justify-center">
                        <Card
                            sx={{
                                backgroundImage: `linear-gradient(to bottom right, ${theme.palette.primary.dark}, ${theme.palette.secondary.main}, ${theme.palette.secondary.light})`,
                                borderRadius: "16px",
                                padding: "4px"
                            }}
                            className="!mt-14 !mb-8"
                        >
                            <div style={{ backgroundColor: theme.palette.grey[900] }} className="h-75 w-190 overflow-hidden relative flex items-center justify-between rounded-2xl !p-6 !gap-6    ">
                                <div className="absolute w-230 left-0">
                                    <img
                                        src={CardBG2}
                                        alt="card background"
                                    />
                                </div>
                                <div className="z-10 flex flex-col justify-between h-full">
                                    <div className="!text-start">
                                        <Typography
                                            sx={{
                                                fontFamily: "Cinzel",
                                                color: theme.palette.primary.main,
                                                fontWeight: 700
                                            }}
                                            className="!text-[40px]"
                                        >
                                            BUY $ANGELS NOW
                                        </Typography>
                                        <Typography
                                            sx={{
                                                fontWeight: 500
                                            }}
                                            className="!text-lg"
                                        >
                                            Scan the QR code, copy the policy address below, or connect your wallet to start buying
                                        </Typography>
                                    </div>
                                    <div className="w-full flex items-center justify-between !p-2 relative rounded-sm" style={{ border: `1px solid ${theme.palette.text.disabled}` }}>
                                        <div className="absolute -top-2">
                                            <Typography
                                                sx={{
                                                    fontWeight: 400,
                                                    color: theme.palette.primary.main,
                                                }}
                                                className="!text-xs"
                                            >
                                                Policy ID
                                            </Typography>
                                        </div>
                                        <Typography>
                                            8fe8039d057c71fdf........d85d9c868ddf7307bc
                                        </Typography>
                                        <ContentCopyIcon
                                            sx={{
                                                color: theme.palette.primary.main
                                            }}
                                            className="!text-[20px]"
                                        />
                                    </div>
                                    <div className="flex">
                                        <Button
                                            disableRipple
                                            sx={{
                                                backgroundImage: `linear-gradient(to right, 
                                                            ${theme.palette.gradient.button[30]}, 
                                                            ${theme.palette.gradient.button[20]} 41%, 
                                                            ${theme.palette.gradient.button[10]}, 
                                                            ${theme.palette.gradient.button[30]})`,
                                                borderRadius: "12px",
                                                gap: "10px",
                                                backgroundSize: "200% 100%",
                                                animation: `${gradientShift} 6s ease-in-out infinite`,
                                                transition: "all 0.3s ease-in-out",
                                                "&:hover": {
                                                    backgroundImage: `linear-gradient(to right, 
                                                            ${theme.palette.gradient.button[30]}, 
                                                            ${theme.palette.primary.main} 100%, 
                                                            ${theme.palette.gradient.button[40]}, 
                                                            ${theme.palette.gradient.button[50]})`,
                                                },
                                                "&:active": {
                                                    backgroundImage: `linear-gradient(to right, ${theme.palette.gradient.button[60]})`
                                                }
                                            }}
                                            className="!w-39 !h-12 !content-start"
                                        >
                                            <WalletIcon sx={{ color: theme.palette.secondary.dark, fontSize: "24px" }} />
                                            <Typography
                                                sx={{
                                                    color: theme.palette.secondary.dark,
                                                    fontWeight: 500
                                                }}
                                                className="!text-sm capitalize"
                                            >
                                                Connect Wallet
                                            </Typography>
                                        </Button>
                                    </div>
                                </div>
                                <div className="z-10 w-64 aspect-square flex-shrink-0">
                                    <img
                                        src={QrCode}
                                        alt="qr code"
                                    />
                                </div>
                            </div>
                        </Card>
                        <div className="relative mb-16">
                            <div className="absolute ml-4 w-200 mt-12 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <img
                                    src={Border}
                                    alt="border"
                                />
                            </div>
                            <div>
                                <Typography
                                    sx={{
                                        color: theme.palette.primary.main,
                                        fontWeight: 700,
                                        fontFamily: "Cinzel",
                                    }}
                                    className="!text-[36px]"
                                >
                                    Sale Progress
                                </Typography>
                            </div>
                            <div className="flex items-center justify-center !gap-18">
                                <div>
                                    <Typography
                                        sx={{
                                            color: theme.palette.primary.light,
                                            fontWeight: 700,
                                            fontFamily: "Cinzel",
                                        }}
                                        className="!text-[80px]"
                                    >
                                        520K
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: theme.palette.text.primary,
                                            fontFamily: 500
                                        }}
                                        className="!text-xl"
                                    >
                                        Total $ANGELS <br /> bought globally
                                    </Typography>
                                </div>
                                <div>
                                    <Typography
                                        sx={{
                                            color: theme.palette.primary.light,
                                            fontWeight: 700,
                                            fontFamily: "Cinzel",
                                        }}
                                        className="!text-[80px]"
                                    >
                                        324
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: theme.palette.text.primary,
                                            fontFamily: 500
                                        }}
                                        className="!text-xl"
                                    >
                                        Total $ANGELS <br /> you bought
                                    </Typography>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div className="flex flex-col items-center justify-center !mt-10 !space-y-4">
                    <Typography
                        sx={{
                            color: theme.palette.text.primary
                        }}
                        className="!text-2xl"
                    >
                        Sale opens in:
                    </Typography>
                    <div className="grid grid-cols-4 !gap-6">
                        <div className="flex flex-col items-center gap-4">
                            <Card
                                sx={{
                                    backgroundImage: `linear-gradient(to bottom right, ${theme.palette.primary.dark}, ${theme.palette.secondary.main}, ${theme.palette.secondary.light})`,
                                    borderRadius: "8px",
                                    padding: "4px"
                                }}
                                className="!w-26"
                            >
                                <div className="rounded-lg !px-3" style={{ backgroundColor: theme.palette.primary.main }}>
                                    <Typography
                                        sx={{
                                            fontFamily: "Cinzel",
                                            color: theme.palette.secondary.dark
                                        }}
                                        className="!text-[64px] !font-bold"
                                    >
                                        {countDownTimer.days}
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
                                className="!w-26"
                            >
                                <div className="rounded-lg !px-3" style={{ backgroundColor: theme.palette.primary.main }}>
                                    <Typography
                                        sx={{
                                            fontFamily: "Cinzel",
                                            color: theme.palette.secondary.dark
                                        }}
                                        className="!text-[64px] !font-bold"
                                    >
                                        {countDownTimer.hours}
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
                                className="!w-26"
                            >
                                <div className="rounded-lg !px-3" style={{ backgroundColor: theme.palette.primary.main }}>
                                    <Typography
                                        sx={{
                                            fontFamily: "Cinzel",
                                            color: theme.palette.secondary.dark
                                        }}
                                        className="!text-[64px] !font-bold"
                                    >
                                        {countDownTimer.minutes}
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
                                className="!w-26"
                            >
                                <div className="rounded-lg !px-3" style={{ backgroundColor: theme.palette.primary.main }}>
                                    <Typography
                                        sx={{
                                            fontFamily: "Cinzel",
                                            color: theme.palette.secondary.dark
                                        }}
                                        className="!text-[64px] !font-bold"
                                    >
                                        {countDownTimer.seconds}
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
                            style={{ backgroundColor: theme.palette.grey[900] }}
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