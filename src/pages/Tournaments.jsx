import React from 'react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import { Trophy, Clock, Users, Calendar } from 'lucide-react';

const Tournaments = () => {
    const tournaments = [
        { id: 1, name: "Neon Blitz Championship", time: "Starts in 2h 30m", players: "128/200", prize: "$5,000", type: "Blitz" },
        { id: 2, name: "Daily Rapid Arena", time: "Live Now", players: "45 Playing", prize: "500 Credits", type: "Rapid" },
        { id: 3, name: "Grandmaster Tuesday", time: "Tomorrow, 18:00", players: "Waitlist", prize: "$2,000", type: "Bullet" },
    ];

    return (
        <div className="max-w-5xl mx-auto pb-12">
            <h1 className="text-4xl font-bold mb-8">Tournaments</h1>

            <div className="grid gap-6">
                {tournaments.map((t) => (
                    <Card key={t.id} className="flex flex-col md:flex-row items-center justify-between gap-6 hover:bg-white/5 transition-colors">
                        <div className="flex items-center gap-6 flex-1">
                            <div className="w-16 h-16 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 text-3xl">
                                🏆
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white">{t.name}</h3>
                                <div className="flex items-center gap-4 text-sm text-gray-400 mt-1">
                                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {t.time}</span>
                                    <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {t.players}</span>
                                    <span className="px-2 py-0.5 rounded bg-white/10 text-white font-mono text-xs border border-white/10">{t.type}</span>
                                </div>
                            </div>
                        </div>

                        <div className="text-right flex flex-col items-end gap-2 min-w-[150px]">
                            <span className="text-yellow-500 font-bold text-lg">{t.prize}</span>
                            <Button variant={t.time === "Live Now" ? "primary" : "secondary"} className="w-full">
                                {t.time === "Live Now" ? "Join Arena" : "Register"}
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Tournaments;
