import React, { useState, useEffect, useRef } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import { RotateCcw } from 'lucide-react';

export default function ChessGame() {
    // USE REF: Keeps the game instance stable across renders.
    // This mimics a Class Component's "this.game" behavior.
    const game = useRef(new Chess());

    // VISUAL STATE: Triggers re-renders when the board changes.
    const [fen, setFen] = useState(game.current.fen());
    const [optionSquares, setOptionSquares] = useState({});
    const [boardWidth, setBoardWidth] = useState(500);

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

    // Force Update Helper
    const safeSetFen = () => {
        setFen(game.current.fen());
    };

    // Computer Move Logic
    useEffect(() => {
        if (game.current.isGameOver() || game.current.turn() === 'w') return;

        const timeoutId = setTimeout(() => {
            const possibleMoves = game.current.moves();
            if (possibleMoves.length > 0) {
                const randomIndex = Math.floor(Math.random() * possibleMoves.length);
                game.current.move(possibleMoves[randomIndex]);
                safeSetFen(); // Update UI
            }
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [fen]); // Run whenever FEN changes (after user move)

    function onDrop(sourceSquare, targetSquare) {
        try {
            const move = game.current.move({
                from: sourceSquare,
                to: targetSquare,
                promotion: 'q',
            });

            if (move === null) return false;

            safeSetFen(); // Update UI
            return true;
        } catch (error) {
            return false;
        }
    }

    function resetGame() {
        game.current.reset();
        safeSetFen();
        setOptionSquares({});
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
                    <Chessboard
                        id="BasicBoard"
                        position={fen}
                        onPieceDrop={onDrop}
                        boardWidth={boardWidth}
                        customDarkSquareStyle={{ backgroundColor: '#1e293b' }}
                        customLightSquareStyle={{ backgroundColor: '#334155' }}
                        customSquareStyles={optionSquares}
                        animationDuration={200}
                        arePiecesDraggable={!game.current.isGameOver()}
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
                    <button
                        onClick={resetGame}
                        className="p-3 rounded-lg transition-all hover:bg-neon-green/10 hover:text-neon-green group"
                        title="Reset Game"
                    >
                        <RotateCcw className="w-5 h-5 text-gray-400 group-hover:text-neon-green" />
                    </button>
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
                            Play against Computer
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                            • Computer randomly responds<br />
                            • Highlights show valid moves
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
