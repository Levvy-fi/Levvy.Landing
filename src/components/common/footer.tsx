import { alpha, IconButton, Link, Typography, useTheme } from "@mui/material";
import React from "react";
import LinkIcon from "../../images/icons/link_icon";
import XIcon from "../../images/socials/xIcon";
import DiscordIcon from "../../images/socials/discordIcon";
import BrowserIcon from "../../images/icons/browser";

const Footer: React.FC = () => {
    const theme = useTheme()

    return (
        <footer style={{backgroundImage: `linear-gradient(to bottom, ${theme.palette.gradient.background[20]}, ${theme.palette.gradient.background[10]})`}}>
            <div className="container mx-auto">
                <div className="w-full flex items-center justify-between py-6">
                    <div className="flex items-ceter gap-10">
                        <Link 
                            underline="hover"
                            sx={{
                                color: theme.palette.text.primary,
                            }}
                            className="!flex items-center !gap-2 cursor-pointer"
                        >
                            <LinkIcon className="!text-2xl"/>
                            <Typography
                            >
                                Whitepaper
                            </Typography>
                        </Link>
                        <Link 
                            underline="hover"
                            sx={{
                                color: theme.palette.text.primary,
                            }}
                            className="!flex items-center !gap-2 cursor-pointer"
                        >
                            <LinkIcon className="!text-2xl"/>
                            <Typography
                            >
                                Documentation
                            </Typography>
                        </Link>
                        <Link 
                            underline="hover"
                            sx={{
                                color: theme.palette.text.primary,
                            }}
                            className="!flex items-center !gap-2 cursor-pointer"
                        >
                            <LinkIcon className="!text-2xl"/>
                            <Typography
                            >
                                Token Sale
                            </Typography>
                        </Link>
                    </div>
                    <div className="!space-x-4">
                        <IconButton
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
                            <DiscordIcon sx={{ color: theme.palette.secondary.dark }} className="!text-2xl" />
                        </IconButton>
                        <IconButton
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
                            <BrowserIcon sx={{ color: theme.palette.secondary.dark }} className="!text-2xl" />
                        </IconButton>
                    </div>
                </div>
                <div className="flex items-center justify-between pt-6 pb-10" style={{borderTop: `1px solid ${alpha(theme.palette.grey[100], 0.4)}`}}>
                    <div>
                        <Typography
                            sx={{
                                color: alpha(theme.palette.text.primary, 0.4),
                                fontWeight: 400,
                            }}
                            className="!text-sm"
                        >
                            &copy; 2025 Angel Finance, All Rights Reserved.
                        </Typography>
                    </div>
                    <div className="flex items-center !gap-6">
                        <Link
                            underline="hover"
                            sx={{
                                color: alpha(theme.palette.text.primary, 0.4),
                                fontWeight: 400
                            }}
                            className="!text-sm"
                        >
                            Terms of Service
                        </Link>
                        <Link
                            underline="hover"
                            sx={{
                                color: alpha(theme.palette.text.primary, 0.4),
                                fontWeight: 400
                            }}
                            className="!text-sm"
                        >
                            Cookie Policy
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;