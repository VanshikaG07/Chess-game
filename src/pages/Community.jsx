import React from 'react';
import Card from '../components/UI/Card';
import { MessageSquare, Users, TrendingUp } from 'lucide-react';

const Community = () => {
    const topics = [
        { id: 1, title: "Best openings for beginners?", author: "ChessNoob99", replies: 45, views: "1.2k" },
        { id: 2, title: "Thoughts on the latest WCC match", author: "GrandmasterFlash", replies: 128, views: "5.4k" },
        { id: 3, title: "Looking for a practice partner (1500 ELO)", author: "TacticsWizard", replies: 12, views: "340" },
    ];

    return (
        <div className="max-w-6xl mx-auto pb-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-4xl font-bold">Community Forum</h1>
                </div>

                <div className="space-y-4">
                    {topics.map((t) => (
                        <Card key={t.id} className="flex items-center justify-between cursor-pointer hover:border-neon-blue/30">
                            <div>
                                <h3 className="font-bold text-lg mb-1">{t.title}</h3>
                                <p className="text-xs text-gray-500">Posted by <span className="text-neon-blue">{t.author}</span></p>
                            </div>
                            <div className="flex items-center gap-6 text-sm text-gray-400">
                                <span className="flex items-center gap-1"><MessageSquare className="w-4 h-4" /> {t.replies}</span>
                                <span className="flex items-center gap-1"><TrendingUp className="w-4 h-4" /> {t.views}</span>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>

            <div className="space-y-6">
                <Card>
                    <h3 className="font-bold text-xl mb-4 flex items-center gap-2"><Users className="w-5 h-5 text-neon-green" /> Active Clubs</h3>
                    <ul className="space-y-3">
                        {["Neon Knights", "Endgame Experts", "Blitz Berserkers"].map((club) => (
                            <li key={club} className="flex items-center justify-between p-2 rounded hover:bg-white/5 cursor-pointer transition-colors">
                                <span className="text-gray-300">{club}</span>
                                <span className="text-xs bg-white/10 px-2 py-0.5 rounded text-gray-400">Join</span>
                            </li>
                        ))}
                    </ul>
                </Card>
            </div>
        </div>
    );
};

export default Community;
