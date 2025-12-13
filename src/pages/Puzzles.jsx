import React, { useState, useEffect } from 'react';
import { Chess } from 'chess.js';
import SimpleChessboard from '../components/Game/SimpleChessboard';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import { Check, X, HelpCircle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Puzzles = () => {
    // Puzzle state
    // Simple mate in 1 puzzle
    // Puzzle Database
    const puzzles = [
        {
            id: 1,
            fen: "r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4",
            solution: "Qxf7#",
            title: "Scholar's Mate",
            hint: "Look for a weak point near the King."
        },
        {
            id: 2,
            fen: "6k1/5ppp/8/8/8/8/5PPP/4R1K1 w - - 0 1",
            solution: "Re8#",
            title: "Back Rank Mate",
            hint: "The King is trapped behind his own pawns."
        },
        {
            id: 3,
            fen: "rnbqkbnr/pppp1ppp/8/4p3/6P1/5P2/PPPPP2P/RNBQKBNR b KQkq - 0 2",
            solution: "Qh4#",
            title: "Fool's Mate",
            hint: "The fastest checkmate possible."
        },
        {
            id: 4,
            fen: "6rk/6pp/7N/8/8/8/8/7K w - - 0 1",
            solution: "Nf7#",
            title: "Smothered Mate",
            hint: "The King has no escape squares."
        },
        {
            id: 5,
            fen: "7k/5Q2/6K1/8/8/8/8/8 w - - 0 1",
            solution: "Qg7#",
            title: "Queen Mate",
            hint: "Deliver checkmate on the back rank."
        }
    ];

    const [currentPuzzle, setCurrentPuzzle] = useState(puzzles[0]);
    const [game, setGame] = useState(new Chess(puzzles[0].fen));
    const [status, setStatus] = useState('idle'); // idle, success, failure
    const [streak, setStreak] = useState(0);
    const [hintSquares, setHintSquares] = useState({});

    // Interaction state
    const [moveFrom, setMoveFrom] = useState(null);
    const [optionSquares, setOptionSquares] = useState({});
    const [boardWidth, setBoardWidth] = useState(500);

    // Resize handler for responsive board
    useEffect(() => {
        function handleResize() {
            const width = window.innerWidth;
            // Adjust based on column size (approximate)
            if (width < 640) setBoardWidth(width - 48);
            else if (width < 1024) setBoardWidth(400); // 3 cols in grid
            else setBoardWidth(500);
        }
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    function onSquareClick(square) {
        if (status === 'success') return;

        // Reset hint if user interacts
        if (Object.keys(hintSquares).length > 0) setHintSquares({});

        // Use a new game instance to check moves (avoid mutating state directly)
        const gameCopy = new Chess(game.fen());

        // If clicking the already selected square, unselect
        if (moveFrom === square) {
            setMoveFrom(null);
            setOptionSquares({});
            return;
        }

        // If a square is already selected, try to move to the new square
        if (moveFrom) {
            const moves = gameCopy.moves({ verbose: true });
            const move = moves.find(m => m.from === moveFrom && m.to === square);

            if (move) {
                // Valid move found, execute it
                handleMoveAttempt(move);
                setMoveFrom(null);
                setOptionSquares({});
                return;
            }
        }

        // If no move was made (or no square selected yet), try to select the new square
        const piece = gameCopy.get(square);
        if (piece && piece.color === gameCopy.turn()) {
            setMoveFrom(square);

            // Highlight valid moves
            const moves = gameCopy.moves({ square, verbose: true });
            const newOptionSquares = {
                [square]: { background: 'rgba(0, 255, 163, 0.4)' }
            };

            moves.forEach((m) => {
                newOptionSquares[m.to] = {
                    background: 'radial-gradient(circle, rgba(0, 255, 163, 0.4) 10%, transparent 70%)',
                    borderRadius: '50%',
                    boxShadow: '0 0 5px rgba(0, 255, 163, 0.5)'
                };
            });

            setOptionSquares(newOptionSquares);
        } else {
            // Clicked empty square or opponent piece without selection
            setMoveFrom(null);
            setOptionSquares({});
        }
    }

    function handleMoveAttempt(move) {
        // Check solution
        if (move.san === currentPuzzle.solution) {
            const newGame = new Chess(game.fen());
            newGame.move(move.san);
            setGame(newGame);

            setStatus('success');
            setStreak(s => s + 1);
        } else {
            setStatus('failure');
            setStreak(0);

            // We do NOT update the board on failure in puzzles, typically users retry.
            // But we should show the "Incorrect" feedback which is handled by 'status'.
        }
    }

    function nextPuzzle() {
        let nextIndex;
        do {
            nextIndex = Math.floor(Math.random() * puzzles.length);
        } while (puzzles[nextIndex].id === currentPuzzle.id);

        const next = puzzles[nextIndex];
        setCurrentPuzzle(next);
        setGame(new Chess(next.fen));
        setStatus('idle');
        setHintSquares({});
        setMoveFrom(null);
        setOptionSquares({});
    }

    function handleHint() {
        const moves = game.moves({ verbose: true });
        const bestMove = moves.find(m => m.san === currentPuzzle.solution);

        if (bestMove) {
            setHintSquares({
                [bestMove.from]: { backgroundColor: 'rgba(255, 255, 0, 0.4)' },
                [bestMove.to]: { backgroundColor: 'rgba(255, 255, 0, 0.4)' }
            });
        }
    }

    return (
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 pt-10">
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

                    <div className="glass-panel p-4 flex justify-center bg-black/50">
                        <SimpleChessboard
                            position={game.fen()}
                            onSquareClick={onSquareClick}
                            boardWidth={boardWidth}
                            customSquareStyles={{ ...hintSquares, ...optionSquares }}
                        />
                    </div>
                </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
                <Card>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">{currentPuzzle.title}</h2>
                        <div className="bg-yellow-500/20 text-yellow-500 px-3 py-1 rounded-full text-xs font-bold border border-yellow-500/50">
                            Streak: {streak} 🔥
                        </div>
                    </div>
                    <p className="text-gray-400 mb-6">Find the best move. (Hint: {currentPuzzle.hint})</p>

                    <div className="flex flex-col gap-3">
                        {status === 'success' ? (
                            <Button onClick={nextPuzzle} icon={ArrowRight} className="bg-neon-green text-midnight">Next Puzzle</Button>
                        ) : (
                            <div className="flex gap-2">
                                <Button className="flex-1" variant="secondary" icon={HelpCircle} onClick={handleHint} disabled={status === 'success'}>Get Hint</Button>
                                {status === 'failure' && (
                                    <Button className="flex-1 bg-white/10 text-white hover:bg-white/20" onClick={() => setStatus('idle')}>Try Again</Button>
                                )}
                            </div>
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
