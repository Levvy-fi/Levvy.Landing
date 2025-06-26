import { alpha, IconButton, Link, Typography, useTheme, SvgIcon } from "@mui/material";
import React from "react";

// Icon components
const LinkIcon = ({ className = "" }: { className?: string }) => (
    <SvgIcon viewBox="0 0 24 25" className={className}>
        <path d="M15.9998 8.87559L7.0998 17.7756C6.91647 17.9589 6.68314 18.0506 6.3998 18.0506C6.11647 18.0506 5.88314 17.9589 5.6998 17.7756C5.51647 17.5923 5.4248 17.3589 5.4248 17.0756C5.4248 16.7923 5.51647 16.5589 5.6998 16.3756L14.5998 7.47559H6.9998C6.71647 7.47559 6.47897 7.37975 6.2873 7.18809C6.09564 6.99642 5.9998 6.75892 5.9998 6.47559C5.9998 6.19225 6.09564 5.95475 6.2873 5.76309C6.47897 5.57142 6.71647 5.47559 6.9998 5.47559H16.9998C17.2831 5.47559 17.5206 5.57142 17.7123 5.76309C17.904 5.95475 17.9998 6.19225 17.9998 6.47559V16.4756C17.9998 16.7589 17.904 16.9964 17.7123 17.1881C17.5206 17.3798 17.2831 17.4756 16.9998 17.4756C16.7165 17.4756 16.479 17.3798 16.2873 17.1881C16.0956 16.9964 15.9998 16.7589 15.9998 16.4756V8.87559Z" fill="currentColor"/>
    </SvgIcon>
);

const XIcon = ({ className = "" }: { className?: string }) => (
    <SvgIcon viewBox="0 0 15 14" className={className}>
        <path d="M4.81524 0.0312004L8.14701 5.03971L12.3727 0.217647L13.6995 0.033754L8.85576 5.9464L14.1031 13.8653H10.166L6.5239 8.65371C6.28637 8.59752 6.16506 8.82355 6.0182 8.94615C4.88675 9.90009 2.94694 13.0863 1.89722 13.675C1.50262 13.8972 1.21401 13.9061 0.777266 13.864L5.82664 7.7534L0.574219 0.0324767H4.81396L4.81524 0.0312004ZM12.4864 13.0607L4.31847 1.22522C3.80638 0.5816 2.91757 0.889364 2.18838 0.835729L10.5695 12.8602L12.4851 13.0607H12.4864Z" fill="currentColor"/>
    </SvgIcon>
);

