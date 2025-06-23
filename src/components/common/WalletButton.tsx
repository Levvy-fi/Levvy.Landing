import { Button, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";

interface WalletButtonProps {
    onClick?: () => void;
    startIcon?: React.ReactNode;
    size?: 'small' | 'medium' | 'large';
}

// Clean wallet button with golden gradient and animation
const WalletButton: React.FC<WalletButtonProps> = ({ onClick, startIcon, size = 'medium' }) => {
    const theme = useTheme();
    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [flowPosition, setFlowPosition] = useState(0);
    const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward

    // Create flowing effect with back-and-forth animation
    useEffect(() => {
        if (!isHovered) {
            const interval = setInterval(() => {
                setFlowPosition(prev => {
                    const newPosition = prev + (direction * 2); // Move 2% each step
                    
                    // Reverse direction at boundaries
                    if (newPosition >= 100) {
                        setDirection(-1);
                        return 100;
                    } else if (newPosition <= 0) {
                        setDirection(1);
                        return 0;
                    }
                    
                    return newPosition;
                });
            }, 50); // Update every 50ms for smoother animation
            
            return () => clearInterval(interval);
        }
    }, [isHovered, direction]);

    // Handle click animation - fast shine from right to left
    const handleClick = () => {
        setIsClicked(true);
        setTimeout(() => setIsClicked(false), 400); // Reset after 400ms
        if (onClick) onClick();
    };

    return (
        <Button
            variant="contained"
            size={size}
            onClick={handleClick}
            startIcon={startIcon}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            disableRipple
            sx={{
                // Golden gradient background
                background: `linear-gradient(
                    45deg,
                    ${theme.palette.gradient.button[30]} 0%,
                    ${theme.palette.gradient.button[20]} 25%,
                    ${theme.palette.gradient.button[10]} 50%,
                    ${theme.palette.gradient.button[20]} 75%,
                    ${theme.palette.gradient.button[30]} 100%
                )`,
                backgroundSize: "300% 100%",
                borderRadius: '12px',
                textTransform: 'Capitalize',
                zIndex: 1,
                
                // Dynamic background position based on state
                backgroundPosition: isClicked 
                    ? "0% 50%" // Fast shine from right to left
                    : isHovered 
                        ? "50% 50%" 
                        : `${flowPosition}% 50%`,
                
                // Smooth transitions for all properties
                transition: isClicked
                    ? "background-position 0.4s ease-out" // Fast shine animation
                    : isHovered 
                        ? "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)" 
                        : "background-position 0.1s linear, transform 0.3s ease, box-shadow 0.3s ease",
                
                // Hover state effects
                transform: isHovered ? "translateY(-1px)" : "translateY(0)",
                boxShadow: isHovered 
                    ? `0 8px 25px ${theme.palette.primary.main}40`
                    : "none",
                
                // Active state
                "&:active": {
                    transform: "translateY(0px)",
                    backgroundSize: "200% 100%",
                }
            }}
        >
            <Typography
                sx={{
                    color: theme.palette.secondary.dark,
                    fontWeight: 500
                }}
                className="!text-sm sm:!text-base"
            >
                Connect Wallet
            </Typography>
        </Button>
    );
};

export default WalletButton;