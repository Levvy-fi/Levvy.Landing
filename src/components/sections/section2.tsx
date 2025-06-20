import { useTheme, Theme } from "@mui/material/styles";
import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Tokenomics from "../../images/section2/tokenomics.webp"
import Background from "../../images/section2/background.webp"
import { PieChart } from "@mui/x-charts/PieChart";

const Section2: React.FC = () => {
    const theme = useTheme<Theme>();

    const [chartDimensions, setChartDimensions] = useState({
        width: 0,
        height: 0,
        innerRadius: 0,
        outerRadius: 0
    });

    const tokenomicItems = [
        {
            Percentage: 6,
            Title: "LP",
            Description: "--",
            Amount: "66,000",
            Color: theme.palette.grey[300]
        },
        {
            Percentage: 44.4,
            Title: "Sale",
            Description: "--",
            Amount: "444,000",
            Color: theme.palette.grey[200]
        },
        {
            Percentage: 49.6,
            Title: "Replacement Drop",
            Description: "--",
            Amount: "496,000",
            Color: theme.palette.grey[100]
        },
        {
            Percentage: 0,
            Title: "Team/Product",
            Description: "--",
            Amount: "--",
            Color: theme.palette.grey[400]
        },
    ]

    useEffect(() => {
        const updateDimensions = () => {
            const width = window.innerWidth;
            let chartSize, innerRadius, outerRadius;

            if (width < 640) {
                chartSize = Math.min(width * 0.8, 300);
                innerRadius = chartSize * 0.3;
                outerRadius = chartSize * 0.46;
            } else if (width < 1024) {
                chartSize = Math.min(width * 0.3, 500);
                innerRadius = chartSize * 0.3;
                outerRadius = chartSize * 0.46;
            } else {
                chartSize = Math.min(width * 0.4, 680);
                innerRadius = chartSize * 0.30;
                outerRadius = chartSize * 0.45;
            }

            setChartDimensions({
                width: chartSize,
                height: chartSize,
                innerRadius,
                outerRadius
            });
        };

        updateDimensions();

        window.addEventListener('resize', updateDimensions);

        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    return (
        <section className="relative pt-[230px] pb-[259px]" style={{ backgroundImage: `url(${Background})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
            <div className="container mx-auto">
                <div>
                    <Typography
                        sx={{
                            textAlign: 'center',
                            textTransform: 'uppercase',
                            fontWeight: 700,
                            fontFamily: "Cinzel",
                            color: theme.palette.primary.main
                        }}
                        className="!text-[64px]"
                    >
                        Tokenomics
                    </Typography>
                    <Typography
                        sx={{
                            textAlign: 'center',
                            color: theme.palette.text.primary
                        }}
                        className="!text-xl"
                    >
                        The distribution is designed to support public access, maintain liquidity,<br />
                        and enable sustainable ecosystem growth through future drops.
                    </Typography>
                </div>
                <div className="flex mt-[82.38px] items-center xl:gap-[73.5px] ">
                    <div className="relative">
                        <div>
                            <PieChart
                                sx={{
                                    "& path": {
                                        stroke: "none",
                                    },
                                }}
                                slotProps={{
                                    tooltip: {
                                        sx: {
                                            '& .MuiChartsTooltip-labelCell': {
                                                color: theme.palette.text.primary,
                                            }, '& .MuiChartsTooltip-valueCell': {
                                                color: theme.palette.primary.light,
                                            }
                                        }
                                    }
                                }}
                                hideLegend
                                width={chartDimensions.width}
                                height={chartDimensions.height}
                                series={[
                                    {
                                        data: tokenomicItems.map((datum, index) => ({
                                            id: index,
                                            value: datum.Percentage,
                                            label: datum.Title,
                                            color: datum.Color
                                        })),
                                        innerRadius: chartDimensions.innerRadius,
                                        outerRadius: chartDimensions.outerRadius,
                                        highlightScope: { highlight: "item" },
                                        highlighted: {
                                            additionalRadius: chartDimensions.outerRadius * 0.1,
                                            innerRadius: chartDimensions.innerRadius * 1.1
                                        },
                                    },
                                ]}
                            />
                        </div>
                        <div className="absolute flex flex-col justify-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 xl:w-[400px] xl:h-[400px]">
                            <Typography
                                sx={{
                                    fontFamily: "Cinzel",
                                    fontWeight: 900,
                                    textAlign: "center",
                                    color: theme.palette.primary.light
                                }}
                                className="!text-[64px]"
                            >
                                1,000,000
                            </Typography>
                            <Typography
                                sx={{
                                    textAlign: "center",
                                    color: theme.palette.primary.light
                                }}
                                className="!text-2xl leading-8"
                            >
                                <span>
                                    Total Supply
                                </span>
                                <span className="font-extrabold">
                                    &nbsp;$ANGELS
                                </span>
                            </Typography>
                        </div>
                    </div>
                    <div className="hidden w-full xl:flex xl:flex-col xl:gap-8 xl:justify-between">
                        <div
                            style={{ backgroundColor: theme.palette.grey[50] }}
                            className="flex !rounded-[12px] overflow-hidden h-28"
                        >
                            <div
                                style={{
                                    backgroundColor: theme.palette.grey[100],
                                }}
                                className="w-6 h-full">
                            </div>

                            <div className="flex p-6 justify-between w-full">
                                <div className="flex flex-col gap-[15px]">
                                    <Typography
                                        sx={{
                                            fontFamily: "Cinzel",
                                            color: theme.palette.primary.light,
                                            fontWeight: 800,
                                        }}
                                        className="!text-[40px] !leading-[30px]"
                                    >
                                        49.6%
                                    </Typography>
                                    <Typography
                                        sx={{
                                            textTransform: "uppercase",
                                            fontWeight: 600,
                                            color: theme.palette.text.primary
                                        }}
                                    >
                                        reserved for replacement drop
                                    </Typography>
                                </div>
                                <div className="flex flex-col gap-[15px]">
                                    <Typography
                                        sx={{
                                            fontFamily: "Cinzel",
                                            color: theme.palette.primary.light,
                                            fontWeight: 800,
                                        }}
                                        className="!text-[40px] !leading-[29.2px]"
                                    >
                                        496,000
                                    </Typography>
                                    <Typography
                                        sx={{
                                            textTransform: "uppercase",
                                            fontWeight: 600,
                                            color: theme.palette.text.primary,
                                            textAlign: "right",
                                        }}
                                    >
                                        Amount
                                    </Typography>
                                </div>
                            </div>
                        </div>

                        <div
                            style={{ backgroundColor: theme.palette.grey[50] }}
                            className="flex !rounded-[12px] overflow-hidden h-28"
                        >
                            <div
                                style={{
                                    backgroundColor: theme.palette.grey[200],
                                }}
                                className="w-6 h-full"></div>

                            <div className="flex justify-between w-full p-6">
                                <div className="flex flex-col gap-[15px]">
                                    <Typography
                                        sx={{
                                            fontFamily: "Cinzel",
                                            color: theme.palette.primary.light,
                                            fontWeight: 800,
                                        }}
                                        className="!text-[40px] !leading-[29.2px]"
                                    >
                                        44.4%
                                    </Typography>
                                    <Typography
                                        sx={{
                                            textTransform: "uppercase",
                                            fontWeight: 600,
                                            color: theme.palette.text.primary
                                        }}
                                    >
                                        reserved for sale
                                    </Typography>
                                </div>
                                <div className="flex flex-col gap-[15px]">
                                    <Typography
                                        sx={{
                                            fontFamily: "Cinzel",
                                            color: theme.palette.primary.light,
                                            fontWeight: 800,
                                        }}
                                        className="!text-[40px] !leading-[29.2px]"
                                    >
                                        444,000
                                    </Typography>
                                    <Typography
                                        sx={{
                                            textTransform: "uppercase",
                                            fontWeight: 600,
                                            color: theme.palette.text.primary,
                                            textAlign: "right",
                                        }}
                                    >
                                        Amount
                                    </Typography>
                                </div>
                            </div>
                        </div>

                        <div
                            style={{ backgroundColor: theme.palette.grey[50] }}
                            className="flex !rounded-[12px] overflow-hidden h-28"
                        >
                            <div
                                style={{
                                    backgroundColor: theme.palette.grey[300],
                                }}
                                className="w-6 h-full"></div>

                            <div className="flex justify-between w-full p-6">
                                <div className="flex flex-col gap-[15px]">
                                    <Typography
                                        sx={{
                                            fontFamily: "Cinzel",
                                            color: theme.palette.primary.light,
                                            fontWeight: 800,
                                        }}
                                        className="!text-[40px] !leading-[29.2px]"
                                    >
                                        6%
                                    </Typography>
                                    <Typography
                                        sx={{
                                            textTransform: "uppercase",
                                            fontWeight: 600,
                                            color: theme.palette.text.primary
                                        }}
                                    >
                                        reserved for lp
                                    </Typography>
                                </div>
                                <div className="flex flex-col gap-[15px]">
                                    <Typography
                                        sx={{
                                            fontFamily: "Cinzel",
                                            color: theme.palette.primary.light,
                                            fontWeight: 800,
                                        }}
                                        className="!text-[40px] !leading-[29.2px]"
                                    >
                                        60,000
                                    </Typography>
                                    <Typography
                                        sx={{
                                            textTransform: "uppercase",
                                            fontWeight: 600,
                                            color: theme.palette.text.primary,
                                            textAlign: "right",
                                        }}
                                    >
                                        Amount
                                    </Typography>
                                </div>
                            </div>
                        </div>

                        <div
                            style={{ backgroundColor: theme.palette.grey[50] }}
                            className="flex !rounded-[12px] overflow-hidden h-28"
                        >
                            <div
                                style={{
                                    backgroundColor: theme.palette.grey[400],
                                }}
                                className="w-6 h-full"></div>

                            <div className="flex justify-between w-full p-6">
                                <div className="flex flex-col gap-[15px]">
                                    <Typography
                                        sx={{
                                            fontFamily: "Cinzel",
                                            color: theme.palette.primary.light,
                                            fontWeight: 800,
                                        }}
                                        className="!text-[40px] !leading-[29.2px]"
                                    >
                                        0%
                                    </Typography>
                                    <Typography
                                        sx={{
                                            textTransform: "uppercase",
                                            fontWeight: 600,
                                            color: theme.palette.text.primary
                                        }}
                                    >
                                        team/product
                                    </Typography>
                                </div>
                                <div className="flex flex-col gap-[15px]">
                                    <Typography
                                        sx={{
                                            fontFamily: "Cinzel",
                                            color: theme.palette.primary.light,
                                            fontWeight: 800,
                                        }}
                                        className="!text-[40px] !leading-[29.2px]"
                                    >
                                        --
                                    </Typography>
                                    <Typography
                                        sx={{
                                            textTransform: "uppercase",
                                            fontWeight: 600,
                                            color: theme.palette.text.primary,
                                            textAlign: "right",
                                        }}
                                    >
                                        Amount
                                    </Typography>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute -bottom-1 z-[-1] !w-full !h-[1153px] bg-gradient-to-t from-[#171614] to-[#171614]/0"></div>
        </section>
    );
}

export default Section2;