import React from 'react';
import Card from '../components/UI/Card';
import { Search } from 'lucide-react';

const Rankings = () => {
    const players = Array.from({ length: 10 }).map((_, i) => ({
        rank: i + 1,
        name: ["Magnus Carlsen", "Hikaru Nakamura", "Ding Liren", "Alireza Firouzja", "Fabiano Caruana", "Ian Nepomniachtchi", "Wesley So", "Anish Giri", "Viswanathan Anand", "Gukesh D"][i],
        rating: 2882 - (i * 12),
        country: ["NO", "US", "CN", "FR", "US", "RU", "US", "NL", "IN", "IN"][i]
    }));

    // Helper to generate consistent colors based on name
    const getAvatarColor = (name) => {
        const colors = [
            'from-neon-green to-emerald-600',
            'from-neon-blue to-blue-600',
            'from-neon-purple to-purple-600',
            'from-neon-pink to-pink-600',
            'from-yellow-400 to-orange-500',
            'from-cyan-400 to-teal-500'
        ];
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
        return colors[Math.abs(hash) % colors.length];
    };

    const getInitials = (name) => {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .substring(0, 2);
    };

    return (
        <div className="max-w-4xl mx-auto pb-24 md:pb-12 px-4 md:px-0">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <h1 className="text-3xl md:text-4xl font-bold">Global Rankings</h1>
                <div className="relative w-full md:w-auto">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search player..."
                        className="bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-neon-green w-full md:w-64"
                    />
                </div>
            </div>

            <Card className="p-0 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[600px] md:min-w-0">
                        <thead className="bg-white/5 text-gray-400 uppercase text-xs font-bold">
                            <tr>
                                <th className="px-4 md:px-6 py-4">Rank</th>
                                <th className="px-4 md:px-6 py-4">Player</th>
                                <th className="px-4 md:px-6 py-4 hidden md:table-cell">Country</th>
                                <th className="px-4 md:px-6 py-4 text-right">Rating</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {players.map((p) => (
                                <tr key={p.rank} className="hover:bg-white/5 transition-colors">
                                    <td className="px-4 md:px-6 py-4">
                                        <span className={`font-bold ${p.rank <= 3 ? 'text-yellow-500' : 'text-gray-500'}`}>#{p.rank}</span>
                                    </td>
                                    <td className="px-4 md:px-6 py-4 font-bold text-white flex items-center gap-3">
                                        {/* Initials Avatar with Cartoon Style */}
                                        <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br ${getAvatarColor(p.name)} border-2 border-black shadow-[2px_2px_0px_rgba(255,255,255,0.2)] flex items-center justify-center text-[10px] md:text-xs text-white font-black tracking-widest flex-shrink-0`}>
                                            {getInitials(p.name)}
                                        </div>
                                        <div className="flex flex-col">
                                            <span>{p.name}</span>
                                            <span className="md:hidden text-xs text-gray-500">{p.country}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 md:px-6 py-4 text-gray-400 hidden md:table-cell">{p.country}</td>
                                    <td className="px-4 md:px-6 py-4 text-right font-mono text-neon-green">{p.rating}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default Rankings;
