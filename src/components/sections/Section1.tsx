import { Button, Typography, useTheme } from "@mui/material";
import React from "react";

export default function Section1() {
    const theme = useTheme();

    return (
        <section
            style={{
                backgroundColor: theme.palette.background.default,
                backgroundImage: `url(/images/section1/background.webp)`,
            }}
            className="relative pt-[132px] md:pt-45"
        >
            <div className="container mx-auto !px-0 max-lg:!overflow-hidden">
                <div>
                    <div>
                        <Typography
                            sx={{
                                textTransform: 'uppercase',
                                color: theme.palette.primary.main,
                                textAlign: 'center',
                                fontFamily: "Cinzel",
                                fontWeight: 700
                            }}
                            className="!text-[45px] !leading-13 !mb-4  sm:!mb-6 sm:!text-[80px] sm:!leading-[80px] lg:!leading-26 lg:!text-[112px]"
                        >
                            The Angels <br />Have Arrived
                        </Typography>
                        <Typography
                            sx={{
                                color: theme.palette.text.primary,
                                textAlign: 'center',
                            }}
                            className="!text-base !leading-6 !mx-[21px]  sm:!mx-0 sm:!text-2xl sm:!leading-6"
                        >
                            <span>Join Angel Finance on Cardano—bringing DeFi to new heights with lending,<br className="hidden lg:block" />
                                borrowing, and yield farming powered by </span>
                            <span className="font-bold">$ANGELS</span>
                            <span> and the Levvy protocol. </span>
                        </Typography>
                    </div>
                    <div className="flex justify-center gap-[9px] mt-6 sm:gap-3 sm:mt-10">
                        <Button
                            onClick={() => {
                                const element = document.getElementById('buy-angels');
                                if (element) {
                                    element.scrollIntoView({ behavior: 'smooth' });
                                }
                            }}
                            variant="contained" startIcon={<img src="/images/icons/token_sale.svg" alt="Token Sale Icon" />}
                            sx={{
                                backgroundColor: theme.palette.primary.light,
                                color: theme.palette.text.disabled,
                                borderRadius: '12px',
                                textTransform: 'Capitalize',
                                zIndex: 1,
                                '&:hover':{
                                    backgroundColor: theme.palette.primary.main
                                },
                                '&:active':{
                                    backgroundColor: theme.palette.primary.contrastText,
                                    color: theme.palette.gradient?.button[70]
                                }
                            }}
                        >
                            <Typography className="!text-sm !leading-5 sm:!text-base sm:!leading-6">Token Sale</Typography>
                        </Button>
                        <Button
                            href="https://ccardano.gitbook.io/angel-paper"
                            target="_blank" rel="noopener norefferer"
                            variant="contained" startIcon={<img src="/images/icons/white_paper.svg" alt="White Paper Icon" />}
                            sx={{
                                backgroundColor: theme.palette.primary.light,
                                color: theme.palette.text.secondary,
                                borderRadius: '12px',
                                textTransform: 'Capitalize',
                                zIndex: 1,
                                '&:hover':{
                                    backgroundColor: theme.palette.primary.main
                                },
                                '&:active':{
                                    backgroundColor: theme.palette.primary.contrastText,
                                    color: theme.palette.gradient?.button[70]
                                }
                            }}
                        >
                            <Typography className="!text-sm !leading-5 sm:!text-base sm:!leading-6">White Paper</Typography>
                        </Button>
                    </div>
                    <div className="!w-full relative !mx-auto mt-[90px] flex justify-center sm:mt-34 ">
                        <div className="w-full overflow-clip flex justify-center">
                            <img
                                className="min-w-[477px]"
                                src="/images/section1/angel.svg"
                                alt="Angels Coin">
                            </img>
                        </div>
                        <div className="absolute !-top-[82px] !w-[388px] !h-[177.9px] md:!-top-[192px] md:!w-[909px] md:!h-[417px]">
                            <img
                                src="/images/section1/shine.webp"
                                alt="Shine Effect">
                            </img>
                        </div>

                    </div>

                </div>
            </div>
            <div className="absolute !-bottom-1 w-full h-50 bg-gradient-to-t from-[#12100F] to-[#12100F]/0 md:h-[500px] lg:h-[700px]"></div>
        </section>
    );
}