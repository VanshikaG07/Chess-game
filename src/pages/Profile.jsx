import React from 'react';
import Card from '../components/UI/Card';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { TrendingUp, Award, Calendar } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Profile = () => {
    // Dummy Chart Data
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Rapid Rating',
                data: [1200, 1250, 1240, 1310, 1450, 1500],
                borderColor: '#40FF8F',
                backgroundColor: 'rgba(64, 255, 143, 0.5)',
                tension: 0.4,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: '#1C1F2A',
                titleColor: '#fff',
                bodyColor: '#40FF8F',
                borderColor: '#40FF8F',
                borderWidth: 1
            },
        },
        scales: {
            x: { grid: { color: 'rgba(255, 255, 255, 0.1)' }, ticks: { color: '#9ca3af' } },
            y: { grid: { color: 'rgba(255, 255, 255, 0.1)' }, ticks: { color: '#9ca3af' } },
        }
    };

    return (
        <div className="max-w-6xl mx-auto pb-12">
            <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
                <div className="w-32 h-32 rounded-full p-2 bg-gradient-to-br from-neon-green to-neon-blue shadow-[0_8px_0_rgba(0,0,0,0.5)] border-4 border-black transform transition-transform hover:-translate-y-1">
                    <div className="w-full h-full rounded-full bg-midnight flex items-center justify-center overflow-hidden border-4 border-white/20">
                        {/* Placeholder Avatar */}
                        <span className="text-5xl filter drop-shadow-md">👤</span>
                    </div>
                </div>
                <div className="text-center md:text-left">
                    <h1 className="text-4xl font-bold text-white mb-2">Hikaru N.</h1>
                    <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-gray-400">
                        <span className="flex items-center gap-1"><TrendingUp className="w-4 h-4 text-neon-green" /> 2850 Peak Rating</span>
                        <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> Joined 2023</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Stats Cards */}
                <Card className="flex flex-col items-center justify-center py-8">
                    <h3 className="text-gray-400 font-bold mb-2">Rapid</h3>
                    <p className="text-4xl font-mono font-bold text-white">1500</p>
                    <span className="text-xs text-neon-green mt-2">+12 this week</span>
                </Card>
                <Card className="flex flex-col items-center justify-center py-8">
                    <h3 className="text-gray-400 font-bold mb-2">Blitz</h3>
                    <p className="text-4xl font-mono font-bold text-white">1350</p>
                    <span className="text-xs text-red-500 mt-2">-5 this week</span>
                </Card>
                <Card className="flex flex-col items-center justify-center py-8">
                    <h3 className="text-gray-400 font-bold mb-2">Puzzles</h3>
                    <p className="text-4xl font-mono font-bold text-white">2100</p>
                    <span className="text-xs text-neon-green mt-2">Top 5%</span>
                </Card>

                {/* Chart Section */}
                <Card className="lg:col-span-2">
                    <h3 className="font-bold text-xl mb-6">Rating Progress</h3>
                    <Line data={data} options={options} />
                </Card>

                {/* Recent Games */}
                <Card className="lg:col-span-1">
                    <h3 className="font-bold text-xl mb-6">Recent Games</h3>
                    <div className="space-y-3">
                        {[1, 1, 0, 1, 0, 0.5, 1].map((result, i) => (
                            <div key={i} className="flex items-center justify-between p-2 rounded bg-white/5">
                                <span className={`font-bold ${result === 1 ? 'text-neon-green' : result === 0 ? 'text-red-500' : 'text-gray-400'}`}>
                                    {result === 1 ? 'Win' : result === 0 ? 'Loss' : 'Draw'}
                                </span>
                                <span className="text-xs text-gray-500">vs. Player{i}</span>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Profile;
