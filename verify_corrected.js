
import { Chess } from 'chess.js';

const puzzles = [
    {
        id: 1,
        // Scholar's Mate (Known Good)
        fen: "r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4",
        solution: "Qxf7#",
        title: "Scholar's Mate"
    },
    {
        id: 2,
        // Back Rank Mate (Known Good)
        fen: "6k1/5ppp/8/8/8/8/5PPP/4R1K1 w - - 0 1",
        solution: "Re8#",
        title: "Back Rank Mate"
    },
    {
        id: 3,
        // Fool's Mate (Corrected FEN)
        fen: "rnbqkbnr/pppp1ppp/8/4p3/6P1/5P2/PPPPP2P/RNBQKBNR b KQkq - 0 2",
        solution: "Qh4#",
        title: "Fool's Mate"
    },
    {
        id: 4,
        // Smothered Mate (Corrected FEN)
        fen: "r5rk/7p/7N/8/8/8/8/7K w - - 0 1",
        solution: "Nf7#",
        title: "Smothered Mate"
    },
    {
        id: 5,
        // Queen Mate (New Simple Pattern)
        fen: "7k/5Q2/6K1/8/8/8/8/8 w - - 0 1",
        solution: "Qg7#",
        title: "Queen Mate"
    }
];

console.log("Verifying Corrected Puzzles...");

puzzles.forEach(puzzle => {
    const game = new Chess();
    try {
        game.load(puzzle.fen);
    } catch (e) {
        console.error(`Invalid FEN for Puzzle ${puzzle.id}:`, puzzle.fen);
        return;
    }

    const moves = game.moves({ verbose: true });
    // Note: Chess.js might represent mate as '#' in SAN, but let's check exact match
    const solutionMove = moves.find(m => m.san === puzzle.solution);

    if (solutionMove) {
        console.log(`[PASS] Puzzle ${puzzle.id}: Found solution ${puzzle.solution}`);
    } else {
        console.error(`[FAIL] Puzzle ${puzzle.id}: Solution ${puzzle.solution} NOT found.`);
        console.log(`Possible moves for Puzzle ${puzzle.id}:`, moves.map(m => m.san).join(", "));

        // Debug advice
        if (puzzle.id === 5 && !solutionMove) {
            const alternative = moves.find(m => m.san.includes('#'));
            if (alternative) console.log(`Did you mean ${alternative.san}?`);
        }
    }
});
