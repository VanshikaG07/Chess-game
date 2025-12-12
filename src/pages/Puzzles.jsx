import React, { useState, useEffect } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import { Check, X, HelpCircle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Puzzles = () => {
    // Puzzle state
    // Simple mate in 1 puzzle
    const initialFen = "r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4"; // Scholar's mate setup
    const solutionMove = "Qxf7#";

    const [game, setGame] = useState(new Chess(initialFen));
    const [status, setStatus] = useState('idle'); // idle, success, failure
    const [streak, setStreak] = useState(0);
    const [hintSquares, setHintSquares] = useState({});

    function onDrop(sourceSquare, targetSquare) {
        if (status === 'success') return false;

        const moves = game.moves({ verbose: true });
        const move = moves.find(m => m.from === sourceSquare && m.to === targetSquare);

        if (!move) return false;

        // Mock puzzle validation: check if move is mate (since Fen is setup for mate in 1)
        // In a real app, we check against a solution string/move
        if (move.san === solutionMove) {
            // For puzzles starting from a specific FEN without history, we can initialize from FEN.
            const newGame = new Chess(game.fen());
            newGame.move(move.san);
            setGame(newGame);

            setStatus('success');
            setStreak(s => s + 1);
            setHintSquares({}); // Clear hint on success
            return true;
        } else {
            setStatus('failure');
            setStreak(0);
            setHintSquares({}); // Clear hint on failure too
            return false;
        }
    }

    function nextPuzzle() {
        setGame(new Chess(initialFen)); // Reset for demo
        setStatus('idle');
        setHintSquares({}); // Clear hint
    }

    function handleHint() {
        // For this demo, we know the solution move is Qxf7#.
        // In a real app, we'd parse the solution line.
        // We'll highlight the source square of the solution move (e.g., 'h5' for Queen on h5)

        // Find the move that leads to the solution (or just parse the SAN if we know it)
        const moves = game.moves({ verbose: true });
        const bestMove = moves.find(m => m.san === solutionMove);

        if (bestMove) {
            setHintSquares({
                [bestMove.from]: { backgroundColor: 'rgba(255, 255, 0, 0.4)' },
                [bestMove.to]: { backgroundColor: 'rgba(255, 255, 0, 0.4)' }
            });
        }
    }

    return (
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3">
                <div className="relative">
                    {/* Feedback Overlay */}
                    <AnimatePresence>
                        {status !== 'idle' && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
                            >
                                <div className={`px-8 py-4 rounded-xl backdrop-blur-md border border-white/20 shadow-2xl flex items-center gap-3 ${status === 'success' ? 'bg-neon-green/20 text-neon-green' : 'bg-red-500/20 text-red-500'}`}>
                                    {status === 'success' ? <Check className="w-8 h-8" /> : <X className="w-8 h-8" />}
                                    <span className="text-2xl font-bold">{status === 'success' ? 'Correct!' : 'Incorrect'}</span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="glass-panel p-2">
                        <Chessboard
                            position={game.fen()}
                            onPieceDrop={onDrop}
                            customSquareStyles={hintSquares}
                            customDarkSquareStyle={{ backgroundColor: '#0b0f19' }}
                            customLightSquareStyle={{ backgroundColor: '#1f2937' }}
                        />
                    </div>
                </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
                <Card>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Daily Puzzle</h2>
                        <div className="bg-yellow-500/20 text-yellow-500 px-3 py-1 rounded-full text-xs font-bold border border-yellow-500/50">
                            Streak: {streak} 🔥
                        </div>
                    </div>
                    <p className="text-gray-400 mb-6">Find the best move for White. (Hint: Look for a checkmate)</p>

                    <div className="flex flex-col gap-3">
                        {status === 'success' ? (
                            <Button onClick={nextPuzzle} icon={ArrowRight} className="bg-neon-green text-midnight">Next Puzzle</Button>
                        ) : (
                            <Button variant="secondary" icon={HelpCircle} onClick={handleHint} disabled={status === 'success'}>Get Hint</Button>
                        )}
                    </div>
                </Card>

                <Card>
                    <h3 className="font-bold text-lg mb-4">Puzzle Stats</h3>
                    <div className="grid grid-cols-2 gap-4 text-center">
                        <div className="p-3 bg-white/5 rounded-lg">
                            <p className="text-2xl font-bold text-white">1,240</p>
                            <p className="text-xs text-gray-500">Rating</p>
                        </div>
                        <div className="p-3 bg-white/5 rounded-lg">
                            <p className="text-2xl font-bold text-neon-green">85%</p>
                            <p className="text-xs text-gray-500">Pass Rate</p>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Puzzles;
