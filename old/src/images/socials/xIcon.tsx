import { SvgIcon, SvgIconProps, useTheme } from "@mui/material";
import React from "react";

const XIcon = (props: SvgIconProps) => {
    const { sx = {}, ...otherProps } = props;
    const theme = useTheme();

    return (
        <SvgIcon
            {...otherProps}
            sx={{
                color: theme.palette.secondary.main,
                fontSize: "16px",
                ...sx
            }}
        >
            <svg width="15" height="14" viewBox="0 0 15 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.81524 0.0312004L8.14701 5.03971L12.3727 0.217647L13.6995 0.033754L8.85576 5.9464L14.1031 13.8653H10.166L6.5239 8.65371C6.28637 8.59752 6.16506 8.82355 6.0182 8.94615C4.88675 9.90009 2.94694 13.0863 1.89722 13.675C1.50262 13.8972 1.21401 13.9061 0.777266 13.864L5.82664 7.7534L0.574219 0.0324767H4.81396L4.81524 0.0312004ZM12.4864 13.0607L4.31847 1.22522C3.80638 0.5816 2.91757 0.889364 2.18838 0.835729L10.5695 12.8602L12.4851 13.0607H12.4864Z" />
            </svg>
        </SvgIcon>
    )
}

export default XIcon;