const DiscordIcon = ({ className = "" }: { className?: string }) => (
    <SvgIcon viewBox="0 0 24 25" className={className}>
        <g clipPath="url(#clip0_55_3237)">
            <path d="M8.67906 9.99805C7.29123 9.99805 6.16211 11.242 6.16211 12.7709C6.16211 14.2999 7.29123 15.5438 8.67906 15.5438C10.0669 15.5438 11.1961 14.2999 11.1961 12.7709C11.1961 11.242 10.0669 9.99805 8.67906 9.99805ZM8.67906 14.1376C8.06664 14.1376 7.56836 13.5245 7.56836 12.7709C7.56836 12.0174 8.06664 11.4043 8.67906 11.4043C9.29153 11.4043 9.78986 12.0174 9.78986 12.7709C9.78986 13.5245 9.29153 14.1376 8.67906 14.1376Z" fill="currentColor"/>
            <path d="M15.3208 9.99854C13.9329 9.99854 12.8037 11.2425 12.8037 12.7714C12.8037 14.3004 13.9329 15.5443 15.3208 15.5443C16.7086 15.5443 17.8377 14.3004 17.8377 12.7714C17.8377 11.2425 16.7086 9.99854 15.3208 9.99854ZM15.3208 14.1381C14.7083 14.1381 14.21 13.525 14.21 12.7714C14.21 12.0179 14.7083 11.4048 15.3208 11.4048C15.9332 11.4048 16.4315 12.0179 16.4315 12.7714C16.4315 13.525 15.9332 14.1381 15.3208 14.1381Z" fill="currentColor"/>
            <path d="M23.9989 17.4717C23.9823 17.1744 23.5619 10.1424 20.8915 5.93587C20.8369 5.84986 20.7642 5.77668 20.6786 5.72156C17.3767 3.59536 15.1276 3.60145 15.0335 3.60107C14.7608 3.60468 14.5259 3.76331 14.4124 3.99253L13.2781 6.16631C12.8555 6.13865 12.4289 6.12431 12 6.12431C11.5712 6.12431 11.1445 6.13865 10.722 6.16631L9.58895 3.99506C9.47594 3.76453 9.2403 3.60473 8.9665 3.60112C8.87186 3.60056 6.62303 3.59559 3.32153 5.72161C3.23589 5.77678 3.16319 5.8499 3.10858 5.93592C0.438204 10.1424 0.0176883 17.1744 0.00109456 17.4717C-0.00931169 17.658 0.0548133 17.8409 0.17936 17.98C0.303204 18.1182 3.24503 21.3507 7.3113 21.3507C7.32948 21.3507 7.34819 21.3506 7.36642 21.3505C7.58012 21.349 7.78145 21.2504 7.91369 21.0826L9.7893 18.7023C10.5097 18.7846 11.2496 18.8274 12 18.8274C12.7505 18.8274 13.4904 18.7846 14.2107 18.7023L16.0863 21.0826C16.2186 21.2504 16.4199 21.349 16.6336 21.3505C16.6521 21.3507 16.6703 21.3507 16.6887 21.3507C20.7546 21.3507 23.6969 18.1182 23.8207 17.98C23.9452 17.8409 24.0093 17.658 23.9989 17.4717ZM16.9747 19.9379L15.8021 18.4497C17.5871 18.0825 19.1892 17.4576 20.4398 16.6186C20.7623 16.4023 20.8483 15.9654 20.632 15.643C20.4157 15.3205 19.9787 15.2343 19.6563 15.4508C17.7899 16.7031 14.9992 17.4212 12 17.4212C9.00095 17.4212 6.2103 16.7031 4.34369 15.4509C4.02114 15.2346 3.58441 15.3207 3.36808 15.6432C3.15175 15.9657 3.23781 16.4025 3.56031 16.6188C4.81094 17.4577 6.41303 18.0825 8.19798 18.4497L7.02541 19.9378C4.2723 19.8101 2.08136 17.8848 1.42713 17.2459C1.53634 15.8835 2.10306 10.2644 4.21445 6.81998C6.28778 5.51123 7.85242 5.14725 8.55123 5.04609L9.21836 6.32442C7.64988 6.55345 6.18039 6.97434 4.92869 7.56365C4.57736 7.72903 4.42666 8.14795 4.59203 8.49933C4.75745 8.85061 5.17638 9.00126 5.52766 8.83598C7.31575 7.99415 9.61436 7.53056 12 7.53056C14.3858 7.53056 16.6845 7.99425 18.4725 8.83617C18.5693 8.88173 18.6711 8.90334 18.7715 8.90334C19.0353 8.90334 19.2883 8.75404 19.4081 8.49956C19.5735 8.14828 19.4228 7.72931 19.0715 7.56389C17.8197 6.97453 16.3502 6.55354 14.7816 6.32451L15.4487 5.04618C16.1475 5.14734 17.7122 5.51132 19.7856 6.82007C21.8946 10.2609 22.4632 15.8858 22.5729 17.2471C21.9203 17.8874 19.7391 19.8111 16.9747 19.9379Z" fill="currentColor"/>
        </g>
        <defs>
            <clipPath id="clip0_55_3237">
                <rect width="24" height="24" fill="white" transform="translate(0 0.475586)"/>
            </clipPath>
        </defs>
    </SvgIcon>
);

