import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="relative z-10 border-t border-white/5 bg-midnight/80 backdrop-blur-sm mt-20">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="flex flex-col md:flex-row justify-between gap-8">
                    <div className="space-y-4 max-w-sm">
                        <div className="flex items-center space-x-2">
                            <span className="text-2xl">♞</span>
                            <span className="font-display font-bold text-xl text-white">
                                NEON<span className="text-neon-green">CHESS</span>
                            </span>
                        </div>
                        <p className="text-gray-400 text-sm">
                            The future of chess is here. Play, learn, and compete in an immersive neon environment.
                        </p>
                    </div>

                    <div className="md:text-right">
                        <h3 className="font-bold text-white mb-4">Community</h3>
                        <div className="flex space-x-4 md:justify-end">
                            {/* Social Icons placeholders */}
                            <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center hover:bg-neon-green/20 cursor-pointer transition-colors">🐦</div>
                            <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center hover:bg-neon-blue/20 cursor-pointer transition-colors">🎮</div>
                            <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center hover:bg-pink-500/20 cursor-pointer transition-colors">📸</div>
                        </div>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-white/5 text-center text-xs text-gray-500">
                    © {new Date().getFullYear()} Neon Chess. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
