import React from 'react';
import { Play, BookOpen, ChevronRight, Trophy, Target, Star, Users, Zap, Hexagon } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="space-y-32 pb-20 overflow-hidden">
            {/* Hero Section */}
            <section className="relative min-h-screen flex flex-col items-center justify-center text-center space-y-12 px-4">
                {/* Background Elements */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-green/10 rounded-full blur-[150px] pointer-events-none animate-pulse-slow" />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-blue/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-neon-purple/10 rounded-full blur-[120px] pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative z-10 max-w-5xl mx-auto"
                >
                    <div className="mb-6 flex justify-center">
                        <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-2 text-sm font-medium text-neon-green animate-float">
                            <Zap className="w-4 h-4 fill-neon-green" />
                            <span>The Future of Chess is Here</span>
                        </div>
                    </div>

                    <h1 className="text-7xl md:text-9xl font-display font-bold tracking-tighter leading-none mb-8">
                        <span className="text-white block hover:scale-105 transition-transform duration-500 cursor-default">Think Ahead.</span>
                        <span className="neon-text-gradient block mt-2 hover:scale-105 transition-transform duration-500 cursor-default">
                            Rule the Board.
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
                        Experience individual brilliance in every move. Play, learn, and compete in the most immersive, high-performance chess environment ever created.
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <Link to="/play" className="w-full md:w-auto">
                            <Button icon={Play} className="w-full md:w-auto text-lg px-10 py-5 bg-gradient-to-r from-neon-green to-neon-blue hover:shadow-[0_0_40px_rgba(0,255,163,0.4)] border-none text-midnight font-black tracking-wide">
                                PLAY NOW
                            </Button>
                        </Link>
                        <Link to="/learn" className="w-full md:w-auto">
                            <Button variant="secondary" icon={BookOpen} className="w-full md:w-auto text-lg px-10 py-5 border-white/20 hover:bg-white/5 hover:border-white/40 text-white">
                                START LEARNING
                            </Button>
                        </Link>
                    </div>
                </motion.div>

                {/* Floating Abstract Pieces */}
                <div className="absolute top-1/2 -right-20 md:right-20 w-32 h-32 md:w-48 md:h-48 border border-white/10 rounded-xl rotate-12 animate-float blur-sm opacity-50" />
                <div className="absolute bottom-20 -left-10 md:left-20 w-24 h-24 md:w-32 md:h-32 bg-neon-green/5 rounded-full blur-xl animate-bounce" />
            </section>

            {/* Features Grid */}
            <section className="container-padding max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Daily Puzzle - Large Card */}
                    <Card className="col-span-1 md:col-span-8 group overflow-hidden">
                        <div className="absolute top-0 right-0 p-32 bg-neon-green/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-neon-green/10 transition-colors" />
                        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center h-full">
                            <div className="flex-1 space-y-4">
                                <div className="flex items-center space-x-2 text-neon-green">
                                    <Target className="w-5 h-5" />
                                    <span className="text-sm font-bold uppercase tracking-widest">Daily Challenge</span>
                                </div>
                                <h3 className="text-4xl font-bold text-white leading-tight">Can you find the <span className="text-neon-green">Mate in 3?</span></h3>
                                <p className="text-gray-400 text-lg">Solve today's featured puzzle from the legendary 1995 Kasparov vs. Anand match. Prove your tactical supremacy.</p>
                                <Link to="/puzzles" className="inline-block mt-4">
                                    <Button variant="glow" icon={Play} className="mt-4 border-neon-green/30 text-neon-green hover:bg-neon-green/10">Solve Puzzle</Button>
                                </Link>
                            </div>
                            {/* Visual Board Representation */}
                            <div className="w-full md:w-80 aspect-square glass-panel p-2 rotate-3 group-hover:rotate-0 transition-transform duration-500 shadow-2xl shadow-black/50">
                                <div className="w-full h-full bg-midnight/50 rounded-lg grid grid-cols-8 grid-rows-8 border border-white/5">
                                    {[...Array(64)].map((_, i) => (
                                        <div key={i} className={`${((Math.floor(i / 8) + i) % 2 === 0) ? 'bg-white/5' : 'bg-transparent'}`} />
                                    ))}
                                    <div className="absolute top-[25%] left-[37.5%] text-5xl drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">♛</div>
                                    <div className="absolute top-[12.5%] left-[62.5%] text-5xl text-neon-green drop-shadow-[0_0_15px_rgba(0,255,163,0.8)]">♞</div>
                                    <div className="absolute top-[50%] left-[50%] text-5xl text-white/50">♚</div>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Leaderboard Teaser */}
                    <Card className="col-span-1 md:col-span-4 flex flex-col justify-between min-h-[400px]">
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold flex items-center gap-2 text-white">
                                    <Trophy className="text-yellow-500 w-5 h-5" /> Top Grandmasters
                                </h3>
                                <Link to="/rankings" className="text-xs text-neon-blue font-bold tracking-wider hover:text-white transition-colors uppercase">View All</Link>
                            </div>
                            <div className="space-y-3">
                                {[
                                    { name: "Magnus C.", rating: 2882, rank: 1, color: "text-yellow-500" },
                                    { name: "Hikaru N.", rating: 2820, rank: 2, color: "text-gray-300" },
                                    { name: "Ding L.", rating: 2790, rank: 3, color: "text-orange-700" },
                                    { name: "Alireza F.", rating: 2780, rank: 4, color: "text-gray-500" }
                                ].map((p, i) => (
                                    <div key={p.rank} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer group">
                                        <div className="flex items-center gap-4">
                                            <span className={`text-sm font-black w-6 h-6 flex items-center justify-center rounded bg-midnight border border-white/10 ${p.color}`}>#{p.rank}</span>
                                            <span className="font-bold text-gray-200 group-hover:text-white transition-colors">{p.name}</span>
                                        </div>
                                        <span className="text-sm font-mono text-neon-green font-bold">{p.rating}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="mt-6 pt-6 border-t border-white/10 text-center">
                            <p className="text-gray-400 text-sm mb-3">Think you can beat them?</p>
                            <Link to="/play">
                                <Button className="w-full text-sm py-2">Challenge a GM</Button>
                            </Link>
                        </div>
                    </Card>

                    {/* Featured Tournament */}
                    <Card className="col-span-1 md:col-span-6 lg:col-span-4 bg-gradient-to-br from-midnight via-midnight to-neon-purple/20 border-neon-purple/30">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <div className="flex items-center gap-2 text-neon-pink mb-2">
                                    <Hexagon className="w-4 h-4 fill-neon-pink" />
                                    <span className="text-xs font-bold uppercase tracking-wider">Live Tournament</span>
                                </div>
                                <h3 className="text-2xl font-bold text-white">Neon Blitz Championship</h3>
                            </div>
                            <div className="px-3 py-1 rounded bg-yellow-500/10 border border-yellow-500/50 text-yellow-500 font-bold font-mono text-sm">
                                $5,000
                            </div>
                        </div>

                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Format</span>
                                <span className="text-white font-bold">3+2 Blitz</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Players</span>
                                <span className="text-white font-bold">1,240 / 2,000</span>
                            </div>
                            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                                <div className="w-[62%] h-full bg-neon-pink shadow-[0_0_10px_#FF0099]" />
                            </div>
                        </div>

                        <Button className="w-full bg-gradient-to-r from-neon-pink to-purple-600 hover:shadow-[0_0_20px_rgba(255,0,153,0.4)] text-white border-none">Join Tournament</Button>
                    </Card>

                    {/* Learn Progress */}
                    <Card className="col-span-1 md:col-span-6 lg:col-span-4">
                        <div className="mb-6 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-neon-blue/20 flex items-center justify-center text-neon-blue">
                                <BookOpen className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold">Academy</h3>
                                <p className="text-xs text-gray-400">Continue where you left off</p>
                            </div>
                        </div>

                        <div className="p-4 rounded-xl bg-white/5 border border-white/5 mb-4 group cursor-pointer hover:border-neon-blue/30 transition-colors">
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-bold text-white group-hover:text-neon-blue transition-colors">The Sicilian Defense</span>
                                <span className="text-xs text-gray-500">Lesson 4/12</span>
                            </div>
                            <div className="w-full h-1.5 bg-midnight rounded-full overflow-hidden">
                                <div className="h-full w-1/3 bg-neon-blue" />
                            </div>
                        </div>

                        <Link to="/learn">
                            <Button variant="secondary" className="w-full text-sm">Resume Learning</Button>
                        </Link>
                    </Card>

                    {/* Community / Social */}
                    <Card className="col-span-1 lg:col-span-4 flex flex-col justify-center items-center text-center">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center mb-4 relative">
                            <Users className="w-8 h-8 text-gray-300" />
                            <div className="absolute top-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-midnight" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">24,392 Players Online</h3>
                        <p className="text-sm text-gray-400 mb-6">Join the fastest growing chess community.</p>
                        <div className="flex -space-x-3 mb-6">
                            {[1, 2, 3, 4, 5].map(i => (
                                <div key={i} className="w-8 h-8 rounded-full bg-gray-600 border-2 border-midnight" />
                            ))}
                            <div className="w-8 h-8 rounded-full bg-gray-800 border-2 border-midnight flex items-center justify-center text-[10px] text-white font-bold">+2k</div>
                        </div>
                        <Button variant="secondary" className="w-full text-sm">Find Opponent</Button>
                    </Card>
                </div>
            </section>
        </div>
    );
};

export default Home;
