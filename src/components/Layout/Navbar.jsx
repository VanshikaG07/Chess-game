import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Bell, User, Trophy, BookOpen, Puzzle, Users, Activity } from 'lucide-react';
import clsx from 'clsx';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications, setNotifications] = useState([
        { id: 1, text: "Daily Puzzle is ready! Solve it to keep your streak.", time: "2 min ago", read: false },
        { id: 2, text: "New tournament 'Neon Blitz' starts in 1 hour.", time: "1 hour ago", read: false },
        { id: 3, text: "Hikaru N. accepted your friend request.", time: "3 hours ago", read: true },
    ]);
    const location = useLocation();

    const navLinks = [
        { name: 'Play', path: '/play', icon: Activity },
        { name: 'Learn', path: '/learn', icon: BookOpen },
        { name: 'Puzzles', path: '/puzzles', icon: Puzzle },
        { name: 'Tournaments', path: '/tournaments', icon: Trophy },
        { name: 'Rankings', path: '/rankings', icon: Activity },
        { name: 'Community', path: '/community', icon: Users },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="fixed top-0 w-full z-50 px-4 py-4 md:px-8 pointer-events-none">
            {/* Main Navbar Container */}
            <div className="glass-panel mx-auto max-w-7xl flex items-center justify-between px-6 py-3 pointer-events-auto bg-midnight/80 backdrop-blur-2xl border-white/5">
                {/* Logo */}
                <Link to="/" className="flex items-center space-x-3 group outline-none">
                    <div className="relative w-10 h-10 flex items-center justify-center bg-gradient-to-br from-neon-green/20 to-neon-blue/20 rounded-xl border border-white/10 group-hover:border-neon-green/50 transition-all duration-500 shadow-[0_0_15px_rgba(0,255,163,0.1)] group-hover:shadow-[0_0_25px_rgba(0,255,163,0.3)]">
                        <span className="text-2xl filter drop-shadow-[0_0_5px_rgba(0,255,163,0.8)]">♞</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-display font-bold text-xl tracking-wide text-white leading-none">
                            NEON<span className="text-neon-green">CHESS</span>
                        </span>
                        <span className="text-[10px] text-gray-400 font-mono tracking-widest uppercase">Grandmaster Edition</span>
                    </div>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-1 bg-white/5 p-1 rounded-xl border border-white/5">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={clsx(
                                "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center space-x-2 relative overflow-hidden group outline-none",
                                isActive(link.path)
                                    ? "text-midnight font-bold bg-gradient-to-r from-neon-green to-neon-blue shadow-lg shadow-neon-green/20"
                                    : "text-gray-400 hover:text-white"
                            )}
                        >
                            <link.icon className={clsx("w-4 h-4 transition-transform group-hover:scale-110", isActive(link.path) ? "text-midnight" : "text-gray-500 group-hover:text-neon-green")} />
                            <span>{link.name}</span>
                            {!isActive(link.path) && <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />}
                        </Link>
                    ))}
                </div>

                {/* Right Actions */}
                <div className="hidden md:flex items-center space-x-6">
                    {/* Notifications */}
                    <div className="relative">
                        <button
                            onClick={() => setShowNotifications(!showNotifications)}
                            className="text-gray-400 hover:text-neon-blue transition-colors relative group outline-none"
                        >
                            <div className={`p-2 rounded-lg transition-colors ${showNotifications ? 'bg-neon-blue/10 text-neon-blue' : 'group-hover:bg-neon-blue/10'}`}>
                                <Bell className="w-5 h-5" />
                            </div>
                            {notifications.length > 0 && <span className="absolute top-1 right-1 w-2 h-2 bg-neon-pink rounded-full shadow-[0_0_10px_#FF0099] animate-pulse"></span>}
                        </button>

                        <AnimatePresence>
                            {showNotifications && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    className="absolute right-0 top-14 w-80 glass-panel border border-white/10 shadow-xl overflow-hidden z-50 bg-[#050511]/95"
                                >
                                    <div className="p-4 border-b border-white/5 flex justify-between items-center bg-white/5">
                                        <h3 className="font-bold text-white text-sm">Notifications</h3>
                                        <button onClick={() => setNotifications([])} className="text-[10px] text-gray-400 hover:text-neon-pink transition-colors">Clear All</button>
                                    </div>
                                    <div className="max-h-64 overflow-y-auto">
                                        {notifications.length === 0 ? (
                                            <div className="p-8 text-center text-gray-500 text-xs">
                                                No new notifications
                                            </div>
                                        ) : (
                                            notifications.map((notif) => (
                                                <div key={notif.id} className="p-4 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0 flex gap-3">
                                                    <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${notif.read ? 'bg-gray-600' : 'bg-neon-blue'}`}></div>
                                                    <div>
                                                        <p className="text-sm text-gray-200 leading-snug">{notif.text}</p>
                                                        <p className="text-[10px] text-gray-500 mt-1 font-mono">{notif.time}</p>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* User Profile */}
                    <div className="flex items-center space-x-3 pl-6 border-l border-white/10">
                        <div className="text-right hidden lg:block">
                            <p className="text-xs text-neon-green font-mono mb-0.5">Grandmaster</p>
                            <p className="text-sm font-bold text-white leading-none">Hikaru N.</p>
                        </div>
                        <div className="relative cursor-pointer group">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-green to-neon-blue p-[3px] shadow-[0_4px_0_rgba(0,0,0,0.5)] group-hover:shadow-[0_6px_0_rgba(0,0,0,0.5)] group-hover:-translate-y-0.5 transition-all border-2 border-black">
                                <div className="w-full h-full rounded-full bg-midnight flex items-center justify-center overflow-hidden border-2 border-white/20">
                                    <User className="text-white w-5 h-5" />
                                </div>
                            </div>
                            <div className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded bg-midnight border border-yellow-500 text-yellow-500 text-[10px] font-bold font-mono shadow-lg">
                                2850
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Toggle */}
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2 rounded-lg hover:bg-white/10 outline-none">
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        className="absolute top-24 left-4 right-4 glass-panel p-4 md:hidden flex flex-col space-y-2 pointer-events-auto bg-midnight/95 border-neon-green/20 shadow-2xl shadow-black/50"
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={clsx(
                                    "flex items-center space-x-3 px-4 py-4 rounded-xl transition-all",
                                    isActive(link.path)
                                        ? "bg-gradient-to-r from-neon-green/20 to-neon-blue/20 border border-neon-green/30 text-white"
                                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                                )}
                            >
                                <link.icon className={clsx("w-5 h-5", isActive(link.path) ? "text-neon-green" : "")} />
                                <span className="font-medium">{link.name}</span>
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
