import { Box, Button, IconButton, keyframes, Link, Menu, MenuItem, Modal, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getWallets } from "../../scripts/bifrost";
import CloseIcon from '@mui/icons-material/Close';
import { CardanoWallet } from "../../scripts/types";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

// Icon components
import { SvgIcon, SvgIconProps } from "@mui/material";

const WalletIcon = (props: SvgIconProps) => {
    const { sx = {}, ...otherProps } = props;

    return (
        <SvgIcon
            {...otherProps}
            sx={{
                fontSize: "16px",
                ...sx
            }}
            viewBox="0 0 24 24"
        >
            <path d="M5.07187 21.2034C4.44221 21.2034 3.90562 20.9816 3.46212 20.5381C3.01862 20.0946 2.79688 19.558 2.79688 18.9284V5.07188C2.79688 4.44221 3.01862 3.90562 3.46212 3.46212C3.90562 3.01862 4.44221 2.79688 5.07187 2.79688H18.9284C19.558 2.79688 20.0946 3.01862 20.5381 3.46212C20.9816 3.90562 21.2034 4.44221 21.2034 5.07188V7.50013H18.9284V5.07188H5.07187V18.9284H18.9284V16.5001H21.2034V18.9284C21.2034 19.558 20.9816 20.0946 20.5381 20.5381C20.0946 20.9816 19.558 21.2034 18.9284 21.2034H5.07187ZM13.0121 17.0001C12.4588 17.0001 11.9851 16.8053 11.5911 16.4156C11.1971 16.026 11.0001 15.5541 11.0001 15.0001V9.01212C11.0001 8.45879 11.1971 7.98513 11.5911 7.59113C11.9851 7.19713 12.4588 7.00013 13.0121 7.00013H20.1974C20.7514 7.00013 21.2242 7.19713 21.6159 7.59113C22.0075 7.98513 22.2034 8.45879 22.2034 9.01212V15.0031C22.2034 15.5523 22.0075 16.0225 21.6159 16.4136C21.2242 16.8046 20.7514 17.0001 20.1974 17.0001H13.0121ZM20.2094 15.0001V9.00013H13.0001V15.0001H20.2094ZM16.0001 13.5001C16.4168 13.5001 16.771 13.3543 17.0626 13.0626C17.3543 12.771 17.5001 12.4168 17.5001 12.0001C17.5001 11.5835 17.3543 11.2293 17.0626 10.9376C16.771 10.646 16.4168 10.5001 16.0001 10.5001C15.5835 10.5001 15.2293 10.646 14.9376 10.9376C14.646 11.2293 14.5001 11.5835 14.5001 12.0001C14.5001 12.4168 14.646 12.771 14.9376 13.0626C15.2293 13.3543 15.5835 13.5001 16.0001 13.5001Z" fill="currentColor"/>
        </SvgIcon>
    );
};

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
    const [selectedWallet, setSelectedWallet] = useState<CardanoWallet | null>(null);
    const [scrolled, setScrolled] = useState(false);
    const [animation, setAnimation] = useState<string>('base');

    const profileMenuOpen = Boolean(anchorEl);

    const gradientShift = keyframes`
        0%   { background-position:   0% 50%; }
        50%  { background-position: 100% 50%; }
        100% { background-position:   0% 50%; }
    `;

    const gradientShiftHover = keyframes`
        0% { background-position: 0% }
        100% { background-position: 85% 0% }
    `;

    const gradientShiftUnhover = keyframes`
        0% { background-position: 80% }
        100% { background-position: 0% }
    `;

    let WalletList = getWallets();

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
    };

    const handleProfileMenuClose = () => {
        setAnchorEl(null);
    };

    const switchWallet = () => {
        setIsModalOpen(true);
        handleProfileMenuClose();
    }

    const disconnectWallet = () => {
        setSelectedWallet(null);
        handleProfileMenuClose();
    }

    async function connectWallet(wallet: CardanoWallet) {
        setSelectedWallet(wallet);
        setIsModalOpen(false);
        const api = await wallet.enable();
        const changeAddress = await api.getChangeAddress();
    }

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (animation === 'hover' || animation === 'unhover') {
            const timeout = setTimeout(() => {
                setAnimation('base');
            }, 500);
            return () => clearTimeout(timeout);
        }
    }, [animation]);

    return (
        <header
            className={`fixed z-50 transition-all duration-150 ease-in-out w-full !px-4 ${scrolled ? '!py-2 backdrop-blur-md!' : '!py-4'}`}
        >
            <div className="container mx-auto flex items-center justify-between">
                <div className={`${scrolled ? '!w-100' : '!h-16 sm:!h-20 sm:!w-144'}`}>
                    <img
                        src="/images/angels_logo.webp"
                        alt="angels logo"
                        className={`transition-all duration-150 ${scrolled ? 'h-16' : 'h-16 sm:h-20'}`}
                    />
                </div>
                <div>
                    {selectedWallet ? (
                        <div className="flex items-center gap-1">
                            <div
                                style={{
                                    backgroundColor: theme.palette.primary.main,
                                    borderRadius: "12px 4px 4px 12px"
                                }}
                                className="pl-4 py-[10px] pr-3 flex items-center gap-2"
                            >
                                <ProfileIcon
                                    sx={{
                                        color: theme.palette.secondary.dark,
                                        fontSize: '20px'
                                    }}
                                />
                                <Typography
                                    sx={{
                                        color: theme.palette.secondary.dark,
                                        fontWeight: 500
                                    }}
                                    className="!text-sm"
                                >
                                    addr1q
                                </Typography>
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
                                    }}
                                    sx={{
                                        borderRadius: "16px"
                                    }}
                                    PaperProps={{
                                        sx: {
                                            borderRadius: '16px',
                                        },
                                    }}
                                >
                                    <div className="w-80 !rounded-2xl">
                                        <div
                                            style={{
                                                borderBottom: `1px solid ${theme.palette.grey[300]}`
                                            }}
                                            className="flex items-center justify-between !p-4"
                                        >
                                            <div className="w-10 aspect-square">
                                                <img
                                                    src={selectedWallet.icon}
                                                    alt="wallet icon"
                                                />
                                            </div>
                                            <div>
                                                <Typography>
                                                    addr1q...nnfyr123vd13
                                                </Typography>
                                            </div>
                                            <div>
                                                <IconButton>
                                                    <ContentCopyIcon sx={{ color: theme.palette.grey[100] }} className="!text-[20px]" />
                                                </IconButton>
                                            </div>
                                        </div>
                                        <div className="my-2 p-4">
                                            <div
                                                style={{ backgroundColor: theme.palette.grey[400] }}
                                                className="flex flex-col items-center justify-center rounded-xl h-24"
                                            >
                                                <Typography>
                                                    Wallet Balance
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        fontWeight: 800,
                                                        color: theme.palette.primary.light
                                                    }}
                                                    className="!text-[32px]"
                                                >
                                                    ₳364.44
                                                </Typography>
                                            </div>
                                        </div>
                                        <div
                                            style={{
                                                borderTop: `1px solid ${theme.palette.grey[300]}`
                                            }}
                                            className="p-4"
                                        >
                                            <MenuItem
                                                sx={{
                                                    "&:hover": {
                                                        backgroundColor: theme.palette.grey[500]
                                                    }
                                                }}
                                                className="!gap-2 !rounded-xl !py-4"
                                                onClick={switchWallet}
                                            >
                                                <WalletIcon
                                                    sx={{
                                                        color: theme.palette.text.primary,
                                                        fontSize: '24px'
                                                    }}
                                                />
                                                <Typography>
                                                    Switch Wallet
                                                </Typography>
                                            </MenuItem>
                                            <MenuItem
                                                sx={{
                                                    "&:hover": {
                                                        backgroundColor: theme.palette.error.main
                                                    }
                                                }}
                                                className="!gap-2 !rounded-xl !py-4"
                                                onClick={disconnectWallet}
                                            >
                                                <DisconnectIcon
                                                    sx={{
                                                        color: theme.palette.text.primary,
                                                        fontSize: '24px'
                                                    }}
                                                />
                                                <Typography>
                                                    Disconnect Wallet
                                                </Typography>
                                            </MenuItem>
                                        </div>
                                    </div>
                                </Menu>
                            </div>
                        </div>
                    ) : (
                        <Button
                            onMouseEnter={() => setAnimation('hover')}
                            onMouseLeave={() => setAnimation('unhover')}
                            onClick={() => setIsModalOpen(true)}
                            disableRipple
                            startIcon={<WalletIcon sx={{ color: theme.palette.secondary.dark, fontSize: '20px', '@media (min-width: 640px)': { fontSize: '24px' } }} />}
                            sx={{
                                backgroundImage: `linear-gradient(to right, 
                            ${theme.palette.gradient.button[30]}, 
                            ${theme.palette.gradient.button[20]} 41%, 
                            ${theme.palette.gradient.button[10]}, 
                            ${theme.palette.gradient.button[30]})`,
                                borderRadius: "12px",
                                backgroundSize: "200% 100%",
                                animation:
                                    animation === 'hover'
                                        ? `${gradientShiftHover} 0.5s forwards`
                                        : animation === 'unhover'
                                            ? `${gradientShiftUnhover} 0.5s forwards`
                                            : `${gradientShift} 6s ease-in-out infinite`,
                                transition: "all 0.3s ease-in-out",
                                "&:hover": {
                                    animation: `${gradientShiftHover} 0.5s forwards`,
                                },
                                "&:active": {
                                    backgroundImage: `linear-gradient(to right, ${theme.palette.gradient.button[60]})`
                                },
                                width: '156px',
                                height: '48px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '6px',
                                '@media (min-width: 640px)': {
                                    width: '180px',
                                    gap: '10px',
                                }
                            }}
                        >
                            <Typography
                                sx={{
                                    color: theme.palette.secondary.dark,
                                    fontWeight: 500,
                                    textTransform: 'capitalize',
                                }}
                                className="!text-xs sm:!text-sm"
                            >
                                Connect Wallet
                            </Typography>
                        </Button>
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
                            <div className="grid grid-cols-1 w-full !gap-y-2 !mt-6">
                                {WalletList.map((wallet) => {
                                    return (
                                        <Button
                                            onClick={() => connectWallet(wallet)}
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
                                            startIcon={<UserWalletIcon src={wallet.icon} alt={wallet.id} className="!w-[35px]" />}
                                        >
                                            <div>
                                                <Typography
                                                    sx={{
                                                        fontWeight: 500,
                                                        color: theme.palette.text.primary
                                                    }}
                                                    className="!text-[20px] capitalize"
                                                >
                                                    {wallet.id}
                                                </Typography>
                                            </div>
                                            <div />
                                        </Button>
                                    );
                                })}
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