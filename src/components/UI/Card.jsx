import React from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

const Card = ({ children, className, hoverEffect = true, ...props }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={hoverEffect ? { y: -5, boxShadow: "0 10px 40px -10px rgba(64,255,143,0.1)" } : {}}
            className={clsx(
                "glass-panel p-6 relative overflow-hidden group",
                hoverEffect && "hover:border-neon-green/30 transition-colors duration-300",
                className
            )}
            {...props}
        >
            {/* Decorative gradient blob */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-neon-green/5 rounded-full blur-3xl group-hover:bg-neon-green/10 transition-colors duration-500" />

            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    );
};

export default Card;
