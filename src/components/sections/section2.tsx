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
            Color: theme.palette.chart?.[300]
        },
        {
            Percentage: 44.4,
            Title: "Sale",
            Description: "--",
            Amount: "444,000",
            Color: theme.palette.chart?.[200]
        },
        {
            Percentage: 49.6,
            Title: "Replacement Drop",
            Description: "--",
            Amount: "496,000",
            Color: theme.palette.chart?.[100]
        },
        {
            Percentage: 0,
            Title: "Team/Product",
            Description: "--",
            Amount: "--",
            Color: theme.palette.chart?.[400]
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
            } else if (width < 1280) {
                chartSize = Math.min(width * 0.3, 400);
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
                <div className="flex flex-col mt-[82.38px] items-center md:flex-row md:gap-[73.5px] ">
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
                    <div className="hidden w-full lg:flex lg:flex-col lg:gap-8 lg:justify-between">
                        <div
                            style={{ backgroundColor: theme.palette.chart?.[50] }}
                            className="flex !rounded-[12px] overflow-hidden lg:h-20 xl:h-28"
                        >
                            <div
                                style={{
                                    backgroundColor: theme.palette.chart?.[100],
                                }}
                                className="w-6 h-full">
                            </div>

                            <div className="flex justify-between w-full lg:p-4 xl:p-6">
                                <div className="flex flex-col lg:gap-[10px] xl:gap-[15px]">
                                    <Typography
                                        sx={{
                                            fontFamily: "Cinzel",
                                            color: theme.palette.primary.light,
                                            fontWeight: 800,
                                        }}
                                        className="lg:!text-3xl lg:!leading-[20px] xl:!text-[40px] xl:!leading-[30px]"
                                    >
                                        49.6%
                                    </Typography>
                                    <Typography
                                        className="!text-xs lg:!text-sm xl:!text-base"
                                        sx={{
                                            textTransform: "uppercase",
                                            fontWeight: 600,
                                            color: theme.palette.text.primary
                                        }}
                                    >
                                        reserved for replacement drop
                                    </Typography>
                                </div>
                                <div className="flex flex-col lg:gap-[10px] xl:gap-[15px]">
                                    <Typography
                                        sx={{
                                            fontFamily: "Cinzel",
                                            color: theme.palette.primary.light,
                                            fontWeight: 800,
                                        }}
                                        className="lg:!text-3xl lg:!leading-[20px] xl:!text-[40px] xl:!leading-[30px]"
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
                                        className="!text-xs lg:!text-sm xl:!text-base"
                                    >
                                        Amount
                                    </Typography>
                                </div>
                            </div>
                        </div>

                        <div
                            style={{ backgroundColor: theme.palette.chart?.[50] }}
                            className="flex !rounded-[12px] overflow-hidden lg:h-20 xl:h-28"
                        >
                            <div
                                style={{
                                    backgroundColor: theme.palette.chart?.[200],
                                }}
                                className="w-6 h-full"></div>

                            <div className="flex justify-between w-full lg:p-4 xl:p-6">
                                <div className="flex flex-col lg:gap-[10px] xl:gap-[15px]">
                                    <Typography
                                        sx={{
                                            fontFamily: "Cinzel",
                                            color: theme.palette.primary.light,
                                            fontWeight: 800,
                                        }}
                                        className="lg:!text-3xl lg:!leading-[20px] xl:!text-[40px] xl:!leading-[30px]"
                                    >
                                        44.4%
                                    </Typography>
                                    <Typography
                                        className="!text-xs lg:!text-sm xl:!text-base"
                                        sx={{
                                            textTransform: "uppercase",
                                            fontWeight: 600,
                                            color: theme.palette.text.primary
                                        }}
                                    >
                                        reserved for sale
                                    </Typography>
                                </div>
                                <div className="flex flex-col lg:gap-[10px] xl:gap-[15px]">
                                    <Typography
                                        sx={{
                                            fontFamily: "Cinzel",
                                            color: theme.palette.primary.light,
                                            fontWeight: 800,
                                        }}
                                        className="lg:!text-3xl lg:!leading-[20px] xl:!text-[40px] xl:!leading-[30px]"
                                    >
                                        444,000
                                    </Typography>
                                    <Typography
                                        className="!text-xs lg:!text-sm xl:!text-base"
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
                            style={{ backgroundColor: theme.palette.chart?.[50] }}
                            className="flex !rounded-[12px] overflow-hidden lg:h-20 xl:h-28"
                        >
                            <div
                                style={{
                                    backgroundColor: theme.palette.chart?.[300],
                                }}
                                className="w-6 h-full"></div>

                            <div className="flex justify-between w-full lg:p-4 xl:p-6">
                                <div className="flex flex-col lg:gap-[10px] xl:gap-[15px]">
                                    <Typography
                                        sx={{
                                            fontFamily: "Cinzel",
                                            color: theme.palette.primary.light,
                                            fontWeight: 800,
                                        }}
                                        className="lg:!text-3xl lg:!leading-[20px] xl:!text-[40px] xl:!leading-[30px]"
                                    >
                                        6%
                                    </Typography>
                                    <Typography
                                        className="!text-xs lg:!text-sm xl:!text-base"
                                        sx={{
                                            textTransform: "uppercase",
                                            fontWeight: 600,
                                            color: theme.palette.text.primary
                                        }}
                                    >
                                        reserved for lp
                                    </Typography>
                                </div>
                                <div className="flex flex-col lg:gap-[10px] xl:gap-[15px]">
                                    <Typography
                                        sx={{
                                            fontFamily: "Cinzel",
                                            color: theme.palette.primary.light,
                                            fontWeight: 800,
                                        }}
                                        className="lg:!text-3xl lg:!leading-[20px] xl:!text-[40px] xl:!leading-[30px]"
                                    >
                                        60,000
                                    </Typography>
                                    <Typography
                                        className="!text-xs lg:!text-sm xl:!text-base"
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
                            style={{ backgroundColor: theme.palette.chart?.[50] }}
                            className="flex !rounded-[12px] overflow-hidden lg:h-20 xl:h-28"
                        >
                            <div
                                style={{
                                    backgroundColor: theme.palette.chart?.[400],
                                }}
                                className="w-6 h-full"></div>

                            <div className="flex justify-between w-full lg:p-4 xl:p-6">
                                <div className="flex flex-col lg:gap-[10px] xl:gap-[15px]">
                                    <Typography
                                        sx={{
                                            fontFamily: "Cinzel",
                                            color: theme.palette.primary.light,
                                            fontWeight: 800,
                                        }}
                                        className="lg:!text-3xl lg:!leading-[20px] xl:!text-[40px] xl:!leading-[30px]"
                                    >
                                        0%
                                    </Typography>
                                    <Typography
                                        className="!text-xs lg:!text-sm xl:!text-base"
                                        sx={{
                                            textTransform: "uppercase",
                                            fontWeight: 600,
                                            color: theme.palette.text.primary
                                        }}
                                    >
                                        team/product
                                    </Typography>
                                </div>
                                <div className="flex flex-col lg:gap-[10px] xl:gap-[15px]">
                                    <Typography
                                        sx={{
                                            fontFamily: "Cinzel",
                                            color: theme.palette.primary.light,
                                            fontWeight: 800,
                                        }}
                                        className="lg:!text-3xl lg:!leading-[20px] xl:!text-[40px] xl:!leading-[30px]"
                                    >
                                        --
                                    </Typography>
                                    <Typography
                                        className="!text-xs lg:!text-sm xl:!text-base"
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