import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { Loader2 } from 'lucide-react';

const Button = ({
    children,
    variant = 'primary',
    className,
    isLoading,
    icon: Icon,
    ...props
}) => {
    const baseStyles = "relative inline-flex items-center justify-center px-6 py-3 font-bold rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
        primary: "bg-gradient-to-r from-neon-green to-[#20BF6B] text-midnight shadow-[0_0_20px_rgba(64,255,143,0.3)] hover:shadow-[0_0_30px_rgba(64,255,143,0.5)]",
        secondary: "bg-transparent border border-neon-green text-neon-green shadow-[0_0_10px_rgba(64,255,143,0.1)] hover:bg-neon-green/10",
        glow: "bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/30 backdrop-blur-md",
    };

    return (
        <motion.button
            whileTap={{ scale: 0.95 }}
            className={clsx(baseStyles, variants[variant], className)}
            {...props}
        >
            {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
            ) : Icon && (
                <Icon className="w-5 h-5 mr-2" />
            )}
            {children}
        </motion.button>
    );
};

export default Button;
