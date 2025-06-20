import { Button, Typography, useTheme } from "@mui/material";
import React, { ReactNode } from "react";
import TokenSale from "../../images/icons/token_sale.svg";
import WhitePaper from "../../images/icons/white_paper.svg";
import AngelCoin from "../../images/section1/angel.svg";
import Shine from "../../images/section1/shine.webp";
import Background from "../../images/section1/background.webp";

export default function Section1() {
    const theme = useTheme();

    return (
        <section
            style={{
                backgroundColor: theme.palette.background.default,
                backgroundImage: `url(${Background})`,
            }}
            className="relative pt-45"
        >
            <div className="container mx-auto">
                <div>
                    <div className="">
                        <Typography
                            sx={{
                                textTransform: 'uppercase',
                                color: theme.palette.primary.main,
                                textAlign: 'center',
                                fontFamily: "Cinzel",
                                fontWeight: 700
                            }}
                            className="!text-[112px] !leading-26 !mb-6"
                        >
                            The Angels <br />Have Arrived
                        </Typography>
                        <Typography
                            sx={{
                                color: theme.palette.text.primary,
                                textAlign: 'center',
                            }}
                            className="text-2xl leading-6"
                        >
                            <span>Join Angel Finance on Cardano—bringing DeFi to new heights with lending,<br />
                                borrowing, and yield farming powered by </span>
                            <span className="font-bold">$ANGELS</span>
                            <span> and the Levvy protocol. </span>
                        </Typography>
                    </div>
                    <div className="flex justify-center gap-3 mt-10">
                        <Button 
                            variant="contained" startIcon={<img src={TokenSale} alt="Token Sale Icon"/>}
                            sx={{ 
                                backgroundColor: theme.palette.primary.light, 
                                color: theme.palette.text.disabled, 
                                borderRadius: '12px',
                                zIndex: 1,
                                '&:hover': {
                                    backgroundColor: theme.palette.primary.main,
                                },
                                '&:active': {
                                    backgroundColor: theme.palette.grey[500],
                                    color: theme.palette.grey[600],
                                },
                            }}
                            >
                            Token Sale
                        </Button>
                        <Button
                            variant="contained" startIcon={<img src={WhitePaper} alt="White Paper Icon"/>}
                            sx={{ 
                                backgroundColor: theme.palette.primary.light, 
                                color: theme.palette.text.secondary, 
                                borderRadius: '12px',
                                zIndex: 1,
                                '&:hover': {
                                    backgroundColor: theme.palette.primary.main,
                                },
                                '&:active': {
                                    backgroundColor: theme.palette.grey[500],
                                    color: theme.palette.grey[600],
                                },
                            }}
                        >
                            White Paper
                        </Button>
                    </div>
                    <div className="relative !mx-auto flex justify-center mt-34 !z-0">
                        <img
                            className="absolute -top-[192px] w-[909px] h-[417px]"
                            src={Shine}
                            alt="Shine Effect">
                        </img>
                        <img
                            src={AngelCoin}
                            alt="Angels Coin">
                        </img>
                    </div>

                </div>
            </div>
            <div className="absolute !-bottom-1 w-full h-[700px] bg-gradient-to-t from-[#12100F] to-[#12100F]/0"></div>
        </section>
    );
} 