import { Box, Button, IconButton, keyframes, Link, Menu, MenuItem, Modal, Paper, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import AngelsLogo from "../../images/angels_logo.webp";
import WalletIcon from "../../images/icons/wallet"
import {getWallets} from "../../scripts/bifrost";
import CloseIcon from '@mui/icons-material/Close';
import { CardanoWallet } from "../../scripts/types";
import ProfileIcon from "../../images/icons/profile";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DisconnectIcon from "../../images/icons/disconnect";

const Header: React.FC = () => {
    const theme = useTheme()

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [selectedWallet, setSelectedWallet] = useState<CardanoWallet | null>(null);
    const [scrolled, setScrolled] = useState(false);
    const [copied, setCopied] = useState(false);
    const [animation, setAnimation] = useState<string>('base');

    const profileMenuOpen = Boolean(anchorEl)
    
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

    async function connectWallet(wallet: CardanoWallet)
    {
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
            className={`fixed z-100 transition-all duration-150 ease-in-out w-full !px-4 ${scrolled ? '!py-2 backdrop-blur-md!' : '!py-4'}`}
        >
            <div className="container mx-auto flex items-center justify-between">
                <div className={`${scrolled ? '!w-100' : '!h-16 sm:!h-20 sm:!w-144'}`}>
                    <img
                        src={AngelsLogo}
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
                                    color: theme.palette.secondary.dark
                                }}
                                className="!text-[20px]"
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
                                <KeyboardArrowDownIcon sx={{color: theme.palette.secondary.dark}} className=""/>
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
                                            <Typography

                                            >
                                                addr1q...nnfyr123vd13
                                            </Typography>
                                        </div>
                                        <div>
                                            <IconButton>
                                                <ContentCopyIcon sx={{color: theme.palette.grey[100]}} className="!text-[20px]"/>
                                            </IconButton>
                                        </div>
                                    </div>
                                    <div
                                        className="my-2 p-4"
                                    >
                                        <div 
                                            style={{backgroundColor: theme.palette.grey[400]}} 
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
                                                "&:hover":{
                                                    backgroundColor: theme.palette.grey[500]
                                                }
                                            }}
                                            className="!gap-2 !rounded-xl !py-4"
                                            onClick={switchWallet}
                                        >
                                            <WalletIcon
                                                sx={{
                                                    color: theme.palette.text.primary
                                                }}
                                                className="!text-2xl"
                                            />
                                            <Typography>
                                                Switch Wallet
                                            </Typography>
                                        </MenuItem>
                                        <MenuItem 
                                            sx={{
                                                "&:hover":{
                                                    backgroundColor: theme.palette.error.main
                                                }
                                            }}
                                            className="!gap-2 !rounded-xl !py-4"
                                            onClick={disconnectWallet}
                                        >
                                            <DisconnectIcon
                                                sx={{
                                                    color: theme.palette.text.primary
                                                }}
                                                className="!text-2xl"
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
                        }
                        }}
                        className="w-33 sm:!w-39 !h-12 gap-[6px] sm:gap-[10px]"
                    >
                        <WalletIcon sx={{ color: theme.palette.secondary.dark}}  className="!text-[20px] sm:!text-[24px]"/>
                        <Typography
                        sx={{
                            color: theme.palette.secondary.dark,
                            fontWeight: 500
                        }}
                        className="capitalize !text-xs sm:!text-sm"
                        >
                        Connect Wallet
                        </Typography>
                    </Button>
                    )}
                    <Modal
                        open={isModalOpen}
                        onClose={()=> setIsModalOpen(false)}
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
                                onClick={()=> setIsModalOpen(false)}
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
                                    return(
                                        <Button
                                            onClick={()=>connectWallet(wallet)}
                                            key={wallet.id}
                                            sx={{
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                border: `1px solid ${theme.palette.text.disabled}`,
                                                "&:hover": {
                                                    backgroundColor: theme.palette.grey[300]
                                                }
                                            }}
                                            className="!h-15"
                                        >
                                            <div className="w-9">
                                                <img
                                                    src={wallet.icon}
                                                    alt={wallet.id}
                                                />
                                            </div>
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
                                            <div/>
                                        </Button>
                                    );
                                })}
                            </div>
                            <div className="w-full mt-1">
                                <Button
                                    sx={{
                                        color: theme.palette.grey[200],
                                        fontWeight: 400,
                                        textAlign: "left",
                                        "&:hover": {
                                            backgroundColor: "transparent",
                                            textDecoration: "underline"
                                        }
                                    }}
                                >
                                </Button>
                            </div>
                            <div className="mt-8">
                                <Typography
                                    sx={{
                                        color: theme.palette.grey[100],
                                        textAlign: "center"
                                    }}
                                    className="!text-sm"
                                >
                                    <span>By connecting your wallet, you agree to Angel Finance&apos;s </span><br/> 
                                    <Link className="cursor-pointer">Terms of Service</Link>
                                    <span> and consent to its </span>
                                    <Link className="cursor-pointer">Privacy Policy.</Link>
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