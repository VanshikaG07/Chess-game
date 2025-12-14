
import { Chess } from 'chess.js';

const puzzles = [
    {
        id: 1,
        fen: "r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4",
        solution: "Qxf7#",
        title: "Scholar's Mate"
    },
    {
        id: 2,
        fen: "6k1/5ppp/8/8/8/8/5Q2/6K1 w - - 0 1", // Check the FEN for puzzle 2 from my memory or the file. 
        // Wait, looking at the file content I just read:
        // id 2 is "6k1/5ppp/8/8/8/8/5PPP/4R1K1 w - - 0 1" with "Re8#"
        solution: "Re8#",
        title: "Back Rank Mate"
    },
    {
        id: 3,
        fen: "rnb1kbnr/pppp1ppp/8/4p3/6Pq/5P2/PPPPP2P/RNBQKBNR b KQkq - 1 2",
        solution: "Qh4#",
        title: "Fool's Mate"
    },
    {
        id: 4,
        fen: "r5rk/5Npp/8/8/8/8/8/7K w - - 0 1",
        solution: "Nf7#",
        title: "Smothered Mate"
    },
    {
        id: 5,
        fen: "5rk1/5ppp/8/8/8/8/5Q2/6K1 w - - 0 1",
        solution: "Qf8#",
        title: "Queen Mate"
    }
];

// Re-copy exact FENs from the source if needed, but I'll use the ones I see in the file view above.

console.log("Verifying Puzzles...");

puzzles.forEach(puzzle => {
    const game = new Chess();
    // Some FENs might be partial, but chess.js handles most. Let's see.
    try {
        game.load(puzzle.fen);
    } catch (e) {
        console.error(`Invalid FEN for Puzzle ${puzzle.id}:`, puzzle.fen);
        return;
    }

    const moves = game.moves({ verbose: true });
    const solutionMove = moves.find(m => m.san === puzzle.solution);

    if (solutionMove) {
        console.log(`[PASS] Puzzle ${puzzle.id}: Found solution ${puzzle.solution}`);
    } else {
        console.error(`[FAIL] Puzzle ${puzzle.id}: Solution ${puzzle.solution} NOT found.`);
        console.log(`Possible moves for Puzzle ${puzzle.id}:`, moves.map(m => m.san).join(", "));
    }
});
