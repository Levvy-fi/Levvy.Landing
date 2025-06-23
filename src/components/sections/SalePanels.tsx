import React from 'react';
import { Card, Typography, useTheme } from '@mui/material';
import { SalePanelProps } from '../../types/saleTypes';
import ShinyButton from '../common/ShinyButton';
import { WalletIcon } from '../common/WalletButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import QRCode from 'react-qr-code';
import { truncateAddress } from '../../utils/addressUtils';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

// Pre-sale panel - shown before sale starts
export const PreSalePanel: React.FC<SalePanelProps> = ({ timerState }) => {
    const theme = useTheme();
    
    return (
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
            <div className="flex flex-col items-center justify-center !p-8 !gap-6 w-full md:h-75 lg:w-190">
                <div className="text-center">
                    <Typography
                        sx={{
                            fontFamily: "Cinzel",
                            color: theme.palette.primary.main,
                            fontWeight: 700
                        }}
                        className="!text-[32px] md:!text-[36px] lg:!text-[40px]"
                    >
                        SALE STARTS IN
                    </Typography>
                    <div className="grid grid-cols-4 gap-4 mt-6">
                        {[
                            { label: 'Days', value: timerState.timeRemaining.days },
                            { label: 'Hours', value: timerState.timeRemaining.hours },
                            { label: 'Minutes', value: timerState.timeRemaining.minutes },
                            { label: 'Seconds', value: timerState.timeRemaining.seconds }
                        ].map(({ label, value }) => (
                            <div key={label} className="text-center">
                                <Typography
                                    sx={{
                                        fontFamily: "Cinzel",
                                        color: theme.palette.primary.light,
                                        fontWeight: 700
                                    }}
                                    className="!text-[28px] md:!text-[32px]"
                                >
                                    {value.toString().padStart(2, '0')}
                                </Typography>
                                <Typography
                                    sx={{
                                        color: theme.palette.text.primary,
                                        fontWeight: 500
                                    }}
                                    className="!text-sm uppercase"
                                >
                                    {label}
                                </Typography>
                            </div>
                        ))}
                    </div>
                </div>
                <Typography
                    sx={{
                        color: theme.palette.text.primary,
                        textAlign: 'center'
                    }}
                    className="!text-lg md:!text-xl"
                >
                    Get ready for the $ANGELS token sale! Connect your wallet to be prepared.
                </Typography>
                <ShinyButton 
                    size="large"
                    startIcon={<WalletIcon sx={{ color: theme.palette.secondary.dark, fontSize: "24px" }} />}
                >
                    Connect Wallet
                </ShinyButton>
            </div>
        </Card>
    );
};

// Active sale panel - shown during sale
export const ActiveSalePanel: React.FC<SalePanelProps> = ({ timerState }) => {
    const theme = useTheme();
    const { siteConfig } = useDocusaurusContext();
    const paymentAddress = (siteConfig.customFields?.paymentWalletAddress as string) || 'addr1qynurh5a8ee068aswr0pnq2ce4uzvzqdfnmtzapc68zraavj5dysang6xcyp62r6dwdm7pnv3nsdwwn7jzzhr03ur6tq78xelf';
    
    return (
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
                        <div className="flex items-center gap-4 mt-2">
                            <Typography
                                sx={{
                                    fontFamily: "Cinzel",
                                    color: theme.palette.error.main,
                                    fontWeight: 600
                                }}
                                className="!text-lg md:!text-xl"
                            >
                                SALE ENDS IN:
                            </Typography>
                            <Typography
                                sx={{
                                    fontFamily: "Cinzel",
                                    color: theme.palette.primary.light,
                                    fontWeight: 700
                                }}
                                className="!text-lg md:!text-xl"
                            >
                                {timerState.timeRemaining.days}d {timerState.timeRemaining.hours}h {timerState.timeRemaining.minutes}m {timerState.timeRemaining.seconds}s
                            </Typography>
                        </div>
                        <Typography
                            sx={{
                                fontWeight: 500
                            }}
                            className="!text-sm !text-center sm:!text-start md:!text-lg !mt-2"
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
                        <ShinyButton 
                            size="large"
                            startIcon={<WalletIcon sx={{ color: theme.palette.secondary.dark, fontSize: "24px" }} />}
                        >
                            Connect Wallet
                        </ShinyButton>
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
                        <ShinyButton 
                            size="large"
                            startIcon={<WalletIcon sx={{ color: theme.palette.secondary.dark, fontSize: "24px" }} />}
                        >
                            Connect Wallet
                        </ShinyButton>
                    </div>
                </div>
            </div>
        </Card>
    );
};

// Sale ended panel - shown after sale ends
export const SaleEndedPanel: React.FC<SalePanelProps> = () => {
    const theme = useTheme();
    
    return (
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
                    background: `linear-gradient(to bottom right, ${theme.palette.grey[600]}, ${theme.palette.grey[400]})`,
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                    zIndex: -1
                }
            }}
            className="!mt-14 !mb-8"
        >
            <div className="flex flex-col items-center justify-center !p-8 !gap-6 w-full md:h-75 lg:w-190">
                <div className="text-center">
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
                            textAlign: 'center',
                            mt: 2
                        }}
                        className="!text-lg md:!text-xl"
                    >
                        The $ANGELS token sale has concluded. Thank you for your participation!
                    </Typography>
                </div>
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
        </Card>
    );
};