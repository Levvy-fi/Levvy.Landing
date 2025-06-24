import { Card, IconButton, Typography, useTheme, LinearProgress, Box, Button, Modal, Alert, CircularProgress, Link, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { SvgIcon } from "@mui/material";
import { truncateAddress } from "../../utils/addressUtils";
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import QRCode from 'react-qr-code';
import { useSaleTimer } from "../../hooks/useSaleTimer";
import { ANGEL_SALE_CONFIG } from "../../types/saleTypes";
import FlipNumbers from 'react-flip-numbers';
import { useWallet } from "../../hooks/useWallet";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShinyButton from '../common/ShinyButton';
import { WalletIcon } from '../common/WalletButton';
import { blazeWalletService } from '../../services/BlazeWalletService';

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
    const isMediumScreen = screenWidth > 768;
    const isXLScreen = screenWidth > 1280;

    if (!isClient) {
        // Fallback for SSR
        return (
            <div className="flex flex-col items-center gap-1.5 sm:gap-2 md:gap-2.5 lg:gap-3">
                <Card
                    sx={{
                        position: 'relative',
                        background: 'transparent',
                        borderRadius: { xs: "8px", sm: "10px", md: "12px" },
                        boxShadow: "none",
                        isolation: 'isolate',
                        width: '100%',
                        minWidth: { xs: '50px', sm: '60px', md: '70px', lg: '80px', xl: '90px' },
                        maxWidth: { xs: '55px', sm: '65px', md: '75px', lg: '85px', xl: '95px' },
                        height: { xs: '50px', sm: '60px', md: '70px', lg: '80px', xl: '90px' },
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            borderRadius: { xs: "8px", sm: "10px", md: "12px" },
                            padding: { xs: "2px", sm: "2.5px", md: "3px" },
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
                                fontSize: { 
                                    xs: '20px', 
                                    sm: '26px', 
                                    md: '32px', 
                                    lg: '38px',
                                    xl: '44px'
                                },
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
                        fontSize: { 
                            xs: '8px', 
                            sm: '9px', 
                            md: '10px', 
                            lg: '11px',
                            xl: '12px'
                        },
                        fontWeight: 700,
                        textAlign: 'center',
                        letterSpacing: { xs: '0.5px', sm: '0.8px', md: '1px', lg: '1.5px' },
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
        <div className="flex flex-col items-center gap-1.5 sm:gap-2 md:gap-2.5 lg:gap-3">
            <Card
                sx={{
                    position: 'relative',
                    background: 'transparent',
                    borderRadius: { xs: "8px", sm: "10px", md: "12px" },
                    boxShadow: "none",
                    isolation: 'isolate',
                    width: '100%',
                    minWidth: { xs: '50px', sm: '60px', md: '70px', lg: '80px', xl: '90px' },
                    maxWidth: { xs: '55px', sm: '65px', md: '75px', lg: '85px', xl: '95px' },
                    height: { xs: '50px', sm: '60px', md: '70px', lg: '80px', xl: '90px' },
                    overflow: 'hidden',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        borderRadius: { xs: "8px", sm: "10px", md: "12px" },
                        padding: { xs: "2px", sm: "2.5px", md: "3px" },
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
                        height={isXLScreen ? 45 : isMediumScreen ? 35 : isLargeScreen ? 28 : 20}
                        width={isXLScreen ? 30 : isMediumScreen ? 24 : isLargeScreen ? 19 : 14}
                        color={theme.palette.secondary.dark}
                        background="transparent"
                        play={true}
                        perspective={600}
                        numbers={formattedValue}
                        numberStyle={{
                            fontFamily: "Cinzel, serif",
                            fontWeight: "800",
                            fontSize: isXLScreen ? "32px" : isMediumScreen ? "26px" : isLargeScreen ? "20px" : "16px",
                            textShadow: `0 2px 8px ${theme.palette.common.black}50`,
                            letterSpacing: "0.5px"
                        }}
                        nonNumberStyle={{
                            fontFamily: "Cinzel, serif",
                            fontWeight: "800",
                            fontSize: isXLScreen ? "32px" : isMediumScreen ? "26px" : isLargeScreen ? "20px" : "16px",
                            textShadow: `0 2px 8px ${theme.palette.common.black}50`,
                            letterSpacing: "0.5px"
                        }}
                    />
                </div>
            </Card>
            <Typography
                sx={{
                    color: theme.palette.text.primary,
                    fontSize: { 
                        xs: '8px', 
                        sm: '9px', 
                        md: '10px', 
                        lg: '11px',
                        xl: '12px'
                    },
                    fontWeight: 700,
                    textAlign: 'center',
                    letterSpacing: { xs: '0.5px', sm: '0.8px', md: '1px', lg: '1.5px' },
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
        <Box sx={{ 
            width: '100%', 
            maxWidth: { xs: '100%', sm: '500px', md: '600px', lg: '700px', xl: '800px' },
            mx: 'auto', 
            mb: { xs: 3, sm: 3, md: 4 },
            px: { xs: 2, sm: 3, md: 0 }
        }}>
            <Typography
                sx={{
                    color: theme.palette.primary.main,
                    fontWeight: 800,
                    fontFamily: "Cinzel",
                    fontSize: { 
                        xs: '20px', 
                        sm: '26px', 
                        md: '30px', 
                        lg: '34px',
                        xl: '38px'
                    },
                    textAlign: 'center',
                    mb: { xs: 3, sm: 3, md: 4 },
                    letterSpacing: { xs: '0.5px', sm: '1px', md: '1.5px' },
                    textTransform: 'uppercase',
                    lineHeight: 1.2
                }}
            >
Token Sale Progress
            </Typography>
            
            {/* Current Progress Display */}
            <Box sx={{ textAlign: 'center', mb: { xs: 3, sm: 4, md: 5 } }}>
                <Typography
                    sx={{
                        color: theme.palette.primary.light,
                        fontWeight: 900,
                        fontFamily: "Cinzel",
                        fontSize: { 
                            xs: '32px', 
                            sm: '38px', 
                            md: '46px', 
                            lg: '54px',
                            xl: '60px'
                        },
                        lineHeight: 1,
                        textShadow: `0 4px 12px ${theme.palette.primary.main}50`,
                        mb: { xs: 1, sm: 1.5, md: 2 }
                    }}
                >
                    {formatADA(currentADA)}
                </Typography>
                <Typography
                    sx={{
                        color: theme.palette.text.primary,
                        fontSize: { 
                            xs: '14px', 
                            sm: '16px', 
                            md: '18px',
                            lg: '20px'
                        },
                        fontWeight: 600,
                        mt: { xs: 1, sm: 1.5 },
                        opacity: 0.9,
                        fontFamily: "Albert Sans",
                        px: { xs: 2, sm: 0 }
                    }}
                >
                    of {formatADA(hardCap)} raised ({hardCapProgress.toFixed(1)}%)
                </Typography>
            </Box>
            
            {/* Enhanced Responsive Progress Bar */}
            <Box sx={{ 
                position: 'relative', 
                mb: { xs: 2.5, sm: 3, md: 4 },
                px: { xs: 0, sm: 2, md: 3 }
            }}>
                <LinearProgress
                    variant="determinate"
                    value={hardCapProgress}
                    sx={{
                        height: { 
                            xs: 28, 
                            sm: 30, 
                            md: 32,
                            lg: 36
                        },
                        borderRadius: { xs: 2, sm: 2.5, md: 3 },
                        backgroundColor: theme.palette.grey[800],
                        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)',
                        '& .MuiLinearProgress-bar': {
                            borderRadius: { xs: 2, sm: 2.5, md: 3 },
                            background: `linear-gradient(90deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.main}, ${theme.palette.secondary.light})`,
                            transition: 'transform 0.5s ease-in-out',
                            boxShadow: `0 2px 8px ${theme.palette.primary.main}40`
                        }
                    }}
                />
                
                {/* Enhanced Soft Cap Marker */}
                <Box
                    sx={{
                        position: 'absolute',
                        left: `${(softCap / hardCap) * 100}%`,
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: { xs: 2, sm: 3, md: 4 },
                        height: { 
                            xs: 36, 
                            sm: 40, 
                            md: 44,
                            lg: 48
                        },
                        backgroundColor: theme.palette.warning.main,
                        borderRadius: 1,
                        zIndex: 2,
                        boxShadow: `0 0 8px ${theme.palette.warning.main}60`,
                        '&::after': {
                            content: '""',
                            position: 'absolute',
                            top: '-4px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: { xs: 8, sm: 10, md: 12 },
                            height: { xs: 8, sm: 10, md: 12 },
                            backgroundColor: theme.palette.warning.main,
                            borderRadius: '50%',
                            boxShadow: `0 0 12px ${theme.palette.warning.main}80`
                        }
                    }}
                />
            </Box>
            
            {/* Enhanced Responsive Progress Labels */}
            <Box sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: { xs: 'center', sm: 'space-between' }, 
                alignItems: { xs: 'stretch', sm: 'center' },
                gap: { xs: 2, sm: 0 },
                px: { xs: 2, sm: 3, md: 4 }
            }}>
                <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: { xs: 1.5, sm: 2 },
                    justifyContent: { xs: 'center', sm: 'flex-start' }
                }}>
                    <Box
                        sx={{
                            width: { xs: 12, sm: 14, md: 16 },
                            height: { xs: 12, sm: 14, md: 16 },
                            borderRadius: '50%',
                            backgroundColor: currentADA >= softCap ? theme.palette.success.main : theme.palette.warning.main,
                            boxShadow: `0 0 12px ${currentADA >= softCap ? theme.palette.success.main : theme.palette.warning.main}60`,
                            flexShrink: 0,
                            animation: currentADA >= softCap ? 'pulse 2s ease-in-out infinite' : 'none',
                            '@keyframes pulse': {
                                '0%, 100%': { transform: 'scale(1)' },
                                '50%': { transform: 'scale(1.1)' }
                            }
                        }}
                    />
                    <Typography
                        sx={{
                            color: currentADA >= softCap ? theme.palette.success.main : theme.palette.warning.main,
                            fontSize: { 
                                xs: '12px', 
                                sm: '14px', 
                                md: '16px',
                                lg: '18px'
                            },
                            fontWeight: 700,
                            fontFamily: "Albert Sans",
                            letterSpacing: { xs: '0.5px', sm: '0.8px', md: '1px' },
                            whiteSpace: 'nowrap'
                        }}
                    >
                        SOFT CAP: {formatADA(softCap)} {currentADA >= softCap ? '✓' : ''}
                    </Typography>
                </Box>
                <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: { xs: 1.5, sm: 2 },
                    justifyContent: { xs: 'center', sm: 'flex-end' }
                }}>
                    <Box
                        sx={{
                            width: { xs: 12, sm: 14, md: 16 },
                            height: { xs: 12, sm: 14, md: 16 },
                            borderRadius: '50%',
                            backgroundColor: theme.palette.primary.light,
                            boxShadow: `0 0 12px ${theme.palette.primary.light}60`,
                            flexShrink: 0
                        }}
                    />
                    <Typography
                        sx={{
                            color: theme.palette.primary.light,
                            fontSize: { 
                                xs: '12px', 
                                sm: '14px', 
                                md: '16px',
                                lg: '18px'
                            },
                            fontWeight: 700,
                            fontFamily: "Albert Sans",
                            letterSpacing: { xs: '0.5px', sm: '0.8px', md: '1px' },
                            whiteSpace: 'nowrap'
                        }}
                    >
                        HARD CAP: {formatADA(hardCap)}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

const Section4: React.FC = () => {
    const theme = useTheme();
    const { siteConfig } = useDocusaurusContext();
    const paymentAddress = siteConfig.customFields?.paymentWalletAddress as string;
    const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
    const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
    const [copySuccess, setCopySuccess] = useState(false);
    const [buyAmount, setBuyAmount] = useState('30');
    const [isBuying, setIsBuying] = useState(false);
    const [buyError, setBuyError] = useState<string | null>(null);
    const [successTxHash, setSuccessTxHash] = useState<string | null>(null);
    const [purchasedAngels, setPurchasedAngels] = useState<number>(0);
    
    const { connectedWallet, availableWallets, connectWallet, isConnecting, error, refreshBalance } = useWallet();
    const projectId = siteConfig?.customFields?.blockfrostProjectId as string;
    const network = (siteConfig?.customFields?.blockfrostNetwork as string) || 'mainnet';
    
    if (!paymentAddress) {
        console.error('PAYMENT_WALLET_ADDRESS environment variable is required');
    }
    const timerState = useSaleTimer(ANGEL_SALE_CONFIG);
    
    // Hardcoded sale amount - sale completed successfully
    const currentADAraised = 1332000; // 1.332M ADA (hard cap reached)
    const balanceLoading = false;
    const balanceError = null;
    
    const handleCopyAddress = () => {
        navigator.clipboard.writeText(paymentAddress);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
    };
    
    const handleBuyNow = () => {
        setBuyError(null);
        setBuyAmount('30');
        setIsBuyModalOpen(true);
    };
    
    const handleBuySubmit = async () => {
        try {
            setIsBuying(true);
            setBuyError(null);
            
            const amount = parseFloat(buyAmount);
            if (isNaN(amount) || amount <= 0) {
                setBuyError('Please enter a valid amount');
                return;
            }
            
            if (amount < 30) {
                setBuyError('Minimum purchase is 30 ADA');
                return;
            }
            
            if (amount % 30 !== 0) {
                setBuyError('Amount must be in increments of 30 ADA');
                return;
            }
            
            if (!connectedWallet) {
                setBuyError('Please connect your wallet first');
                return;
            }
            
            // Check wallet balance
            if (connectedWallet.balance && amount > connectedWallet.balance.ada) {
                setBuyError('Insufficient balance');
                return;
            }
            
            // Build and submit transaction
            const txHash = await blazeWalletService.buildAndSubmitPaymentTransaction(
                paymentAddress,
                amount,
                connectedWallet.api,
                projectId,
                network
            );
            
            console.log('Transaction submitted:', txHash);
            
            // Store success info
            setPurchasedAngels(amount / 3);
            setSuccessTxHash(txHash);
            
            // Close buy modal
            setIsBuyModalOpen(false);
            setBuyAmount('30');
            
            // Refresh balances
            if (refreshBalance) {
                refreshBalance();
            }
            
        } catch (err) {
            console.error('Transaction error:', err);
            setBuyError(err instanceof Error ? err.message : 'Transaction failed');
        } finally {
            setIsBuying(false);
        }
    };

    return (
        <section id="token-sale" className="flex relative bg-cover px-4 !py-[70px] [mask-image:_linear-gradient(to_bottom,transparent_0,_black_80px,_black_calc(100%-200px),transparent_100%)] sm:[mask-image:_linear-gradient(to_bottom,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)] md:!py-30 lg:!py-[140px]" style={{ backgroundImage: `url(/images/section4/section_bg.webp)` }}>
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
                        className="!font-bold !text-[42px] sm:!text-[76px] md:!text-[94px] lg:!text-[110px] xl:!text-[120px]"
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
                    <div id="buy-angels" className="w-full flex flex-col items-center justify-center">
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
                                                color: copySuccess ? theme.palette.primary.light : theme.palette.primary.main,
                                                cursor: 'pointer',
                                                flexShrink: 0,
                                                transition: 'color 0.2s'
                                            }}
                                            className="!text-[20px] !ml-2"
                                            onClick={handleCopyAddress}
                                        />
                                    </div>
                                    <div className="hidden sm:flex">
                                        {connectedWallet ? (
                                            <ShinyButton
                                                size="large"
                                                onClick={handleBuyNow}
                                                startIcon={<ShoppingCartIcon sx={{ color: theme.palette.secondary.dark, fontSize: "24px" }} />}
                                                variant="secondary"
                                                sx={{ px: 4, py: 1.5 }}
                                            >
                                                Buy Now
                                            </ShinyButton>
                                        ) : (
                                            <ShinyButton
                                                size="large"
                                                onClick={() => setIsWalletModalOpen(true)}
                                                startIcon={<WalletIcon sx={{ color: theme.palette.secondary.dark, fontSize: "24px" }} />}
                                                variant="primary"
                                                sx={{ px: 4, py: 1.5 }}
                                            >
                                                Connect Wallet
                                            </ShinyButton>
                                        )}
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
                                                color: copySuccess ? theme.palette.primary.light : theme.palette.primary.main,
                                                cursor: 'pointer',
                                                flexShrink: 0,
                                                transition: 'color 0.2s'
                                            }}
                                            className="!text-[20px]"
                                            onClick={handleCopyAddress}
                                        />
                                    </div>
                                    <div className="">
                                        {connectedWallet ? (
                                            <ShinyButton
                                                size="large"
                                                onClick={handleBuyNow}
                                                startIcon={<ShoppingCartIcon sx={{ color: theme.palette.secondary.dark, fontSize: "24px" }} />}
                                                variant="secondary"
                                                sx={{ px: 4, py: 1.5 }}
                                            >
                                                Buy Now
                                            </ShinyButton>
                                        ) : (
                                            <ShinyButton
                                                size="large"
                                                onClick={() => setIsWalletModalOpen(true)}
                                                startIcon={<WalletIcon sx={{ color: theme.palette.secondary.dark, fontSize: "24px" }} />}
                                                variant="primary"
                                                sx={{ px: 4, py: 1.5 }}
                                            >
                                                Connect Wallet
                                            </ShinyButton>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Card>

                    </div>
                )}


                {/* Merged Sale Progress and Countdown Timer - Hide when sale ended */}
                {timerState.phase !== 'sale-ended' && (
                    <div className="w-full flex flex-col items-center justify-center !mt-[24px] sm:!mt-14">
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
                            className="w-full max-w-[95%] sm:max-w-2xl md:max-w-3xl lg:max-w-4xl"
                        >
                            <div className="relative !p-4 sm:!p-6 md:!p-6 lg:!p-8 flex flex-col items-center">
                            {/* Sale Progress Section with Multi-tier Progress Bar */}
                            {timerState.phase === 'public-mint' && (
                                <div className="w-full flex flex-col items-center mb-4 sm:mb-6">
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
                                                    color: theme.palette.text.secondary,
                                                    fontSize: '14px',
                                                    fontFamily: "Albert Sans",
                                                    opacity: 0.8
                                                }}
                                            >
                                                Loading balance...
                                            </Typography>
                                        </Box>
                                    ) : null}
                                    <MultiTierProgressBar currentADA={currentADAraised} theme={theme} />
                                </div>
                            )}

                            {/* Countdown Timer Section - Hide completely when sale ended */}
                            {timerState.phase !== 'sale-ended' && (
                                <div className="w-full flex flex-col items-center">
                                    <Typography
                                        sx={{
                                            color: theme.palette.primary.main,
                                            fontWeight: 800,
                                            fontFamily: "Cinzel",
                                            fontSize: { xs: '24px', sm: '26px', md: '28px', lg: '32px' },
                                            textAlign: 'center',
                                            mb: { xs: 3, sm: 3, md: 4, lg: 5 },
                                            letterSpacing: { xs: '0.5px', sm: '1px' },
                                            textTransform: 'uppercase',
                                            textShadow: `0 2px 4px ${theme.palette.primary.main}20`
                                        }}
                                    >
                                        {timerState.phase === 'pre-sale' && 'Sale Opens In'}
                                        {timerState.phase === 'public-mint' && 'Sale Closes In'}
                                    </Typography>
                                    <div className="grid grid-cols-4 gap-[5px] w-full max-w-[200px] xs:max-w-[220px] sm:max-w-[260px] md:max-w-[300px] lg:max-w-[340px] xl:max-w-[380px]">
                                        <FlipClockCard value={timerState.timeRemaining.days} label="Days" theme={theme} />
                                        <FlipClockCard value={timerState.timeRemaining.hours} label="Hours" theme={theme} />
                                        <FlipClockCard value={timerState.timeRemaining.minutes} label="Minutes" theme={theme} />
                                        <FlipClockCard value={timerState.timeRemaining.seconds} label="Seconds" theme={theme} />
                                    </div>
                                </div>
                            )}
                        </div>
                    </Card>
                </div>
                )}

                {/* Sale Ended - Beautiful summary display */}
                {timerState.phase === 'sale-ended' && (
                    <div className="w-full flex flex-col items-center justify-center !mt-8 sm:!mt-12">
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
                            className="w-full max-w-[95%] sm:max-w-xl md:max-w-2xl lg:max-w-3xl"
                        >
                            <div className="relative !p-6 sm:!p-8 md:!p-10 lg:!p-12 flex flex-col items-center">
                                <Typography
                                    sx={{
                                        fontFamily: "Cinzel",
                                        color: theme.palette.primary.main,
                                        fontWeight: 800,
                                        fontSize: { xs: '20px', sm: '24px', md: '28px', lg: '32px' },
                                        textAlign: 'center',
                                        mb: 3,
                                        letterSpacing: '1px',
                                        textTransform: 'uppercase'
                                    }}
                                >
                                    Sale Successfully Completed
                                </Typography>
                                
                                {/* Total Raised Display - Enhanced */}
                                <Box sx={{ 
                                    textAlign: 'center', 
                                    mb: 6,
                                    position: 'relative'
                                }}>
                                    {/* Decorative elements */}
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            transform: 'translate(-50%, -50%)',
                                            width: { xs: '200px', sm: '300px', md: '400px' },
                                            height: { xs: '200px', sm: '300px', md: '400px' },
                                            background: `radial-gradient(circle, ${theme.palette.primary.main}20 0%, transparent 70%)`,
                                            filter: 'blur(40px)',
                                            zIndex: 0
                                        }}
                                    />
                                    
                                    <Box sx={{ position: 'relative', zIndex: 1 }}>
                                        <Typography
                                            sx={{
                                                color: theme.palette.primary.main,
                                                fontSize: { xs: '16px', sm: '18px', md: '20px' },
                                                fontWeight: 700,
                                                mb: 3,
                                                fontFamily: "Albert Sans",
                                                textTransform: 'uppercase',
                                                letterSpacing: '3px',
                                                textShadow: `0 2px 8px ${theme.palette.primary.main}30`
                                            }}
                                        >
                                            Total Raised
                                        </Typography>
                                        
                                        {/* Main amount with shine effect */}
                                        <Box sx={{ position: 'relative', display: 'inline-block' }}>
                                            <Typography
                                                sx={{
                                                    color: theme.palette.primary.light,
                                                    fontWeight: 900,
                                                    fontFamily: "Cinzel",
                                                    fontSize: { 
                                                        xs: '56px', 
                                                        sm: '72px', 
                                                        md: '96px', 
                                                        lg: '120px'
                                                    },
                                                    lineHeight: 0.9,
                                                    textShadow: `
                                                        0 4px 16px ${theme.palette.primary.main}50,
                                                        0 8px 32px ${theme.palette.primary.main}30
                                                    `,
                                                    mb: 3,
                                                    background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.secondary.main}, ${theme.palette.primary.light})`,
                                                    WebkitBackgroundClip: 'text',
                                                    WebkitTextFillColor: 'transparent',
                                                    backgroundClip: 'text',
                                                    animation: 'shimmer 3s ease-in-out infinite',
                                                    '@keyframes shimmer': {
                                                        '0%, 100%': { backgroundPosition: '0% 50%' },
                                                        '50%': { backgroundPosition: '100% 50%' }
                                                    },
                                                    backgroundSize: '200% 200%'
                                                }}
                                            >
                                                ₳{(currentADAraised / 1000000).toFixed(2)}M
                                            </Typography>
                                        </Box>
                                        
                                        {/* Success badge */}
                                        <Box
                                            sx={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: 1.5,
                                                backgroundColor: `${theme.palette.success.main}15`,
                                                border: `2px solid ${theme.palette.success.main}`,
                                                borderRadius: '50px',
                                                px: 3,
                                                py: 1.5,
                                                mt: 2
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    width: 24,
                                                    height: 24,
                                                    borderRadius: '50%',
                                                    backgroundColor: theme.palette.success.main,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontSize: '16px',
                                                    fontWeight: 'bold',
                                                    color: theme.palette.secondary.dark,
                                                    animation: 'pulse 2s ease-in-out infinite',
                                                    '@keyframes pulse': {
                                                        '0%, 100%': { transform: 'scale(1)' },
                                                        '50%': { transform: 'scale(1.1)' }
                                                    }
                                                }}
                                            >
                                                ✓
                                            </Box>
                                            <Typography
                                                sx={{
                                                    color: theme.palette.success.main,
                                                    fontSize: { xs: '16px', sm: '18px', md: '20px' },
                                                    fontWeight: 700,
                                                    fontFamily: "Albert Sans",
                                                    letterSpacing: '1px'
                                                }}
                                            >
                                                HARD CAP REACHED
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                                
                                {/* Thank You Message */}
                                <Box sx={{ textAlign: 'center' }}>
                                    <Typography
                                        sx={{
                                            color: theme.palette.text.primary,
                                            fontSize: { xs: '18px', sm: '20px', md: '24px' },
                                            fontWeight: 600,
                                            fontFamily: "Albert Sans",
                                            lineHeight: 1.6,
                                            maxWidth: '600px',
                                            mx: 'auto',
                                            opacity: 0.9
                                        }}
                                    >
                                        Thank you to all participants for making this sale a tremendous success!
                                    </Typography>
                                </Box>
                            </div>
                        </Card>
                    </div>
                )}
                
                {/* Wallet Connection Modal */}
                <Modal
                    open={isWalletModalOpen}
                    onClose={() => setIsWalletModalOpen(false)}
                    aria-labelledby="wallet-modal-title"
                    aria-describedby="wallet-modal-description"
                >
                    <Box
                        component="div"
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            backgroundColor: theme.palette.background.default,
                            borderRadius: "20px",
                            width: { xs: '90%', sm: '464px' },
                            maxWidth: '464px'
                        }}
                        className="flex flex-col items-center !p-8"
                    >
                        <IconButton
                            onClick={() => setIsWalletModalOpen(false)}
                            className="!absolute !top-4 !right-4"
                        >
                            <CloseIcon
                                sx={{
                                    color: theme.palette.grey[50]
                                }}
                            />
                        </IconButton>
                        <div id="wallet-modal-title" className="relative">
                            <Typography
                                sx={{
                                    color: theme.palette.text.primary
                                }}
                                className="!text-[28px] !font-semibold"
                            >
                                Connect a Wallet
                            </Typography>
                        </div>
                        {error && (
                            <Alert severity="error" className="!mt-4 !mb-2 w-full">
                                {error}
                            </Alert>
                        )}
                        <div className="grid grid-cols-1 w-full !gap-y-2 !mt-6">
                            {availableWallets.length === 0 ? (
                                <Typography sx={{ color: theme.palette.text.secondary, textAlign: 'center', py: 4 }}>
                                    No wallets detected. Please install a Cardano wallet extension.
                                </Typography>
                            ) : (
                                availableWallets.map((wallet) => {
                                    return (
                                        <Button
                                            onClick={async () => {
                                                try {
                                                    await connectWallet(wallet.id);
                                                    setIsWalletModalOpen(false);
                                                } catch (err) {
                                                    // Error handled by context
                                                }
                                            }}
                                            disabled={isConnecting}
                                            key={wallet.id}
                                            sx={{
                                                border: `1px solid ${theme.palette.text.disabled}`,
                                                "&:hover": {
                                                    backgroundColor: theme.palette.grey[300]
                                                },
                                                justifyContent: 'flex-start',
                                                '& .MuiButton-startIcon': {
                                                    marginLeft: '8px'
                                                }
                                            }}
                                            className="!h-15"
                                            startIcon={
                                                isConnecting ? 
                                                <CircularProgress size={35} sx={{ color: theme.palette.primary.main }} /> : 
                                                <img src={wallet.icon} alt={wallet.id} className="!w-[35px]" />
                                            }
                                        >
                                            <div>
                                                <Typography
                                                    sx={{
                                                        fontWeight: 500,
                                                        color: theme.palette.text.primary
                                                    }}
                                                    className="!text-[20px] capitalize"
                                                >
                                                    {wallet.name}
                                                </Typography>
                                            </div>
                                            <div />
                                        </Button>
                                    );
                                })
                            )}
                        </div>
                        <div className="mt-8">
                            <Typography
                                sx={{
                                    color: theme.palette.grey[100],
                                    textAlign: "center"
                                }}
                                className="!text-sm"
                            >
                                <span>By connecting your wallet, you agree to Angel Finance&apos;s </span><br />
                                <Link href="/docs/terms" className="cursor-pointer">Terms of Service</Link>
                                <span> and consent to its </span>
                                <Link href="/docs/policy" className="cursor-pointer">Privacy Policy.</Link>
                            </Typography>
                        </div>
                    </Box>
                </Modal>

                {/* Buy Modal */}
                <Modal
                    open={isBuyModalOpen}
                    onClose={() => setIsBuyModalOpen(false)}
                    aria-labelledby="buy-modal-title"
                    aria-describedby="buy-modal-description"
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: { xs: '90%', sm: '500px' },
                            bgcolor: theme.palette.background.default,
                            border: `1px solid ${theme.palette.divider}`,
                            boxShadow: 24,
                            p: 4,
                            borderRadius: '16px',
                            maxHeight: '90vh',
                            overflowY: 'auto'
                        }}
                    >
                        <div className="flex justify-between items-center mb-4">
                            <Typography
                                id="buy-modal-title"
                                variant="h5"
                                component="h2"
                                sx={{
                                    fontFamily: "Cinzel",
                                    fontWeight: 700,
                                    color: theme.palette.primary.main
                                }}
                            >
                                Buy $ANGELS
                            </Typography>
                            <IconButton
                                onClick={() => setIsBuyModalOpen(false)}
                                sx={{ color: theme.palette.text.secondary }}
                            >
                                <CloseIcon />
                            </IconButton>
                        </div>

                        <div className="space-y-4">
                            {/* Amount input */}
                            <div>
                                <Typography className="mb-2" sx={{ color: theme.palette.text.primary }}>
                                    Amount to spend (ADA)
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <IconButton
                                        onClick={() => {
                                            const current = parseFloat(buyAmount) || 0;
                                            const newAmount = Math.max(30, current - 30);
                                            setBuyAmount(newAmount.toString());
                                        }}
                                        sx={{
                                            width: 48,
                                            height: 48,
                                            backgroundColor: theme.palette.gradient.button[10],
                                            border: `2px solid ${theme.palette.gradient.button[20]}`,
                                            '&:hover': {
                                                backgroundColor: theme.palette.gradient.button[20],
                                                transform: 'scale(1.05)',
                                                '& .MuiSvgIcon-root': {
                                                    color: theme.palette.secondary.dark
                                                }
                                            },
                                            '&:active': {
                                                transform: 'scale(0.95)'
                                            },
                                            '&:disabled': {
                                                opacity: 0.3,
                                                backgroundColor: theme.palette.grey[400],
                                                border: `2px solid ${theme.palette.grey[300]}`,
                                            },
                                            transition: 'all 0.2s ease'
                                        }}
                                        disabled={!buyAmount || parseFloat(buyAmount) <= 30}
                                    >
                                        <RemoveIcon sx={{ 
                                            color: theme.palette.secondary.dark,
                                            fontSize: 28,
                                            fontWeight: 'bold'
                                        }} />
                                    </IconButton>
                                    
                                    <TextField
                                        fullWidth
                                        type="number"
                                        value={buyAmount}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (value === '') {
                                                setBuyAmount('');
                                            } else {
                                                const num = parseFloat(value);
                                                if (!isNaN(num) && num >= 0) {
                                                    setBuyAmount(value);
                                                }
                                            }
                                        }}
                                        placeholder="30"
                                        InputProps={{
                                            startAdornment: <Typography sx={{ 
                                                mr: 1,
                                                fontSize: '28px',
                                                fontWeight: 700,
                                                color: theme.palette.primary.main
                                            }}>₳</Typography>,
                                            inputProps: {
                                                step: 30,
                                                min: 30
                                            }
                                        }}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '8px',
                                                '& fieldset': {
                                                    borderColor: buyError ? theme.palette.warning.main : theme.palette.divider
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: buyError ? theme.palette.warning.main : theme.palette.text.secondary
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: buyError ? theme.palette.warning.main : theme.palette.primary.main
                                                },
                                                '& input': {
                                                    fontSize: '28px',
                                                    fontWeight: 600,
                                                    fontFamily: 'Cinzel',
                                                    textAlign: 'center',
                                                    padding: '16px 8px'
                                                }
                                            }
                                        }}
                                    />
                                    
                                    <IconButton
                                        onClick={() => {
                                            const current = parseFloat(buyAmount) || 0;
                                            const newAmount = current === 0 ? 30 : current + 30;
                                            setBuyAmount(newAmount.toString());
                                        }}
                                        sx={{
                                            width: 48,
                                            height: 48,
                                            backgroundColor: theme.palette.gradient.button[10],
                                            border: `2px solid ${theme.palette.gradient.button[20]}`,
                                            '&:hover': {
                                                backgroundColor: theme.palette.gradient.button[20],
                                                transform: 'scale(1.05)',
                                                '& .MuiSvgIcon-root': {
                                                    color: theme.palette.secondary.dark
                                                }
                                            },
                                            '&:active': {
                                                transform: 'scale(0.95)'
                                            },
                                            transition: 'all 0.2s ease'
                                        }}
                                    >
                                        <AddIcon sx={{ 
                                            color: theme.palette.secondary.dark,
                                            fontSize: 28,
                                            fontWeight: 'bold'
                                        }} />
                                    </IconButton>
                                </Box>
                                <Typography 
                                    sx={{ 
                                        color: buyError ? theme.palette.warning.main : theme.palette.grey[100],
                                        fontSize: '12px',
                                        mt: 0.5,
                                        textAlign: 'center'
                                    }}
                                >
                                    {buyError || 'Minimum: 30 ADA • Increments of 30 ADA'}
                                </Typography>
                            </div>

                            {/* Token calculation */}
                            <div
                                style={{ 
                                    backgroundColor: theme.palette.grey[400],
                                    border: `1px solid ${theme.palette.grey[300]}`
                                }}
                                className="flex items-center justify-between rounded-lg p-3"
                            >
                                <div>
                                    <Typography
                                        sx={{
                                            color: theme.palette.grey[100],
                                            fontSize: '12px',
                                            fontWeight: 500
                                        }}
                                    >
                                        You will receive
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontWeight: 700,
                                            color: theme.palette.primary.main,
                                            fontSize: '20px',
                                            lineHeight: 1.2,
                                            fontFamily: 'Cinzel'
                                        }}
                                    >
                                        {buyAmount && parseFloat(buyAmount) > 0 ? (parseFloat(buyAmount) / 3).toFixed(0) : '0'} $ANGELS
                                    </Typography>
                                </div>
                                <Typography sx={{ 
                                    color: theme.palette.grey[100], 
                                    fontSize: '12px',
                                    opacity: 0.8 
                                }}>
                                    ₳3 per token
                                </Typography>
                            </div>

                            {/* Wallet balance */}
                            {connectedWallet?.balance && (
                                <Typography sx={{ 
                                    color: theme.palette.grey[100], 
                                    textAlign: 'center',
                                    fontSize: '14px'
                                }}>
                                    Your balance: <span style={{ 
                                        color: theme.palette.primary.main,
                                        fontWeight: 600
                                    }}>{connectedWallet.balance.formatted}</span>
                                </Typography>
                            )}

                            {/* Buy button */}
                            <ShinyButton
                                fullWidth
                                size="large"
                                variant="secondary"
                                onClick={handleBuySubmit}
                                disabled={isBuying || !buyAmount || parseFloat(buyAmount) < 30 || parseFloat(buyAmount) % 30 !== 0}
                                startIcon={isBuying ? <CircularProgress size={20} /> : <ShoppingCartIcon />}
                            >
                                {isBuying ? 'Processing...' : 'Buy Now'}
                            </ShinyButton>

                        </div>
                    </Box>
                </Modal>

                {/* Success Modal */}
                <Modal
                    open={!!successTxHash}
                    onClose={() => setSuccessTxHash(null)}
                    aria-labelledby="success-modal-title"
                    sx={{
                        '& .MuiBackdrop-root': {
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            backdropFilter: 'blur(8px)'
                        }
                    }}
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: { xs: '90%', sm: '500px' },
                            maxWidth: '500px',
                            outline: 'none',
                        }}
                    >
                        {/* Animated rays background */}
                        <Box
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                width: '150%',
                                height: '150%',
                                transform: 'translate(-50%, -50%)',
                                background: `radial-gradient(circle at center, ${theme.palette.gradient.button[10]}20 0%, transparent 70%)`,
                                animation: 'pulse 2s ease-in-out infinite',
                                '@keyframes pulse': {
                                    '0%': { transform: 'translate(-50%, -50%) scale(1)', opacity: 0.8 },
                                    '50%': { transform: 'translate(-50%, -50%) scale(1.2)', opacity: 0.4 },
                                    '100%': { transform: 'translate(-50%, -50%) scale(1)', opacity: 0.8 },
                                }
                            }}
                        />
                        
                        <Box
                            sx={{
                                position: 'relative',
                                bgcolor: theme.palette.background.default,
                                border: `2px solid ${theme.palette.gradient.button[20]}`,
                                borderRadius: '20px',
                                p: 5,
                                textAlign: 'center',
                                boxShadow: `0 0 100px ${theme.palette.primary.main}40`,
                                animation: 'slideIn 0.5s ease-out',
                                '@keyframes slideIn': {
                                    '0%': { transform: 'scale(0.8)', opacity: 0 },
                                    '100%': { transform: 'scale(1)', opacity: 1 },
                                }
                            }}
                        >
                            {/* Angels Logo */}
                            <Box
                                sx={{
                                    width: 120,
                                    height: 120,
                                    margin: '0 auto 3rem',
                                    position: 'relative',
                                    animation: 'logoAppear 0.8s ease-out 0.3s forwards',
                                    opacity: 0,
                                    '@keyframes logoAppear': {
                                        '0%': { transform: 'scale(0) rotate(-180deg)', opacity: 0 },
                                        '50%': { transform: 'scale(1.1) rotate(10deg)', opacity: 1 },
                                        '100%': { transform: 'scale(1) rotate(0deg)', opacity: 1 },
                                    }
                                }}
                            >
                                {/* Glow effect behind logo */}
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        inset: -20,
                                        background: `radial-gradient(circle at center, ${theme.palette.gradient.button[10]}60 0%, transparent 70%)`,
                                        filter: 'blur(20px)',
                                        animation: 'glow 2s ease-in-out infinite',
                                        '@keyframes glow': {
                                            '0%, 100%': { opacity: 0.5 },
                                            '50%': { opacity: 1 },
                                        }
                                    }}
                                />
                                <img 
                                    src="/images/angels_logo.svg" 
                                    alt="Angels Logo" 
                                    style={{ 
                                        width: '100%', 
                                        height: '100%',
                                        position: 'relative',
                                        zIndex: 1,
                                        filter: 'drop-shadow(0 0 20px rgba(249, 182, 62, 0.5))'
                                    }}
                                />
                            </Box>

                            <Typography
                                variant="h4"
                                sx={{
                                    fontFamily: 'Cinzel',
                                    fontWeight: 800,
                                    color: theme.palette.primary.main,
                                    mb: 2,
                                    animation: 'fadeInUp 0.6s ease-out 0.4s forwards',
                                    opacity: 0,
                                    '@keyframes fadeInUp': {
                                        '0%': { transform: 'translateY(20px)', opacity: 0 },
                                        '100%': { transform: 'translateY(0)', opacity: 1 },
                                    }
                                }}
                            >
                                Congratulations!
                            </Typography>

                            <Typography
                                sx={{
                                    color: theme.palette.text.primary,
                                    fontSize: '18px',
                                    mb: 3,
                                    animation: 'fadeInUp 0.6s ease-out 0.5s forwards',
                                    opacity: 0,
                                }}
                            >
                                You have successfully purchased
                            </Typography>

                            <Box
                                sx={{
                                    background: `linear-gradient(135deg, ${theme.palette.gradient.button[10]}20, ${theme.palette.gradient.button[20]}20)`,
                                    border: `1px solid ${theme.palette.gradient.button[20]}40`,
                                    borderRadius: '12px',
                                    p: 3,
                                    mb: 4,
                                    animation: 'fadeInUp 0.6s ease-out 0.6s forwards',
                                    opacity: 0,
                                }}
                            >
                                <Typography
                                    variant="h3"
                                    sx={{
                                        fontFamily: 'Cinzel',
                                        fontWeight: 800,
                                        color: theme.palette.primary.main,
                                        textShadow: `0 0 30px ${theme.palette.primary.main}60`,
                                    }}
                                >
                                    {purchasedAngels} $ANGELS
                                </Typography>
                            </Box>

                            <Typography
                                sx={{
                                    color: theme.palette.grey[100],
                                    fontSize: '14px',
                                    mb: 1,
                                    animation: 'fadeInUp 0.6s ease-out 0.7s forwards',
                                    opacity: 0,
                                }}
                            >
                                Transaction ID:
                            </Typography>

                            <Box
                                onClick={() => {
                                    window.open(`https://cardanoscan.io/transaction/${successTxHash}`, '_blank');
                                }}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: 1,
                                    p: 1.5,
                                    borderRadius: '8px',
                                    backgroundColor: theme.palette.grey[400],
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    animation: 'fadeInUp 0.6s ease-out 0.8s forwards',
                                    opacity: 0,
                                    '&:hover': {
                                        backgroundColor: theme.palette.grey[300],
                                        transform: 'scale(1.02)',
                                    }
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontFamily: 'monospace',
                                        fontSize: '12px',
                                        color: theme.palette.primary.main,
                                    }}
                                >
                                    {successTxHash ? `${successTxHash.slice(0, 8)}...${successTxHash.slice(-8)}` : ''}
                                </Typography>
                                <OpenInNewIcon sx={{ 
                                    fontSize: 16, 
                                    color: theme.palette.primary.main 
                                }} />
                            </Box>

                            <ShinyButton
                                fullWidth
                                size="large"
                                variant="primary"
                                onClick={() => setSuccessTxHash(null)}
                                sx={{ 
                                    mt: 4,
                                    animation: 'fadeInUp 0.6s ease-out 0.9s forwards',
                                    opacity: 0,
                                }}
                            >
                                Awesome!
                            </ShinyButton>
                        </Box>
                    </Box>
                </Modal>
            </div>
        </section>
    );
};

export default Section4;