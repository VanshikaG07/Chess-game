import React, { useState, useEffect, useRef } from 'react';
// import { Chessboard } from 'react-chessboard'; // BROKEN LIBRARY
import SimpleChessboard from './SimpleChessboard';
import { Chess } from 'chess.js';
import { RotateCcw } from 'lucide-react';
import Engine from './Engine';

export default function ChessGame({ difficulty = "Easy" }) {
    // USE REF: Keeps the game instance stable across renders.
    const game = useRef(new Chess());
    
    // FIX: Lazy init to avoid spawning workers on every render
    const engine = useRef(null);
    if (!engine.current) {
        engine.current = new Engine();
    }

    // VISUAL STATE: Triggers re-renders when the board changes.
    const [fen, setFen] = useState(game.current.fen());
    const [moveCount, setMoveCount] = useState(0); // Force re-render key
    const [optionSquares, setOptionSquares] = useState({});
    const [boardWidth, setBoardWidth] = useState(500);
    const [lastError, setLastError] = useState(null); // Debug state

    const [moveFrom, setMoveFrom] = useState('');

    // Resize handler
    useEffect(() => {
        function handleResize() {
            const width = window.innerWidth;
            if (width < 640) setBoardWidth(width - 48);
            else if (width < 1024) setBoardWidth(400);
            else setBoardWidth(560);
        }
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Setup Engine Response Handler
    useEffect(() => {
        // Define difficulty map
        const levels = {
            "Easy": { depth: 2 },
            "Medium": { depth: 8 },
            "Hard": { depth: 15 },
            "Grandmaster": { depth: 20 }
        };

        const currentLevel = levels[difficulty] || levels["Easy"];

        engine.current.onMessage = (message) => {
            // Parse "bestmove e2e4"
            if (message && message.startsWith("bestmove")) {
                const parts = message.split(" ");
                const moveStr = parts[1]; // "e2e4" or "e7e8q"

                if (moveStr && moveStr !== "(none)") {
                    const from = moveStr.substring(0, 2);
                    const to = moveStr.substring(2, 4);
                    const promotion = moveStr.length > 4 ? moveStr.substring(4, 5) : undefined;

                    game.current.move({ from, to, promotion: promotion || 'q' });
                    safeSetFen();
                }
            }
        };

        return () => {
            // cleanup if needed (though Engine instance persists)
        };
    }, [difficulty]);

    // Reset game when difficulty changes
    useEffect(() => {
        resetGame();
    }, [difficulty]);

    // Force Update Helper
    const safeSetFen = () => {
        const newFen = game.current.fen();
        console.log("GAME: Updating FEN. Old:", fen, "New:", newFen);
        setFen(newFen);
        setMoveCount(c => c + 1);
    };

    // Computer Move Logic
    useEffect(() => {
        if (game.current.isGameOver() || game.current.turn() === 'w') return;

        // Define difficulty map again for the "go" command
        const levels = {
            "Easy": { depth: 2 },
            "Medium": { depth: 8 },
            "Hard": { depth: 15 },
            "Grandmaster": { depth: 20 }
        };
        const currentLevel = levels[difficulty] || levels["Easy"];

        // Short delay for "thinking" visualization
        const timeoutId = setTimeout(() => {
            engine.current.evaluatePosition(game.current.fen(), currentLevel.depth);
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [fen, difficulty]);

    function onDrop(sourceSquare, targetSquare) {
        try {
            console.log(`GAME: User Attempting move: ${sourceSquare} -> ${targetSquare}`);

            const move = game.current.move({
                from: sourceSquare,
                to: targetSquare,
                promotion: 'q',
            });

            if (move === null) {
                console.warn("GAME: Illegal move attempted");
                setLastError(`Invalid move: ${sourceSquare} to ${targetSquare}`);
                return false;
            }

            console.log("GAME: Move successful. New FEN:", game.current.fen());
            setLastError(null);
            safeSetFen(); // Update UI
            return true;
        } catch (error) {
            console.error("Move Error:", error);
            setLastError(`Move Error: ${error.message}`);
            return false;
        }
    }

    function onSquareClick(square) {
        // Only allow if it's white's turn and game isn't over
        if (game.current.turn() !== 'w' || game.current.isGameOver()) return;

        if (!moveFrom) {
            // Clicked a square to start move
            const piece = game.current.get(square);
            if (piece && piece.color === 'w') {
                setMoveFrom(square);
                setOptionSquares({
                    [square]: { background: 'rgba(0, 255, 163, 0.4)' }
                });
            }
        } else {
            // Clicked a target square
            const move = onDrop(moveFrom, square);
            
            if (!move) {
                // If invalid move (e.g. clicked another white piece), select that instead
                const piece = game.current.get(square);
                if (piece && piece.color === 'w') {
                    setMoveFrom(square);
                    setOptionSquares({
                        [square]: { background: 'rgba(0, 255, 163, 0.4)' }
                    });
                    return;
                }
            }
            
            // Cleanup selection
            setMoveFrom('');
            setOptionSquares({});
        }
    }

    function resetGame() {
        try {
            game.current.reset();
            safeSetFen();
            setOptionSquares({});
            setMoveFrom('');
            engine.current.stop(); // Stop any thinking
        } catch (error) {
            console.error("Reset Error:", error);
        }
    }

    // derived state for UI
    const currentTurn = game.current.turn() === 'w' ? 'White' : 'Black';
    const isCheckmate = game.current.isCheckmate();
    const isDraw = game.current.isDraw();
    const isCheck = game.current.isCheck();

    let status = `${currentTurn} to move`;
    if (isCheckmate) status = `Game over, ${currentTurn} is in checkmate.`;
    else if (isDraw) status = 'Game over, drawn position.';
    else if (isCheck) status = `${currentTurn} to move (Check!)`;
    
    if (game.current.turn() === 'b' && !game.current.isGameOver()) {
        status = "AI is thinking...";
    }

    console.log(`GAME: RENDER. MoveCount: ${moveCount}, FEN: ${fen}`);

    return (
        <div className="flex flex-col xl:flex-row gap-8 items-start justify-center w-full max-w-7xl mx-auto px-4 py-8">
            {/* Board Container */}
            <div className="relative group">
                <div
                    className="absolute -inset-1 rounded-xl opacity-20 blur-xl transition duration-1000 group-hover:opacity-40"
                    style={{ background: 'linear-gradient(90deg, #00FFA3, #00E5FF, #D946EF)' }}
                />
                <div
                    className="relative p-2 rounded-xl"
                    style={{
                        backgroundColor: '#050511',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                >
                    <SimpleChessboard
                        position={fen}
                        onSquareClick={onSquareClick}
                        boardWidth={boardWidth}
                    />
                </div>
            </div>

            {/* Game Controls & Info */}
            <div
                className="w-full xl:w-96 p-6 rounded-xl flex flex-col gap-6"
                style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)'
                }}
            >
                <div className="flex justify-between items-center pb-4 border-b border-white/10">
                    <h2 className="text-2xl font-bold text-white tracking-tight">Chess Game</h2>
                    <div className="flex gap-2">
                        <button
                            onClick={resetGame}
                            className="p-3 rounded-lg transition-all hover:bg-neon-green/10 hover:text-neon-green group"
                            title="Reset Game"
                        >
                            <RotateCcw className="w-5 h-5 text-gray-400 group-hover:text-neon-green" />
                        </button>
                    </div>
                </div>

                {/* Status Section */}
                <div className="space-y-4">
                    <div className="bg-black/40 p-4 rounded-lg border border-white/5">
                        <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Status</p>
                        <div className="text-lg font-bold text-white flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${isCheckmate || isCheck ? 'bg-red-500' : 'bg-emerald-500'}`}></div>
                            {status}
                        </div>
                    </div>

                    {/* FEN Display */}
                    <div className="bg-black/40 p-4 rounded-lg border border-white/5">
                        <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">FEN</p>
                        <div className="font-mono text-xs text-gray-400 break-all leading-relaxed select-all">
                            {fen}
                        </div>
                    </div>

                    {/* PGN History */}
                    <div className="bg-black/40 p-4 rounded-lg border border-white/5 flex flex-col h-48">
                        <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">Move History</p>
                        <div className="flex-1 overflow-y-auto font-mono text-sm text-gray-300 leading-relaxed pr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                            {game.current.pgn() || <span className="text-gray-600 italic">No moves yet.</span>}
                        </div>
                    </div>

                    <div
                        className="p-4 rounded-lg relative overflow-hidden mt-4"
                        style={{
                            background: 'linear-gradient(90deg, rgba(0, 255, 163, 0.05) 0%, transparent 100%)',
                            borderLeft: '2px solid #00FFA3'
                        }}
                    >
                        <p className="text-sm font-medium text-neon-green">
                            Current Difficulty: {difficulty}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                            • Opponent: Stockfish 16 (Local)<br />
                            • Depth: {difficulty === "Easy" ? 2 : difficulty === "Medium" ? 8 : difficulty === "Hard" ? 15 : 20}
                        </p>
                    </div>


                </div>
            </div>
        </div>
    );
}
