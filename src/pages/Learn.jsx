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
    const [showExplanation, setShowExplanation] = useState(false);

    // Reset explanation visibility when step changes
    React.useEffect(() => {
        setShowExplanation(false);
    }, [step]);

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
                        <p className="mt-6 text-center text-white font-medium italic mb-4">
                            "{activeStep.caption}"
                        </p>

                        <button
                            onClick={() => setShowExplanation(!showExplanation)}
                            className="flex items-center gap-2 text-neon-green hover:text-white transition-colors text-sm font-bold uppercase tracking-wider border border-neon-green/30 hover:bg-neon-green/10 px-4 py-2 rounded-full"
                        >
                            <BookOpen className="w-4 h-4" />
                            {showExplanation ? "Hide Explanation" : "Explain Move"}
                        </button>

                        {showExplanation && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-4 p-4 bg-white/5 rounded-lg border border-white/10 text-sm text-gray-300 leading-relaxed"
                            >
                                <p><span className="text-neon-green font-bold">Why this move?</span> {activeStep.explanation}</p>
                            </motion.div>
                        )}
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
                {
                    title: "Identify Targets",
                    text: "Look for two valuable pieces on the same color.",
                    fen: "rnbqkbnr/pppppppp/8/8/4N3/8/PPPPPPPP/RNBQKB1R w KQkq - 0 1",
                    caption: "The white knight is ready to jump.",
                    highlightSquares: ['e4', 'f6', 'd6'],
                    explanation: "Knights are excellent for forking because they move in an L-shape, allowing them to attack pieces on different files and ranks simultaneously. Here, the Knight on e4 is looking for targets on squares it can reach."
                },
                {
                    title: "The Jump",
                    text: "Move the knight to a square where it attacks both.",
                    fen: "rnbqkbnr/pppppppp/8/8/6N1/5P2/PPPPP1PP/RNBQKB1R b KQkq - 1 1",
                    caption: "Nb6 attacks both Rook and Queen (imaginary scenario).",
                    highlightSquares: ['g4', 'f6', 'h6'],
                    explanation: "By moving to this square, the Knight simultaneously threatens two enemy pieces. This is a powerful tactic because the opponent can usually only save one piece, allowing you to capture the other."
                },
                // Note: FENs are dummy for illustration
            ]
        },
        {
            id: 2,
            title: "The Pin",
            level: "Intermediate",
            description: "Restrict an enemy piece from moving.",
            steps: [
                {
                    title: "Absolute Pin",
                    text: "The pinned piece cannot move because it would expose the King.",
                    fen: "rnbqkbnr/pppp1ppp/8/4p3/4P3/2N5/PPPP1PPP/R1BQKBNR b KQkq - 1 2",
                    caption: "The Knight on f6 is pinned by the Bishop.",
                    highlightSquares: ['f6', 'g5'],
                    explanation: "An absolute pin occurs when a piece is shielding the King. Moving the pinned piece would be an illegal move because you cannot put your own King in check."
                },
                {
                    title: "Relative Pin",
                    text: "The pinned piece can move, but it would lose material.",
                    fen: "rnbqkbnr/pppp1ppp/8/4p3/4P3/2N5/PPPP1PPP/R1BQKBNR b KQkq - 1 2",
                    caption: "Moving the Knight exposes the Queen.",
                    highlightSquares: ['c3', 'd5'],
                    explanation: "In a relative pin, the piece behind the pinned piece is valuable (like a Queen or Rook), but not the King. Moving the pinned piece is legal, but usually a bad idea because you will lose the more valuable piece behind it."
                }
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
