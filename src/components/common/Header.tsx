import { Box, Button, IconButton, keyframes, Link, Menu, MenuItem, Modal, Typography, useTheme, CircularProgress, Alert } from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ShinyButton from "./ShinyButton";
import { WalletIcon as WalletIconButton } from "./WalletButton";
import { useWallet } from "../../hooks/useWallet";
import { truncateAddress } from "../../utils/addressUtils";

// Icon components
import { SvgIcon, SvgIconProps } from "@mui/material";

const WalletIcon = ({ className = "", sx = {} }: { className?: string, sx?: any }) => (
    <SvgIcon viewBox="0 0 24 24" className={className} sx={sx}>
        <path d="M5.07187 21.2034C4.44221 21.2034 3.92156 20.9774 3.50991 20.5253C3.09826 20.0733 2.89244 19.5137 2.89244 18.8465V5.47253C2.89244 4.80529 3.09826 4.24568 3.50991 3.79367C3.92156 3.34166 4.44221 3.11566 5.07187 3.11566H18.9281C19.5578 3.11566 20.0784 3.34166 20.4901 3.79367C20.9017 4.24568 21.1076 4.80529 21.1076 5.47253V7.82941H17.4647C16.7088 7.82941 16.0522 8.09779 15.4949 8.63454C14.9376 9.17129 14.6589 9.80283 14.6589 10.5292V13.7901C14.6589 14.5164 14.9376 15.148 15.4949 15.6847C16.0522 16.2215 16.7088 16.4898 17.4647 16.4898H21.1076V18.8465C21.1076 19.5137 20.9017 20.0733 20.4901 20.5253C20.0784 20.9774 19.5578 21.2034 18.9281 21.2034H5.07187ZM17.4647 14.8468C17.1393 14.8468 16.866 14.7421 16.6447 14.5327C16.4235 14.3232 16.3128 14.0633 16.3128 13.7529V10.5663C16.3128 10.2559 16.4235 9.99597 16.6447 9.78655C16.866 9.57714 17.1393 9.47244 17.4647 9.47244H22.2872C22.6126 9.47244 22.8859 9.57714 23.1071 9.78655C23.3284 9.99597 23.439 10.2559 23.439 10.5663V13.7529C23.439 14.0633 23.3284 14.3232 23.1071 14.5327C22.8859 14.7421 22.6126 14.8468 22.2872 14.8468H17.4647ZM18.1175 13.2039H21.6344V10.1154H18.1175V13.2039ZM19.875 12.3846C20.2004 12.3846 20.4737 12.2799 20.6949 12.0704C20.9162 11.861 21.0268 11.6011 21.0268 11.2907C21.0268 10.9803 20.9162 10.7204 20.6949 10.5109C20.4737 10.3015 20.2004 10.1968 19.875 10.1968C19.5496 10.1968 19.2763 10.3015 19.0551 10.5109C18.8338 10.7204 18.7232 10.9803 18.7232 11.2907C18.7232 11.6011 18.8338 11.861 19.0551 12.0704C19.2763 12.2799 19.5496 12.3846 19.875 12.3846Z" fill="currentColor" />
    </SvgIcon>
);

const ProfileIcon = (props: SvgIconProps) => (
    <SvgIcon {...props} viewBox="0 0 24 24">
        <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
    </SvgIcon>
);

const DisconnectIcon = (props: SvgIconProps) => (
    <SvgIcon {...props} viewBox="0 0 24 24">
        <path d="M16,17V14H9V10H16V7L21,12L16,17M14,2A2,2 0 0,1 16,4V6H14V4H5V20H14V18H16V20A2,2 0 0,1 14,22H5A2,2 0 0,1 3,20V4A2,2 0 0,1 5,2H14Z" />
    </SvgIcon>
);

