import { alpha, IconButton, Link, Typography, useTheme } from "@mui/material";
import React from "react";
import LinkIcon from "../../images/icons/link_icon";
import XIcon from "../../images/socials/xIcon";
import DiscordIcon from "../../images/socials/discordIcon";
import BrowserIcon from "../../images/icons/browser";

const Footer: React.FC = () => {
    const theme = useTheme()

    return (
        <footer className="px-4 !mt-8" style={{backgroundImage: `linear-gradient(to bottom, ${theme.palette.gradient.background[20]}, ${theme.palette.gradient.background[10]})`}}>
            <div className="container mx-auto">
                <div className="w-full flex items-center justify-between py-6 flex-col-reverse sm:flex-row">
                    <div className="flex items-ceter gap-4 md:gap-10 flex-col sm:flex-row">
                        <Link 
                            underline="hover"
                            sx={{
                                color: theme.palette.text.primary,
                            }}
                            className="!flex items-center cursor-pointer !gap-1 justify-center sm:justify-start md:!gap-2"
                        >
                            <LinkIcon className="!text-xl md:!text-2xl"/>
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
                            className="!flex items-center cursor-pointer !gap-1 justify-center sm:justify-start md:!gap-2"
                        >
                            <LinkIcon className="!text-xl md:!text-2xl"/>
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
                            className="!flex items-center cursor-pointer !gap-1 justify-center sm:justify-start md:!gap-2"
                        >
                            <LinkIcon className="!text-xl md:!text-2xl"/>
                            <Typography
                            >
                                Token Sale
                            </Typography>
                        </Link>
                    </div>
                    <div className="!space-x-4 !mt-4 !mb-8">
                        <IconButton
                            aria-label="x"
                            sx={{
                                backgroundColor: theme.palette.primary.light,
                                "&:hover": {
                                    backgroundColor: theme.palette.primary.main
                                },
                                "&:active": {
                                    backgroundColor: theme.palette.primary.contrastText
                                }
                            }}
                            className="!rounded-full !w-10 !h-10 md:!w-12 md:!h-12" 
                        >
                            <XIcon sx={{ color: theme.palette.secondary.dark }} className="!text-xl md:!text-2xl" />
                        </IconButton>
                        <IconButton
                            aria-label="x"
                            sx={{
                                backgroundColor: theme.palette.primary.light,
                                "&:hover": {
                                    backgroundColor: theme.palette.primary.main
                                },
                                "&:active": {
                                    backgroundColor: theme.palette.primary.contrastText
                                }
                            }}
                            className="!rounded-full !w-10 !h-10 md:!w-12 md:!h-12"
                        >
                            <DiscordIcon sx={{ color: theme.palette.secondary.dark }} className="!text-xl md:!text-2xl" />
                        </IconButton>
                        <IconButton
                            aria-label="x"
                            sx={{
                                backgroundColor: theme.palette.primary.light,
                                "&:hover": {
                                    backgroundColor: theme.palette.primary.main
                                },
                                "&:active": {
                                    backgroundColor: theme.palette.primary.contrastText
                                }
                            }}
                            className="!rounded-full !w-10 !h-10 md:!w-12 md:!h-12"
                        >
                            <BrowserIcon sx={{ color: theme.palette.secondary.dark }} className="!text-xl md:!text-2xl" />
                        </IconButton>
                    </div>
                </div>
                <div className="flex items-center justify-between pt-6 pb-10 flex-col-reverse gap-4 sm:gap-0 sm:flex-row" style={{borderTop: `1px solid ${alpha(theme.palette.grey[100], 0.4)}`}}>
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
                    <div className="flex items-center flex-col !gap-4 sm:!gap-6 sm:flex-row">
                        <Link
                            href="/terms"
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
                        href="/policy"
                            underline="hover"
                            sx={{
                                color: alpha(theme.palette.text.primary, 0.4),
                                fontWeight: 400
                            }}
                            className="!text-sm"
                        >
                            Private Policy
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;