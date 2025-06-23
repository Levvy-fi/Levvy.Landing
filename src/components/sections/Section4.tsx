import { Card, IconButton, Typography, useTheme, LinearProgress, Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { SvgIcon } from "@mui/material";
import { truncateAddress } from "../../utils/addressUtils";
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import QRCode from 'react-qr-code';
import WalletButton from '../common/WalletButton';
import { useSaleTimer } from "../../hooks/useSaleTimer";
import { ANGEL_SALE_CONFIG } from "../../types/saleTypes";
import FlipNumbers from 'react-flip-numbers';
import { useWalletBalance } from "../../hooks/useWalletBalance";

// Icon components (copied from old implementation)
const XIcon = ({ className = "", sx = {} }: { className?: string, sx?: any }) => (
    <SvgIcon viewBox="0 0 15 14" className={className} sx={sx}>
        <path d="M4.81524 0.0312004L8.14701 5.03971L12.3727 0.217647L13.6995 0.033754L8.85576 5.9464L14.1031 13.8653H10.166L6.5239 8.65371C6.28637 8.59752 6.16506 8.82355 6.0182 8.94615C4.88675 9.90009 2.94694 13.0863 1.89722 13.675C1.50262 13.8972 1.21401 13.9061 0.777266 13.864L5.82664 7.7534L0.574219 0.0324767H4.81396L4.81524 0.0312004ZM12.4864 13.0607L4.31847 1.22522C3.80638 0.5816 2.91757 0.889364 2.18838 0.835729L10.5695 12.8602L12.4851 13.0607H12.4864Z" fill="currentColor" />
    </SvgIcon>
);

const DiscordIcon = ({ className = "", sx = {} }: { className?: string, sx?: any }) => (
    <SvgIcon viewBox="0 0 24 25" className={className} sx={sx}>
        <g clipPath="url(#clip0_55_3237)">
            <path d="M8.67906 9.99805C7.29123 9.99805 6.16211 11.242 6.16211 12.7709C6.16211 14.2999 7.29123 15.5438 8.67906 15.5438C10.0669 15.5438 11.1961 14.2999 11.1961 12.7709C11.1961 11.242 10.0669 9.99805 8.67906 9.99805ZM8.67906 14.1376C8.06664 14.1376 7.56836 13.5245 7.56836 12.7709C7.56836 12.0174 8.06664 11.4043 8.67906 11.4043C9.29153 11.4043 9.78986 12.0174 9.78986 12.7709C9.78986 13.5245 9.29153 14.1376 8.67906 14.1376Z" fill="currentColor" />
            <path d="M15.3208 9.99854C13.9329 9.99854 12.8037 11.2425 12.8037 12.7714C12.8037 14.3004 13.9329 15.5443 15.3208 15.5443C16.7086 15.5443 17.8377 14.3004 17.8377 12.7714C17.8377 11.2425 16.7086 9.99854 15.3208 9.99854ZM15.3208 14.1381C14.7083 14.1381 14.21 13.525 14.21 12.7714C14.21 12.0179 14.7083 11.4048 15.3208 11.4048C15.9332 11.4048 16.4315 12.0179 16.4315 12.7714C16.4315 13.525 15.9332 14.1381 15.3208 14.1381Z" fill="currentColor" />
            <path d="M23.9989 17.4717C23.9823 17.1744 23.5619 10.1424 20.8915 5.93587C20.8369 5.84986 20.7642 5.77668 20.6786 5.72156C17.3767 3.59536 15.1276 3.60145 15.0335 3.60107C14.7608 3.60468 14.5259 3.76331 14.4124 3.99253L13.2781 6.16631C12.8555 6.13865 12.4289 6.12431 12 6.12431C11.5712 6.12431 11.1445 6.13865 10.722 6.16631L9.58895 3.99506C9.47594 3.76453 9.2403 3.60473 8.9665 3.60112C8.87186 3.60056 6.62303 3.59559 3.32153 5.72161C3.23589 5.77678 3.16319 5.8499 3.10858 5.93592C0.438204 10.1424 0.0176883 17.1744 0.00109456 17.4717C-0.00931169 17.658 0.0548133 17.8409 0.17936 17.98C0.303204 18.1182 3.24503 21.3507 7.3113 21.3507C7.32948 21.3507 7.34819 21.3506 7.36642 21.3505C7.58012 21.349 7.78145 21.2504 7.91369 21.0826L9.7893 18.7023C10.5097 18.7846 11.2496 18.8274 12 18.8274C12.7505 18.8274 13.4904 18.7846 14.2107 18.7023L16.0863 21.0826C16.2186 21.2504 16.4199 21.349 16.6336 21.3505C16.6521 21.3507 16.6703 21.3507 16.6887 21.3507C20.7546 21.3507 23.6969 18.1182 23.8207 17.98C23.9452 17.8409 24.0093 17.658 23.9989 17.4717ZM16.9747 19.9379L15.8021 18.4497C17.5871 18.0825 19.1892 17.4576 20.4398 16.6186C20.7623 16.4023 20.8483 15.9654 20.632 15.643C20.4157 15.3205 19.9787 15.2343 19.6563 15.4508C17.7899 16.7031 14.9992 17.4212 12 17.4212C9.00095 17.4212 6.2103 16.7031 4.34369 15.4509C4.02114 15.2346 3.58441 15.3207 3.36808 15.6432C3.15175 15.9657 3.23781 16.4025 3.56031 16.6188C4.81094 17.4577 6.41303 18.0825 8.19798 18.4497L7.02541 19.9378C4.2723 19.8101 2.08136 17.8848 1.42713 17.2459C1.53634 15.8835 2.10306 10.2644 4.21445 6.81998C6.28778 5.51123 7.85242 5.14725 8.55123 5.04609L9.21836 6.32442C7.64988 6.55345 6.18039 6.97434 4.92869 7.56365C4.57736 7.72903 4.42666 8.14795 4.59203 8.49933C4.75745 8.85061 5.17638 9.00126 5.52766 8.83598C7.31575 7.99415 9.61436 7.53056 12 7.53056C14.3858 7.53056 16.6845 7.99425 18.4725 8.83617C18.5693 8.88173 18.6711 8.90334 18.7715 8.90334C19.0353 8.90334 19.2883 8.75404 19.4081 8.49956C19.5735 8.14828 19.4228 7.72931 19.0715 7.56389C17.8197 6.97453 16.3502 6.55354 14.7816 6.32451L15.4487 5.04618C16.1475 5.14734 17.7122 5.51132 19.7856 6.82007C21.8946 10.2609 22.4632 15.8858 22.5729 17.2471C21.9203 17.8874 19.7391 19.8111 16.9747 19.9379Z" fill="currentColor" />
        </g>
        <defs>
            <clipPath id="clip0_55_3237">
                <rect width="24" height="24" fill="white" transform="translate(0 0.475586)" />
            </clipPath>
        </defs>
    </SvgIcon>
);

export const WalletIcon = ({ className = "", sx = {} }: { className?: string, sx?: any }) => (
    <SvgIcon viewBox="0 0 24 24" className={className} sx={sx}>
        <path d="M5.07187 21.2034C4.44221 21.2034 3.92156 20.9774 3.50991 20.5253C3.09826 20.0733 2.89244 19.5137 2.89244 18.8465V5.47253C2.89244 4.80529 3.09826 4.24568 3.50991 3.79367C3.92156 3.34166 4.44221 3.11566 5.07187 3.11566H18.9281C19.5578 3.11566 20.0784 3.34166 20.4901 3.79367C20.9017 4.24568 21.1076 4.80529 21.1076 5.47253V7.82941H17.4647C16.7088 7.82941 16.0522 8.09779 15.4949 8.63454C14.9376 9.17129 14.6589 9.80283 14.6589 10.5292V13.7901C14.6589 14.5164 14.9376 15.148 15.4949 15.6847C16.0522 16.2215 16.7088 16.4898 17.4647 16.4898H21.1076V18.8465C21.1076 19.5137 20.9017 20.0733 20.4901 20.5253C20.0784 20.9774 19.5578 21.2034 18.9281 21.2034H5.07187ZM17.4647 14.8468C17.1393 14.8468 16.866 14.7421 16.6447 14.5327C16.4235 14.3232 16.3128 14.0633 16.3128 13.7529V10.5663C16.3128 10.2559 16.4235 9.99597 16.6447 9.78655C16.866 9.57714 17.1393 9.47244 17.4647 9.47244H22.2872C22.6126 9.47244 22.8859 9.57714 23.1071 9.78655C23.3284 9.99597 23.439 10.2559 23.439 10.5663V13.7529C23.439 14.0633 23.3284 14.3232 23.1071 14.5327C22.8859 14.7421 22.6126 14.8468 22.2872 14.8468H17.4647ZM18.1175 13.2039H21.6344V10.1154H18.1175V13.2039ZM19.875 12.3846C20.2004 12.3846 20.4737 12.2799 20.6949 12.0704C20.9162 11.861 21.0268 11.6011 21.0268 11.2907C21.0268 10.9803 20.9162 10.7204 20.6949 10.5109C20.4737 10.3015 20.2004 10.1968 19.875 10.1968C19.5496 10.1968 19.2763 10.3015 19.0551 10.5109C18.8338 10.7204 18.7232 10.9803 18.7232 11.2907C18.7232 11.6011 18.8338 11.861 19.0551 12.0704C19.2763 12.2799 19.5496 12.3846 19.875 12.3846Z" fill="currentColor" />
    </SvgIcon>
);

// Flip Clock Card - Airport/Train Station Style
const FlipClockCard: React.FC<{ value: number, label: string, theme: any }> = ({ value, label, theme }) => {
    const [isClient, setIsClient] = useState(false);
    const [screenWidth, setScreenWidth] = useState(1024);
    
    useEffect(() => {
        setIsClient(true);
        setScreenWidth(window.innerWidth);
        
        const handleResize = () => setScreenWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const formattedValue = value.toString().padStart(2, '0');
    const isLargeScreen = screenWidth > 640;

    if (!isClient) {
        // Fallback for SSR
        return (
            <div className="flex flex-col items-center gap-3 sm:gap-5">
                <Card
                    sx={{
                        position: 'relative',
                        background: 'transparent',
                        borderRadius: "12px",
                        boxShadow: "none",
                        isolation: 'isolate',
                        width: '100%',
                        minWidth: { xs: '76px', sm: '112px' },
                        maxWidth: { xs: '84px', sm: '112px' },
                        height: { xs: '68px', sm: '128px' },
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            borderRadius: "12px",
                            padding: "3px",
                            background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.main}, ${theme.palette.secondary.light})`,
                            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                            WebkitMaskComposite: 'xor',
                            maskComposite: 'exclude',
                            zIndex: -1
                        }
                    }}
                >
                    <div 
                        className="rounded-lg w-full h-full flex items-center justify-center"
                        style={{ 
                            backgroundColor: theme.palette.primary.main
                        }}
                    >
                        <Typography
                            sx={{
                                fontFamily: "Cinzel",
                                color: theme.palette.secondary.dark,
                                fontWeight: 800,
                                fontSize: { xs: '32px', sm: '72px' },
                                lineHeight: 1,
                                textAlign: 'center',
                                fontVariantNumeric: 'tabular-nums',
                                textShadow: `0 2px 8px ${theme.palette.common.black}40`
                            }}
                        >
                            {formattedValue}
                        </Typography>
                    </div>
                </Card>
                <Typography
                    sx={{
                        color: theme.palette.text.primary,
                        fontSize: { xs: '13px', sm: '16px' },
                        fontWeight: 700,
                        textAlign: 'center',
                        letterSpacing: { xs: '1px', sm: '1.5px' },
                        textTransform: 'uppercase',
                        fontFamily: "Albert Sans"
                    }}
                >
                    {label}
                </Typography>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center gap-3 sm:gap-5">
            <Card
                sx={{
                    position: 'relative',
                    background: 'transparent',
                    borderRadius: "12px",
                    boxShadow: "none",
                    isolation: 'isolate',
                    width: '100%',
                    minWidth: { xs: '76px', sm: '112px' },
                    maxWidth: { xs: '84px', sm: '112px' },
                    height: { xs: '68px', sm: '128px' },
                    overflow: 'hidden',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        borderRadius: "12px",
                        padding: "3px",
                        background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.main}, ${theme.palette.secondary.light})`,
                        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        WebkitMaskComposite: 'xor',
                        maskComposite: 'exclude',
                        zIndex: -1
                    }
                }}
            >
                <div 
                    className="rounded-lg w-full h-full flex items-center justify-center"
                    style={{ 
                        backgroundColor: theme.palette.primary.main
                    }}
                >
                    <FlipNumbers
                        height={isLargeScreen ? 72 : 32}
                        width={isLargeScreen ? 48 : 22}
                        color={theme.palette.secondary.dark}
                        background="transparent"
                        play={true}
                        perspective={600}
                        numbers={formattedValue}
                        numberStyle={{
                            fontFamily: "Cinzel, serif",
                            fontWeight: "800",
                            fontSize: isLargeScreen ? "52px" : "26px",
                            textShadow: `0 2px 8px ${theme.palette.common.black}50`,
                            letterSpacing: "1px"
                        }}
                        nonNumberStyle={{
                            fontFamily: "Cinzel, serif",
                            fontWeight: "800",
                            fontSize: isLargeScreen ? "52px" : "26px",
                            textShadow: `0 2px 8px ${theme.palette.common.black}50`,
                            letterSpacing: "1px"
                        }}
                    />
                </div>
            </Card>
            <Typography
                sx={{
                    color: theme.palette.text.primary,
                    fontSize: { xs: '13px', sm: '16px' },
                    fontWeight: 700,
                    textAlign: 'center',
                    letterSpacing: { xs: '1px', sm: '1.5px' },
                    textTransform: 'uppercase',
                    fontFamily: "Albert Sans"
                }}
            >
                {label}
            </Typography>
        </div>
    );
};



// Multi-tiered progress bar component
const MultiTierProgressBar: React.FC<{ currentADA: number, theme: any }> = ({ currentADA, theme }) => {
    const softCap = 600000; // 600K ADA
    const hardCap = 1332000; // 1.332M ADA
    
    const hardCapProgress = Math.min((currentADA / hardCap) * 100, 100);
    
    // Format numbers with K/M suffix
    const formatADA = (amount: number) => {
        if (amount >= 1000000) {
            return `₳${(amount / 1000000).toFixed(2)}M`;
        } else {
            return `₳${(amount / 1000).toFixed(0)}K`;
        }
    };
    
    return (
        <Box sx={{ width: '100%', maxWidth: '600px', mx: 'auto', mb: 4 }}>
            <Typography
                sx={{
                    color: theme.palette.primary.main,
                    fontWeight: 800,
                    fontFamily: "Cinzel",
                    fontSize: { xs: '24px', sm: '30px', md: '34px' },
                    textAlign: 'center',
                    mb: 4,
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase'
                }}
            >
Token Sale Progress
            </Typography>
            
            {/* Current Progress Display */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography
                    sx={{
                        color: theme.palette.primary.light,
                        fontWeight: 900,
                        fontFamily: "Cinzel",
                        fontSize: { xs: '40px', sm: '52px', md: '60px' },
                        lineHeight: 1,
                        textShadow: `0 4px 12px ${theme.palette.primary.main}50`
                    }}
                >
                    {formatADA(currentADA)}
                </Typography>
                <Typography
                    sx={{
                        color: theme.palette.text.primary,
                        fontSize: { xs: '16px', sm: '18px' },
                        fontWeight: 600,
                        mt: 1.5,
                        opacity: 0.9,
                        fontFamily: "Albert Sans"
                    }}
                >
                    of {formatADA(hardCap)} raised ({hardCapProgress.toFixed(1)}%)
                </Typography>
            </Box>
            
            {/* Clean Material-UI Progress Bar */}
            <Box sx={{ position: 'relative', mb: 3 }}>
                <LinearProgress
                    variant="determinate"
                    value={hardCapProgress}
                    sx={{
                        height: { xs: 20, sm: 24 },
                        borderRadius: 2,
                        backgroundColor: theme.palette.grey[800],
                        '& .MuiLinearProgress-bar': {
                            borderRadius: 2,
                            background: `linear-gradient(90deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.main}, ${theme.palette.secondary.light})`,
                            transition: 'transform 0.5s ease-in-out'
                        }
                    }}
                />
                
                {/* Clean Soft Cap Marker */}
                <Box
                    sx={{
                        position: 'absolute',
                        left: `${(softCap / hardCap) * 100}%`,
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 2,
                        height: { xs: 28, sm: 32 },
                        backgroundColor: theme.palette.warning.main,
                        borderRadius: 1,
                        zIndex: 2
                    }}
                />
            </Box>
            
            {/* Progress Labels */}
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                px: 1
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box
                        sx={{
                            width: 10,
                            height: 10,
                            borderRadius: '50%',
                            backgroundColor: currentADA >= softCap ? theme.palette.success.main : theme.palette.warning.main,
                            boxShadow: `0 0 8px ${currentADA >= softCap ? theme.palette.success.main : theme.palette.warning.main}60`
                        }}
                    />
                    <Typography
                        sx={{
                            color: currentADA >= softCap ? theme.palette.success.main : theme.palette.warning.main,
                            fontSize: { xs: '14px', sm: '16px' },
                            fontWeight: 700,
                            fontFamily: "Albert Sans",
                            letterSpacing: '0.8px'
                        }}
                    >
                        SOFT CAP: {formatADA(softCap)} {currentADA >= softCap ? '✓' : ''}
                    </Typography>
                </Box>
                <Typography
                    sx={{
                        color: theme.palette.primary.light,
                        fontSize: { xs: '14px', sm: '16px' },
                        fontWeight: 700,
                        fontFamily: "Albert Sans",
                        letterSpacing: '0.8px'
                    }}
                >
                    HARD CAP: {formatADA(hardCap)}
                </Typography>
            </Box>
        </Box>
    );
};

const Section4: React.FC = () => {
    const theme = useTheme();
    const { siteConfig } = useDocusaurusContext();
    const paymentAddress = (siteConfig.customFields?.paymentWalletAddress as string) || 'addr1qynurh5a8ee068aswr0pnq2ce4uzvzqdfnmtzapc68zraavj5dysang6xcyp62r6dwdm7pnv3nsdwwn7jzzhr03ur6tq78xelf';
    const timerState = useSaleTimer(ANGEL_SALE_CONFIG);
    
    // Query real ADA balance from the sale wallet using Blaze
    const { balance: walletBalance, loading: balanceLoading, error: balanceError } = useWalletBalance(paymentAddress, 30000);
    
    // Use real balance if available, fallback to 0 if loading or error
    const currentADAraised = walletBalance?.ada || 0;

    return (
        <section className="flex relative bg-cover [mask-image:_linear-gradient(to_bottom,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)] px-4 !py-30 sm:!py-50" style={{ backgroundImage: `url(/images/section4/section_bg.webp)` }}>
            <div className="container mx-auto text-center">
                <div>
                    <Typography
                        sx={{
                            fontFamily: "Cinzel",
                            color: theme.palette.primary.main,
                            textTransform: "uppercase"
                        }}
                        className="!font-bold !text-[32px] sm:!text-[46px] xl:!text-[56px]"
                    >
                        angel finance
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: "Cinzel",
                            color: theme.palette.primary.light,
                            textTransform: "uppercase"
                        }}
                        className="!font-bold !text-[48px] sm:!text-[76px] md:!text-[94px] lg:!text-[110px] xl:!text-[120px]"
                    >
                        $Angels sale
                    </Typography>
                </div>
                <div className="w-full flex flex-col items-center justify-center">
                    <Typography
                        sx={{
                            color: theme.palette.text.primary,
                        }}
                        className="lg:w-198 !text-lg sm:!text-xl md:!text-2xl"
                    >
                        <span className="font-bold">$ANGELS </span>
                        <span>is not another governance token. It's a token with </span>
                        <span className="font-bold">real utility</span> <span>that rewards you with ADA on the 15th of every month.</span>
                        <br />
                    </Typography>
                    <Typography
                        sx={{
                            color: theme.palette.text.primary,
                        }}
                        className="!mt-4 !text-lg sm:!text-xl md:!text-2xl lg:w-204"
                    >
                        <span>Join us as we undergo one of the largest project expansions on Cardano. </span>
                        <span>For more information, visit:</span>
                    </Typography>
                    <div className="!space-x-4 !mt-4">
                        <IconButton
                            href="https://x.com/levvyfinance"
                            target="_blank" rel="noopener noreferrer"
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
                            href="https://discord.com/invite/angelfinance"
                            target="_blank" rel="noopener noreferrer"
                            aria-label="discord"
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
                <div className="grid grid-cols-1 gap-4 !mt-16 sm:!mt-20 sm:gap-8 sm:grid-cols-2 h-200 sm:h-100 lg:h-55 lg:grid-cols-4 2xl:h-66">
                    <Card
                        sx={{
                            display: "flex",
                            transition: "all 0.3s ease-in-out",
                            "&:hover": {
                                backgroundColor: theme.palette.primary.main,
                            },
                            "&:hover .hover-target": {
                                color: theme.palette.secondary.dark
                            },
                        }}
                        className="!flex-col !items-start !justify-center cursor-pointer !px-8 2xl:!px-14 !rounded-[24px] lg:!rounded-[40px]"
                    >
                        <Typography
                            sx={{
                                fontFamily: "Cinzel",
                                fontWeight: 700,
                                color: theme.palette.primary.light
                            }}
                            className="hover-target !text-[52px] 2xl:!text-[64px]"
                        >
                            504K
                        </Typography>
                        <Typography
                            className="hover-target uppercase !text-left !text-lg lg:!text-base 2xl:!text-lg"
                        >
                            <span>New token supply <br className="hidden lg:block" /> for </span>
                            <span className="font-bold">
                                $ANGELS
                            </span>
                        </Typography>
                    </Card>
                    <Card
                        sx={{
                            display: "flex",
                            transition: "all 0.3s ease-in-out",
                            "&:hover": {
                                backgroundColor: theme.palette.primary.main,
                            },
                            "&:hover .hover-target": {
                                color: theme.palette.secondary.dark
                            },
                        }}
                        className="!flex-col !items-start !justify-center cursor-pointer !px-8 2xl:!px-14 !rounded-[24px] lg:!rounded-[40px]"
                    >
                        <Typography
                            sx={{
                                fontFamily: "Cinzel",
                                fontWeight: 700,
                                color: theme.palette.primary.light
                            }}
                            className="hover-target !text-[52px] 2xl:!text-[64px]"
                        >
                            60K
                        </Typography>
                        <Typography
                            className="hover-target uppercase !text-left text-lg lg:!text-base 2xl:!text-lg"
                        >
                            <span className="font-bold">$ANGELS </span>
                            <span>
                                RESERVED <br className="hidden lg:block" /> FOR LP
                            </span>
                        </Typography>
                    </Card>
                    <Card
                        sx={{
                            display: "flex",
                            transition: "all 0.3s ease-in-out",
                            "&:hover": {
                                backgroundColor: theme.palette.primary.main,
                            },
                            "&:hover .hover-target": {
                                color: theme.palette.secondary.dark
                            },
                        }}
                        className="!flex-col !items-start !justify-center cursor-pointer !px-8 2xl:!px-14 !rounded-[24px] lg:!rounded-[40px]"
                    >
                        <Typography
                            sx={{
                                fontFamily: "Cinzel",
                                fontWeight: 700,
                                color: theme.palette.primary.light
                            }}
                            className="hover-target !text-[52px] 2xl:!text-[64px]"
                        >
                            444K
                        </Typography>
                        <Typography
                            className="hover-target uppercase !text-left text-lg lg:!text-base 2xl:!text-lg"
                        >
                            <span className="font-bold">$ANGELS </span>
                            <span>
                                RESERVED <br className="hidden lg:block" /> FOR SALE
                            </span>
                        </Typography>
                    </Card>
                    <Card
                        sx={{
                            display: "flex",
                            transition: "all 0.3s ease-in-out",
                            "&:hover": {
                                backgroundColor: theme.palette.primary.main,
                            },
                            "&:hover .hover-target": {
                                color: theme.palette.secondary.dark
                            },
                        }}
                        className="!flex-col !items-start !justify-center cursor-pointer !px-8 2xl:!px-14 !rounded-[24px] lg:!rounded-[40px]"
                    >
                        <Typography
                            sx={{
                                fontFamily: "Cinzel",
                                fontWeight: 700,
                                color: theme.palette.primary.light
                            }}
                            className="hover-target !text-[52px] 2xl:!text-[64px]"
                        >
                            ₳3
                        </Typography>
                        <Typography
                            className="hover-target uppercase !text-left text-lg lg:!text-base 2xl:!text-lg"
                        >
                            <span className="font-bold">$ANGELS </span>
                            <span>
                                TOKEN <br className="hidden lg:block" /> SALE PRICE
                            </span>
                        </Typography>
                    </Card>
                </div>
                
                {/* BUY $ANGELS NOW Panel - Only show during active sale */}
                {timerState.phase === 'public-mint' && (
                    <div className="w-full flex flex-col items-center justify-center">
                        <Card
                            sx={{
                                position: 'relative',
                                background: 'transparent',
                                borderRadius: "16px",
                                boxShadow: "none",
                                isolation: 'isolate',
                                '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    borderRadius: "16px",
                                    padding: "4px",
                                    background: `linear-gradient(to bottom right, ${theme.palette.primary.dark}, ${theme.palette.secondary.main}, ${theme.palette.secondary.light})`,
                                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                    WebkitMaskComposite: 'xor',
                                    maskComposite: 'exclude',
                                    zIndex: -1
                                }
                            }}
                            className="!mt-14 !mb-8"
                        >
                            <div className="overflow-hidden relative flex items-center !p-6 !gap-6 w-full flex-col justify-center sm:justify-between sm:flex-row md:h-75 lg:w-190">
                                <div className="z-10 flex flex-col gap-3 justify-between h-full md:gap-0">
                                    <div className="!text-start">
                                        <Typography
                                            sx={{
                                                fontFamily: "Cinzel",
                                                color: theme.palette.primary.main,
                                                fontWeight: 700
                                            }}
                                            className="!text-[32px] !text-center sm:!text-start md:!text-[36px] lg:!text-[40px]"
                                        >
                                            BUY $ANGELS NOW
                                        </Typography>
                                        <Typography
                                            sx={{
                                                fontWeight: 500
                                            }}
                                            className="!text-sm !text-center sm:!text-start md:!text-lg"
                                        >
                                            Scan the QR code, copy the wallet address below, or connect your wallet to start buying
                                        </Typography>
                                    </div>
                                    <div className="w-full items-center justify-between !p-2 relative rounded-sm hidden sm:flex" style={{ border: `1px solid ${theme.palette.text.disabled}` }}>
                                        <div className="absolute -top-2">
                                            <Typography
                                                sx={{
                                                    fontWeight: 400,
                                                    color: theme.palette.primary.main,
                                                }}
                                                className="!text-xs"
                                            >
                                                Wallet Address
                                            </Typography>
                                        </div>
                                        <Typography className="!text-sm lg:!text-base font-mono flex-1 min-w-0 overflow-hidden text-left">
                                            {truncateAddress(paymentAddress, 32, 16)}
                                        </Typography>
                                        <ContentCopyIcon
                                            sx={{
                                                color: theme.palette.primary.main,
                                                cursor: 'pointer',
                                                flexShrink: 0
                                            }}
                                            className="!text-[20px] !ml-2"
                                            onClick={() => {
                                                navigator.clipboard.writeText(paymentAddress);
                                            }}
                                        />
                                    </div>
                                    <div className="hidden sm:flex">
                                        <WalletButton 
                                            size="large"
                                            startIcon={<WalletIcon sx={{ color: theme.palette.secondary.dark, fontSize: "24px" }} />}
                                        />
                                    </div>
                                </div>
                                <div className="z-10 flex-shrink-0 w-32 h-32 md:w-40 md:h-40 lg:w-44 lg:h-44 bg-white rounded-lg p-3 flex items-center justify-center">
                                    <div className="w-full h-full max-w-full max-h-full">
                                        <QRCode
                                            value={paymentAddress}
                                            size={256}
                                            style={{ 
                                                height: "100%", 
                                                width: "100%"
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="!space-y-4 sm:hidden">
                                    <div className="w-full items-center justify-between gap-4 !p-2 relative rounded-sm flex" style={{ border: `1px solid ${theme.palette.text.disabled}` }}>
                                        <div className="absolute -top-2">
                                            <Typography
                                                sx={{
                                                    fontWeight: 400,
                                                    color: theme.palette.primary.main,
                                                }}
                                                className="!text-xs"
                                            >
                                                Wallet Address
                                            </Typography>
                                        </div>
                                        <Typography className="!text-sm font-mono flex-1 min-w-0 overflow-hidden text-left">
                                            {truncateAddress(paymentAddress, 18, 12)}
                                        </Typography>
                                        <ContentCopyIcon
                                            sx={{
                                                color: theme.palette.primary.main,
                                                cursor: 'pointer',
                                                flexShrink: 0
                                            }}
                                            className="!text-[20px]"
                                            onClick={() => {
                                                navigator.clipboard.writeText(paymentAddress);
                                            }}
                                        />
                                    </div>
                                    <div className="">
                                        <WalletButton 
                                            size="large"
                                            startIcon={<WalletIcon sx={{ color: theme.palette.secondary.dark, fontSize: "24px" }} />}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Card>

                    </div>
                )}


                {/* Merged Sale Progress and Countdown Timer */}
                <div className="w-full flex flex-col items-center justify-center !mt-14">
                    <Card
                        sx={{
                            position: 'relative',
                            background: 'transparent',
                            borderRadius: "16px",
                            boxShadow: "none",
                            isolation: 'isolate',
                            '&::before': {
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                borderRadius: "16px",
                                padding: "4px",
                                background: `linear-gradient(to bottom right, ${theme.palette.primary.dark}, ${theme.palette.secondary.main}, ${theme.palette.secondary.light})`,
                                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                WebkitMaskComposite: 'xor',
                                maskComposite: 'exclude',
                                zIndex: -1
                            }
                        }}
                        className="w-full max-w-4xl"
                    >
                        <div className="relative !p-8 flex flex-col items-center">
                            {/* Sale Progress Section with Multi-tier Progress Bar */}
                            {timerState.phase === 'public-mint' && (
                                <div className="w-full flex flex-col items-center mb-6 sm:mb-8">
                                    {balanceLoading ? (
                                        <Box sx={{ textAlign: 'center', mb: 4 }}>
                                            <Typography
                                                sx={{
                                                    color: theme.palette.text.secondary,
                                                    fontSize: '16px',
                                                    fontFamily: "Albert Sans"
                                                }}
                                            >
                                                Loading balance...
                                            </Typography>
                                        </Box>
                                    ) : balanceError ? (
                                        <Box sx={{ textAlign: 'center', mb: 4 }}>
                                            <Typography
                                                sx={{
                                                    color: theme.palette.error.main,
                                                    fontSize: '14px',
                                                    fontFamily: "Albert Sans"
                                                }}
                                            >
                                                Error loading balance - using cached data
                                            </Typography>
                                        </Box>
                                    ) : null}
                                    <MultiTierProgressBar currentADA={currentADAraised} theme={theme} />
                                </div>
                            )}

                            {/* Countdown Timer Section */}
                            <div className="w-full flex flex-col items-center">
                                <Typography
                                    sx={{
                                        color: theme.palette.primary.main,
                                        fontWeight: 800,
                                        fontFamily: "Cinzel",
                                        fontSize: { xs: '24px', sm: '28px', md: '32px', lg: '36px' },
                                        textAlign: 'center',
                                        mb: { xs: 4, sm: 5, md: 6 },
                                        letterSpacing: { xs: '0.5px', sm: '1px' },
                                        textTransform: 'uppercase',
                                        textShadow: `0 2px 4px ${theme.palette.primary.main}20`
                                    }}
                                >
                                    {timerState.phase === 'pre-sale' && 'Sale Opens In'}
                                    {timerState.phase === 'public-mint' && 'Sale Closes In'}
                                    {timerState.phase === 'sale-ended' && 'Sale Has Ended'}
                                </Typography>
                                {timerState.phase !== 'sale-ended' && (
                                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 md:gap-6 w-full max-w-md sm:max-w-lg md:max-w-2xl">
                                        <FlipClockCard value={timerState.timeRemaining.days} label="Days" theme={theme} />
                                        <FlipClockCard value={timerState.timeRemaining.hours} label="Hours" theme={theme} />
                                        <FlipClockCard value={timerState.timeRemaining.minutes} label="Minutes" theme={theme} />
                                        <FlipClockCard value={timerState.timeRemaining.seconds} label="Seconds" theme={theme} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Sale Ended Message - Only show after sale ends */}
                {timerState.phase === 'sale-ended' && (
                    <div className="flex flex-col items-center justify-center !mt-10 !space-y-4">
                        <Typography
                            sx={{
                                fontFamily: "Cinzel",
                                color: theme.palette.grey[300],
                                fontWeight: 700
                            }}
                            className="!text-[32px] md:!text-[36px] lg:!text-[40px]"
                        >
                            SALE ENDED
                        </Typography>
                        <Typography
                            sx={{
                                color: theme.palette.text.primary,
                                textAlign: 'center'
                            }}
                            className="!text-lg md:!text-xl"
                        >
                            The $ANGELS token sale has concluded. Thank you for your participation!
                        </Typography>
                        <Typography
                            sx={{
                                color: theme.palette.text.secondary,
                                textAlign: 'center'
                            }}
                            className="!text-base"
                        >
                            Follow our social channels for updates on token distribution and future announcements.
                        </Typography>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Section4;