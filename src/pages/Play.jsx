import React, { useState } from 'react';
import ChessGame from '../components/Game/ChessGame';
import { Settings, Zap, Clock, Shield, Cpu } from 'lucide-react';
import clsx from 'clsx';
import Card from '../components/UI/Card';

const Play = () => {
    const [difficulty, setDifficulty] = useState('Easy');
    const [timeControl, setTimeControl] = useState('10+0');

    const difficulties = [
        { label: 'Easy', icon: Shield, color: 'text-green-400' },
        { label: 'Medium', icon: Shield, color: 'text-yellow-400' },
        { label: 'Hard', icon: Shield, color: 'text-orange-500' },
        { label: 'Grandmaster', icon: Cpu, color: 'text-neon-purple' }
    ];

    const timeControls = [
        { label: 'Bullet', sub: '1+0', icon: Zap },
        { label: 'Blitz', sub: '3+2', icon: Zap },
        { label: 'Rapid', sub: '10+0', icon: Clock },
        { label: 'Classical', sub: '30+0', icon: Clock },
    ];

    return (
        <div className="pb-12 pt-28 container-padding min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-8 mb-8 items-end">
                    <div>
                        <h1 className="text-5xl font-bold text-white mb-2">Play Chess</h1>
                        <p className="text-gray-400">Challenge yourself against our advanced neural engines.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Main Game Area */}
                    <div className="lg:col-span-8 xl:col-span-9 flex justify-center order-2 lg:order-1">
                        <ChessGame difficulty={difficulty} />
                    </div>

                    {/* Settings Sidebar */}
                    <div className="lg:col-span-4 xl:col-span-3 space-y-6 order-1 lg:order-2">
                        <div className="flex items-center gap-2 mb-2 text-neon-green">
                            <Settings className="w-5 h-5" />
                            <h2 className="text-lg font-bold uppercase tracking-wider">Game Setup</h2>
                        </div>

                        <Card className="border-neon-green/20">
                            <label className="block text-xs font-bold text-gray-400 mb-4 uppercase tracking-widest">Difficulty</label>
                            <div className="space-y-2">
                                {difficulties.map((level) => (
                                    <button
                                        key={level.label}
                                        onClick={() => setDifficulty(level.label)}
                                        className={clsx(
                                            "w-full text-left px-4 py-3 rounded-xl transition-all border flex items-center justify-between group",
                                            difficulty === level.label
                                                ? "bg-neon-green/10 border-neon-green text-white shadow-[0_0_15px_rgba(0,255,163,0.1)]"
                                                : "bg-white/5 border-transparent hover:bg-white/10 text-gray-400 hover:text-white"
                                        )}
                                    >
                                        <div className="flex items-center gap-3">
                                            <level.icon className={clsx("w-4 h-4 transition-colors", difficulty === level.label ? level.color : "text-gray-600 group-hover:text-gray-400")} />
                                            <span className="font-medium">{level.label}</span>
                                        </div>
                                        {difficulty === level.label && <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />}
                                    </button>
                                ))}
                            </div>
                        </Card>

                        <Card>
                            <label className="block text-xs font-bold text-gray-400 mb-4 uppercase tracking-widest">Time Control</label>
                            <div className="grid grid-cols-2 gap-3">
                                {timeControls.map((tc) => (
                                    <button
                                        key={tc.label}
                                        onClick={() => setTimeControl(tc.sub)}
                                        className={clsx(
                                            "flex flex-col items-center justify-center p-4 rounded-xl transition-all border",
                                            timeControl === tc.sub
                                                ? "bg-neon-blue/10 border-neon-blue text-white shadow-[0_0_15px_rgba(0,229,255,0.1)]"
                                                : "bg-white/5 border-transparent hover:bg-white/10 text-gray-400 hover:text-white"
                                        )}
                                    >
                                        <tc.icon className={clsx("w-5 h-5 mb-2 transition-opacity", timeControl === tc.sub ? "text-neon-blue opacity-100" : "opacity-30")} />
                                        <span className="font-bold text-sm block">{tc.label}</span>
                                        <span className="text-xs opacity-50 font-mono mt-1">{tc.sub}</span>
                                    </button>
                                ))}
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Play;