const Header: React.FC = () => {
    const theme = useTheme();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [scrolled, setScrolled] = useState(false);
    const [copySuccess, setCopySuccess] = useState(false);
    const profileMenuOpen = Boolean(anchorEl);
    
    const { availableWallets, connectedWallet, isConnecting, error, connectWallet, disconnectWallet, refreshBalance } = useWallet();

    type WalletIconProps = {
        src: string;
        alt?: string;
        className?: string;
    }

    const UserWalletIcon: React.FC<WalletIconProps> = ({ src, alt = "Wallet Icon", ...props }) => {
        return <img src={src} alt={alt} {...props} />;
    }

    const handleProfileMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
        // Refresh balance when opening the menu
        if (refreshBalance) {
            refreshBalance();
        }
    };

    const handleProfileMenuClose = () => {
        setAnchorEl(null);
    };

    const switchWallet = () => {
        setIsModalOpen(true);
        handleProfileMenuClose();
    }

    const handleDisconnectWallet = () => {
        disconnectWallet();
        handleProfileMenuClose();
    }

    const handleConnectWallet = async (walletId: string) => {
        try {
            await connectWallet(walletId);
            setIsModalOpen(false);
        } catch (err) {
            // Error is handled by the context
        }
    }
    
    const handleCopyAddress = () => {
        if (connectedWallet?.address) {
            navigator.clipboard.writeText(connectedWallet.address);
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        }
    }

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    return (
        <header
            className={`fixed z-100 transition-all duration-150 ease-in-out w-full !px-4 ${scrolled ? '!py-2 backdrop-blur-md!' : '!py-4'}`}
        >
            <div className="container mx-auto flex items-center justify-between max-sm:!px-0">
                <Link 
                    href="/"
                    className={`${scrolled ? '!w-[146px] sm:!w-100' : '!h-16 sm:!h-20 lg:!w-100'}`}>
                    <img
                        src="/images/angels_logo.webp"
                        alt="angels logo"
                        className={`transition-all duration-150 ${scrolled ? 'h-14 sm:h-16' : 'h-16 sm:h-20'}`}
                    />
                </Link>
                <div className="flex items-center gap-4">
                    <Link 
                        href="/docs/intro"
                        className="text-white hover:text-[#FCB040] transition-all duration-200 font-medium hover:transform hover:-translate-y-[1px]"
                        style={{
                            textDecoration: 'none',
                            fontSize: '16px',
                            padding: '8px 16px',
                            borderRadius: '8px',
                            display: 'inline-block'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(252, 176, 64, 0.1)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                    >
                        Docs
                    </Link>
                    {connectedWallet ? (
                        <div className="flex items-center gap-1">
                            <div
                                style={{
                                    backgroundColor: theme.palette.primary.main,
                                    borderRadius: "12px 4px 4px 12px"
                                }}
                                className="pl-4 py-[10px] pr-3 flex items-center gap-3"
                            >
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center" style={{ backgroundColor: theme.palette.primary.dark }}>
                                        <img src={connectedWallet.icon} alt="wallet" className="w-6 h-6" />
                                    </div>
                                    <div className="flex flex-col items-start">
                                        <Typography
                                            sx={{
                                                color: theme.palette.secondary.dark,
                                                fontWeight: 600,
                                                fontSize: '14px',
                                                lineHeight: 1.2
                                            }}
                                        >
                                            {connectedWallet.balance?.formatted || '₳0'}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                color: theme.palette.secondary.dark,
                                                fontWeight: 400,
                                                fontSize: '12px',
                                                opacity: 0.8,
                                                lineHeight: 1.2
                                            }}
                                        >
                                            {connectedWallet.address ? truncateAddress(connectedWallet.address, 6, 4) : 'Connected'}
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <Button
                                    sx={{
                                        backgroundColor: theme.palette.primary.main,
                                        borderRadius: "4px 12px 12px 4px"
                                    }}
                                    className="!py-2 !min-w-12"
                                    aria-controls={profileMenuOpen ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={profileMenuOpen ? 'true' : undefined}
                                    onClick={handleProfileMenuClick}
                                >
                                    <KeyboardArrowDownIcon sx={{ color: theme.palette.secondary.dark }} className="" />
                                </Button>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={profileMenuOpen}
                                    onClose={handleProfileMenuClose}
                                    slotProps={{
                                        list: {
                                            'aria-labelledby': 'basic-button',
                                        },
                                        paper: {
                                            sx: {
                                                borderRadius: '16px',
                                            },
                                        },
                                    }}
                                    sx={{
                                        borderRadius: "16px"
                                    }}
                                >
                                    <div className="w-72 !rounded-2xl">
                                        <div
                                            style={{
                                                borderBottom: `1px solid ${theme.palette.grey[300]}`
                                            }}
                                            className="!p-3"
                                        >
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center">
                                                    <img
                                                        src={connectedWallet.icon}
                                                        alt="wallet icon"
                                                        className="w-10 h-10"
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <Typography
                                                        sx={{
                                                            fontWeight: 600,
                                                            color: theme.palette.text.primary,
                                                            fontSize: '15px',
                                                            textTransform: 'capitalize'
                                                        }}
                                                    >
                                                        {connectedWallet.name}
                                                    </Typography>
                                                    <Typography
                                                        sx={{
                                                            color: theme.palette.primary.light,
                                                            fontSize: '13px'
                                                        }}
                                                    >
                                                        Connected
                                                    </Typography>
                                                </div>
                                            </div>
                                            <div 
                                                className="flex items-center justify-between p-2.5 rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                                                style={{ backgroundColor: theme.palette.grey[400] }}
                                                onClick={handleCopyAddress}
                                            >
                                                <Typography
                                                    sx={{
                                                        fontFamily: 'monospace',
                                                        fontSize: '13px',
                                                        color: theme.palette.text.primary
                                                    }}
                                                >
                                                    {connectedWallet.address ? truncateAddress(connectedWallet.address, 10, 8) : 'Loading...'}
                                                </Typography>
                                                <ContentCopyIcon sx={{ color: copySuccess ? theme.palette.primary.light : theme.palette.grey[100], fontSize: '16px' }} />
                                            </div>
                                            {copySuccess && (
                                                <Typography
                                                    sx={{
                                                        color: theme.palette.primary.light,
                                                        fontSize: '11px',
                                                        textAlign: 'center',
                                                        mt: 0.5
                                                    }}
                                                >
                                                    Copied!
                                                </Typography>
                                            )}
                                        </div>
                                        <div className="p-3">
                                            <div
                                                style={{ 
                                                    background: `linear-gradient(135deg, ${theme.palette.gradient.button[10]}, ${theme.palette.gradient.button[20]})` 
                                                }}
                                                className="flex flex-col items-center justify-center rounded-lg p-4"
                                            >
                                                <Typography
                                                    sx={{
                                                        color: theme.palette.secondary.dark,
                                                        fontSize: '12px',
                                                        fontWeight: 500,
                                                        textTransform: 'uppercase',
                                                        letterSpacing: '0.5px'
                                                    }}
                                                >
                                                    Balance
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        fontWeight: 800,
                                                        color: theme.palette.secondary.dark,
                                                        fontSize: '28px',
                                                        lineHeight: 1.1,
                                                        fontFamily: 'Cinzel'
                                                    }}
                                                >
                                                    {connectedWallet.balance?.formatted || '₳0'}
                                                </Typography>
                                            </div>
                                        </div>
                                        <div
                                            style={{
                                                borderTop: `1px solid ${theme.palette.grey[300]}`
                                            }}
                                            className="p-3 space-y-1"
                                        >
                                            <MenuItem
                                                sx={{
                                                    "&:hover": {
                                                        backgroundColor: theme.palette.grey[500]
                                                    },
                                                    fontSize: '14px'
                                                }}
                                                className="!gap-2 !rounded-lg !py-2.5"
                                                onClick={switchWallet}
                                            >
                                                <WalletIcon
                                                    sx={{
                                                        color: theme.palette.text.primary,
                                                        fontSize: '20px'
                                                    }}
                                                />
                                                <Typography sx={{ fontSize: '14px' }}>
                                                    Switch Wallet
                                                </Typography>
                                            </MenuItem>
                                            <MenuItem
                                                sx={{
                                                    "&:hover": {
                                                        backgroundColor: theme.palette.error.main
                                                    },
                                                    fontSize: '14px'
                                                }}
                                                className="!gap-2 !rounded-lg !py-2.5"
                                                onClick={handleDisconnectWallet}
                                            >
                                                <DisconnectIcon
                                                    sx={{
                                                        color: theme.palette.text.primary,
                                                        fontSize: '20px'
                                                    }}
                                                />
                                                <Typography sx={{ fontSize: '14px' }}>
                                                    Disconnect Wallet
                                                </Typography>
                                            </MenuItem>
                                        </div>
                                    </div>
                                </Menu>
                            </div>
                        </div>
                    ) : (
                        <ShinyButton 
                            size="large"
                            onClick={() => setIsModalOpen(true)}
                            className="!px-[8px] sm:!px-[22px]"
                            startIcon={<WalletIconButton sx={{ color: theme.palette.secondary.dark, fontSize: '20px', '@media (min-width: 640px)': { fontSize: '24px' } }} />}
                        >
                            Connect Wallet
                        </ShinyButton>
                    )}
                    <Modal
                        open={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
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
                                borderRadius: "20px"
                            }}
                            className="w-116 flex flex-col items-center !p-8"
                        >
                            <IconButton
                                onClick={() => setIsModalOpen(false)}
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
                                <Alert severity="error" className="!mt-4 !mb-2">
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
                                                onClick={() => handleConnectWallet(wallet.id)}
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
                                                <UserWalletIcon src={wallet.icon} alt={wallet.id} className="!w-[35px]" />
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
                </div>
            </div>
        </header>
    );
};

export default Header;