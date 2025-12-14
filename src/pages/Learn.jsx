import React, { useState } from 'react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import { Chessboard } from 'react-chessboard';
import { BookOpen, ChevronRight, CheckCircle, Lock } from 'lucide-react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

const LessonCard = ({ title, description, level, locked, onClick }) => (
    <Card
        className={clsx("cursor-pointer relative", locked && "opacity-50")}
        hoverEffect={!locked}
        onClick={!locked ? onClick : undefined}
    >
        {locked && (
            <div className="absolute inset-0 z-20 bg-midnight/50 flex items-center justify-center">
                <Lock className="w-8 h-8 text-gray-400" />
            </div>
        )}
        <div className="flex justify-between items-start mb-4">
            <div className={`w-2 h-12 rounded-full ${level === 'Beginner' ? 'bg-neon-green' : level === 'Intermediate' ? 'bg-neon-blue' : 'bg-red-500'}`} />
            <span className="text-xs font-bold uppercase text-gray-500">{level}</span>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-sm text-gray-400 mb-4">{description}</p>
        <div className="flex items-center text-neon-green text-sm font-bold group">
            Start Lesson <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
        </div>
    </Card>
);

const LessonView = ({ lesson, onBack }) => {
    const [step, setStep] = useState(0);

    const activeStep = lesson.steps[step];
    const customSquareStyles = {};
    if (activeStep.highlightSquares) {
        activeStep.highlightSquares.forEach(square => {
            customSquareStyles[square] = {
                background: 'radial-gradient(circle, #22c55e 25%, transparent 26%)',
                borderRadius: '50%'
            };
        });
    }

    return (
        <div className="animate-in fade-in duration-500">
            <button onClick={onBack} className="mb-6 text-gray-400 hover:text-white flex items-center gap-2">
                <ChevronRight className="w-4 h-4 rotate-180" /> Back to Lessons
            </button>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                    <h1 className="text-3xl font-bold mb-2">{lesson.title}</h1>
                    <p className="text-gray-400 mb-8">{lesson.description}</p>

                    <div className="space-y-6">
                        {lesson.steps.map((s, idx) => (
                            <div
                                key={idx}
                                onClick={() => setStep(idx)}
                                className={clsx(
                                    "p-4 rounded-lg border transition-all cursor-pointer",
                                    step === idx
                                        ? "bg-neon-green/10 border-neon-green"
                                        : "bg-white/5 border-transparent hover:bg-white/10"
                                )}
                            >
                                <h4 className={clsx("font-bold mb-1", step === idx ? "text-neon-green" : "text-white")}>Step {idx + 1}: {s.title}</h4>
                                <p className="text-sm text-gray-400">{s.text}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="sticky top-24 h-fit">
                    <Card className="flex flex-col items-center p-8 bg-black/50">
                        <div className="w-full max-w-[400px]">
                            <Chessboard
                                position={activeStep.fen}
                                arePiecesDraggable={false}
                                customSquareStyles={customSquareStyles}
                                customDarkSquareStyle={{ backgroundColor: '#334155' }}
                                customLightSquareStyle={{ backgroundColor: '#94A3B8' }}
                            />
                        </div>
                        <p className="mt-6 text-center text-white font-medium italic">
                            "{activeStep.caption}"
                        </p>
                    </Card>
                </div>
            </div>
        </div>
    );
};

const Learn = () => {
    const [activeLesson, setActiveLesson] = useState(null);

    const lessons = [
        {
            id: 1,
            title: "The Fork",
            level: "Beginner",
            description: "Attack two pieces at once with a Knight or Pawn.",
            steps: [
                { title: "Identify Targets", text: "Look for two valuable pieces on the same color.", fen: "rnbqkbnr/pppppppp/8/8/4N3/8/PPPPPPPP/RNBQKB1R w KQkq - 0 1", caption: "The white knight is ready to jump.", highlightSquares: ['e4', 'f6', 'd6'] },
                { title: "The Jump", text: "Move the knight to a square where it attacks both.", fen: "rnbqkbnr/pppppppp/8/8/6N1/5P2/PPPPP1PP/RNBQKB1R b KQkq - 1 1", caption: "Nb6 attacks both Rook and Queen (imaginary scenario).", highlightSquares: ['g4', 'f6', 'h6'] },
                // Note: FENs are dummy for illustration
            ]
        },
        {
            id: 2,
            title: "The Pin",
            level: "Intermediate",
            description: "Restrict an enemy piece from moving.",
            steps: [
                { title: "Absolute Pin", text: "The pinned piece cannot move because it would expose the King.", fen: "rnbqkbnr/pppp1ppp/8/4p3/4P3/2N5/PPPP1PPP/R1BQKBNR b KQkq - 1 2", caption: "The Knight on f6 is pinned by the Bishop.", highlightSquares: ['f6', 'g5'] },
                { title: "Relative Pin", text: "The pinned piece can move, but it would lose material.", fen: "rnbqkbnr/pppp1ppp/8/4p3/4P3/2N5/PPPP1PPP/R1BQKBNR b KQkq - 1 2", caption: "Moving the Knight exposes the Queen.", highlightSquares: ['c3', 'd5'] }
            ]
        },
        {
            id: 3,
            title: "King Opposition",
            level: "Advanced",
            description: "Master the endgame with King placement.",
            locked: true,
            steps: []
        }
    ];

    if (activeLesson) {
        return <LessonView lesson={activeLesson} onBack={() => setActiveLesson(null)} />;
    }

    return (
        <div className="pb-20">
            <div className="text-center mb-16">
                <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-green to-neon-blue mb-4">Master the Game</h1>
                <p className="text-xl text-gray-400">Interactive lessons designed to take you from Beginner to Grandmaster.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {lessons.map(lesson => (
                    <LessonCard
                        key={lesson.id}
                        {...lesson}
                        onClick={() => setActiveLesson(lesson)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Learn;