const BrowserIcon = ({ className = "" }: { className?: string }) => (
    <SvgIcon viewBox="0 0 24 25" className={className}>
        <path d="M12.6937 0.475586L14.477 0.731394C19.2598 1.73151 23.0654 5.71811 23.8376 10.5461L23.9917 11.7743C23.9717 12.2397 24.0179 12.7174 23.9917 13.1812C23.4183 23.1685 11.3558 28.1445 3.90185 21.3409C-3.92818 14.1952 0.788337 1.07812 11.2864 0.475586H12.6921H12.6937ZM11.2864 2.0243C9.58324 2.64841 8.70005 4.52999 8.05115 6.10337H11.2864V2.0243ZM15.929 6.10337C15.2801 4.52999 14.3969 2.64687 12.6937 2.0243V6.10337H15.929ZM3.55197 6.10337H6.5992C6.82732 5.25119 7.22653 4.46219 7.62265 3.68089L8.35633 2.539C6.45432 3.22167 4.75113 4.47914 3.55197 6.10337ZM20.4297 6.10337C19.229 4.48068 17.5273 3.22167 15.6253 2.539L16.359 3.68089C16.7551 4.46219 17.1528 5.25273 17.3824 6.10337H20.4297ZM6.17687 7.51031H2.61329C1.97209 8.84329 1.47578 10.2811 1.44187 11.7774H5.61428C5.68981 10.3412 5.84703 8.90955 6.17687 7.51031ZM11.2864 7.51031H7.63036C7.25427 8.9003 7.10322 10.3427 7.02153 11.7774H11.288V7.51031H11.2864ZM16.3497 7.51031H12.6937V11.7774H16.9601C16.8769 10.3442 16.7274 8.90184 16.3513 7.51031H16.3497ZM21.3668 7.51031H17.8032C18.1331 8.90801 18.2903 10.3412 18.3658 11.7774H22.5382C22.4982 10.2826 22.008 8.84329 21.3668 7.51031ZM5.61428 13.1828H1.44187C1.48194 14.6776 1.97209 16.1169 2.61329 17.4498H6.17687C5.84703 16.0521 5.68981 14.619 5.61428 13.1828ZM11.2864 13.1828H7.01999C7.10322 14.6159 7.25273 16.0583 7.62882 17.4498H11.2849V13.1828H11.2864ZM16.9601 13.1828H12.6937V17.4498H16.3497C16.7258 16.0583 16.8738 14.6159 16.9586 13.1828H16.9601ZM22.5382 13.1828H18.3658C18.2903 14.619 18.1331 16.0506 17.8032 17.4498H21.3668C22.008 16.1184 22.4997 14.6776 22.5382 13.1828ZM6.5992 18.8568H3.55197C4.75267 20.4795 6.45432 21.7385 8.35633 22.4212L7.62265 21.2793C7.22653 20.498 6.82886 19.7074 6.5992 18.8568ZM11.2864 18.8568H8.05115C8.70005 20.4302 9.58324 22.3133 11.2864 22.9359V18.8568ZM15.929 18.8568H12.6937V22.9359C14.4107 22.3256 15.2646 20.424 15.929 18.8568ZM20.4297 18.8568H17.3824C17.1143 19.8014 16.678 20.6891 16.2018 21.5443L15.6253 22.4212C17.5304 21.74 19.2228 20.4733 20.4297 18.8568Z" fill="currentColor"/>
    </SvgIcon>
);

const Footer: React.FC = () => {
    const theme = useTheme();

    return (
        <footer className="px-4 !mt-8" style={{backgroundImage: `linear-gradient(to bottom, ${theme.palette.gradient.background[20]}, ${theme.palette.gradient.background[10]})`}}>
            <div className="container mx-auto">
                <div className="w-full flex items-center justify-between py-6 flex-col-reverse sm:flex-row">
                    <div className="flex items-ceter gap-4 md:gap-10 flex-col sm:flex-row">
                        <Link 
                            href="/docs/whitepaper"
                            underline="hover"
                            sx={{
                                color: theme.palette.text.primary,
                            }}
                            className="!flex items-center cursor-pointer !gap-1 justify-center sm:justify-start md:!gap-2"
                        >
                            <LinkIcon className="text-xl md:text-2xl" />
                            <Typography>
                                Whitepaper
                            </Typography>
                        </Link>
                        <Link 
                            href="/docs/documentation"
                            underline="hover"
                            sx={{
                                color: theme.palette.text.primary,
                            }}
                            className="!flex items-center cursor-pointer !gap-1 justify-center sm:justify-start md:!gap-2"
                        >
                            <LinkIcon className="text-xl md:text-2xl" />
                            <Typography>
                                Documentation
                            </Typography>
                        </Link>
                        <Link 
                            href="#buy-angels"
                            onClick={(e) => {
                                e.preventDefault();
                                const element = document.getElementById('buy-angels');
                                if (element) {
                                    element.scrollIntoView({ behavior: 'smooth' });
                                }
                            }}
                            underline="hover"
                            sx={{
                                color: theme.palette.text.primary,
                            }}
                            className="!flex items-center cursor-pointer !gap-1 justify-center sm:justify-start md:!gap-2"
                        >
                            <LinkIcon className="text-xl md:text-2xl" />
                            <Typography>
                                Token Sale
                            </Typography>
                        </Link>
                    </div>
                    <div className="!space-x-4 !mt-4 !mb-8">
                        <IconButton
                            aria-label="x"
                            href="https://x.com/angelcoinada"
                            target="_blank" rel="noopener noreferrer"
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
                            <XIcon className="text-xl md:text-2xl text-amber-800" />
                        </IconButton>
                        <IconButton
                            aria-label="discord"
                            href="https://discord.com/invite/angelfinance"
                            target="_blank" rel="noopener noreferrer"
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
                            <DiscordIcon className="text-xl md:text-2xl text-amber-800" />
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
                            href="/docs/terms"
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
                        href="/docs/policy"
                            underline="hover"
                            sx={{
                                color: alpha(theme.palette.text.primary, 0.4),
                                fontWeight: 400
                            }}
                            className="!text-sm"
                        >
                            Privacy Policy
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;