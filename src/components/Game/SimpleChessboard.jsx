import React from 'react';
import { Chess } from 'chess.js';

const PieceIcons = {
  w: {
    k: (
      <svg viewBox="0 0 45 45" className="w-full h-full fill-white stroke-black stroke-[1.5]">
        <g fill="none" fillRule="evenodd" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22.5 11.63V6M20 8h5" strokeLinejoin="miter" />
          <path d="M22.5 25s4.5-7.5 3-10.5c0 0-1-2.5-3-2.5s-3 2.5-3 2.5c-1.5 3 3 10.5 3 10.5" fill="#fff" strokeLinecap="butt" />
          <path d="M11.5 37c5.5 3.5 15.5 3.5 21 0v-7s9-4.5 6-10.5c-4-1-5 5.5-8 12-6.13 0-10.87 0-17 0-3-6.5-4-13-8-12-3 6 6 10.5 6 10.5v7V37z" fill="#fff" strokeLinecap="butt" />
          <path d="M11.5 30c5.5-3 15.5-3 21 0m-21 3.5c5.5-3 15.5-3 21 0m-21 3.5c5.5-3 15.5-3 21 0" />
        </g>
      </svg>
    ),
    q: (
      <svg viewBox="0 0 45 45" className="w-full h-full fill-white stroke-black stroke-[1.5]">
        <g fill="#fff" fillRule="evenodd" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM24.5 7.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM41 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM10.5 20.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM38.5 20.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" />
          <path d="M9 26c8.5-1.5 21-1.5 27 0l2-12-7 11V11l-5.5 13.5-3-15-3 15-5.5-14.5V25L7 14l2 12zM9 26c0 2 1.5 2 2.5 4 1 2.5 3 4.5 3 4.5s0-3 10.5-3 10.5 3 10.5 3c2 0 6-2 3-4.5-1-2-2.5-2-2.5-4h-27zM11.5 30c3.5-1 18.5-1 22 0M12 33.5c6-1 15-1 21 0" strokeLinecap="butt" />
        </g>
      </svg>
    ),
    r: (
      <svg viewBox="0 0 45 45" className="w-full h-full fill-white stroke-black stroke-[1.5]">
        <g fill="#fff" fillRule="evenodd" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 39h27v-3H9v3zM12 36v-4h21v4H12zM11 14V9h4v2h5V9h5v2h5V9h4v5" strokeLinecap="butt" />
          <path d="M34 14l-3 3H14l-3-3" />
          <path d="M31 17v12.5c1 2 2 4 2 4H12s1-2 2-4V17" strokeLinecap="butt" />
          <path d="M31 29.5l1.5 2.5h-20l1.5-2.5" />
          <path d="M11 14h23" fill="none" strokeLinejoin="miter" />
        </g>
      </svg>
    ),
    b: (
      <svg viewBox="0 0 45 45" className="w-full h-full fill-white stroke-black stroke-[1.5]">
        <g fill="#fff" fillRule="evenodd" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 36c3.39-.97 9.11-1.45 13.5-1.45 4.38 0 10.11.48 13.5 1.45V30H9v6z" strokeLinecap="butt" />
          <path d="M15 32c2.5 2.5 12.5 2.5 15 0 .5-1.5 0-2 0-2 0-2.5-2.5-4-2.5-4 5.5-1.5 6-11.5-5-15.5-11 4-10.5 14-5 15.5 0 0-2.5 1.5-2.5 4 0 0-.5.5 0 2zM25 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 1 1 5 0z" />
          <path d="M17.5 26h10M15 30h15m-7.5-14.5v5M20 18h5" strokeLinejoin="miter" />
        </g>
      </svg>
    ),
    n: (
      <svg viewBox="0 0 45 45" className="w-full h-full fill-white stroke-black stroke-[1.5]">
        <g fill="#fff" fillRule="evenodd" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10c10.5 1 16.5 8 16 29H15c8-9 10-18.5 7-29z" strokeLinecap="butt" />
          <path d="M24 18c.38 2.32-.46 4.76-3 7 0 0-1.5 1-2.5-.5-1.5-2.5-.5-4.5 0-5.5 1.5-1.5 3.5 1 5.5-1zM9.5 25.5A4.5 4.5 0 1 1 15 25.5 4.5 4.5 0 1 1 9.5 25.5z" />
          <path d="M15 15.5c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" fill="#000" stroke="none" />
        </g>
      </svg>
    ),
    p: (
      <svg viewBox="0 0 45 45" className="w-full h-full fill-white stroke-black stroke-[1.5]">
        <path d="M22.5 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38C17.33 16.5 16 18.59 16 21c0 2.03.94 3.84 2.41 5.03-3 1.06-7.41 5.55-7.41 13.47h23c0-7.92-4.41-12.41-7.41-13.47 1.47-1.19 2.41-3 2.41-5.03 0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z" stroke="#000" strokeWidth="1.5" fill="#fff"/>
      </svg>
    )
  },
  b: {
    k: (
      <svg viewBox="0 0 45 45" className="w-full h-full fill-black stroke-white stroke-[1.5]">
        <g fill="none" fillRule="evenodd" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22.5 11.63V6M20 8h5" strokeLinejoin="miter" stroke="#fff" />
          <path d="M22.5 25s4.5-7.5 3-10.5c0 0-1-2.5-3-2.5s-3 2.5-3 2.5c-1.5 3 3 10.5 3 10.5" fill="#000" stroke="#fff" strokeLinecap="butt" />
          <path d="M11.5 37c5.5 3.5 15.5 3.5 21 0v-7s9-4.5 6-10.5c-4-1-5 5.5-8 12-6.13 0-10.87 0-17 0-3-6.5-4-13-8-12-3 6 6 10.5 6 10.5v7V37z" fill="#000" stroke="#fff" strokeLinecap="butt" />
          <path d="M11.5 30c5.5-3 15.5-3 21 0m-21 3.5c5.5-3 15.5-3 21 0m-21 3.5c5.5-3 15.5-3 21 0" stroke="#fff" />
        </g>
      </svg>
    ),
    q: (
        <svg viewBox="0 0 45 45" className="w-full h-full fill-black stroke-white stroke-[1.5]">
        <g fill="#000" fillRule="evenodd" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <g stroke="none">
            <circle cx="6" cy="12" r="2.75" />
            <circle cx="14" cy="9" r="2.75" />
            <circle cx="22.5" cy="8" r="2.75" />
            <circle cx="31" cy="9" r="2.75" />
            <circle cx="39" cy="12" r="2.75" />
          </g>
          <path d="M9 26c8.5-1.5 21-1.5 27 0l2-12-7 11V11l-5.5 13.5-3-15-3 15-5.5-14.5V25L7 14l2 12zM9 26c0 2 1.5 2 2.5 4 1 2.5 3 4.5 3 4.5s0-3 10.5-3 10.5 3 10.5 3c2 0 6-2 3-4.5-1-2-2.5-2-2.5-4h-27zM11.5 30c3.5-1 18.5-1 22 0M12 33.5c6-1 15-1 21 0" stroke="#fff" strokeLinecap="butt" />
        </g>
      </svg>
    ),
    r: (
      <svg viewBox="0 0 45 45" className="w-full h-full fill-black stroke-white stroke-[1.5]">
        <g fill="#000" fillRule="evenodd" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 39h27v-3H9v3zM12 36v-4h21v4H12zM11 14V9h4v2h5V9h5v2h5V9h4v5" stroke="#fff" strokeLinecap="butt" />
          <path d="M34 14l-3 3H14l-3-3" stroke="#fff" />
          <path d="M31 17v12.5c1 2 2 4 2 4H12s1-2 2-4V17" stroke="#fff" strokeLinecap="butt" />
          <path d="M31 29.5l1.5 2.5h-20l1.5-2.5" stroke="#fff" />
          <path d="M11 14h23" fill="none" stroke="#fff" strokeLinejoin="miter" />
        </g>
      </svg>
    ),
    b: (
      <svg viewBox="0 0 45 45" className="w-full h-full fill-black stroke-white stroke-[1.5]">
        <g fill="#000" fillRule="evenodd" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 36c3.39-.97 9.11-1.45 13.5-1.45 4.38 0 10.11.48 13.5 1.45V30H9v6z" stroke="#fff" strokeLinecap="butt" />
          <path d="M15 32c2.5 2.5 12.5 2.5 15 0 .5-1.5 0-2 0-2 0-2.5-2.5-4-2.5-4 5.5-1.5 6-11.5-5-15.5-11 4-10.5 14-5 15.5 0 0-2.5 1.5-2.5 4 0 0-.5.5 0 2zM25 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 1 1 5 0z" stroke="#fff" />
          <path d="M17.5 26h10M15 30h15m-7.5-14.5v5M20 18h5" stroke="#fff" strokeLinejoin="miter" />
        </g>
      </svg>
    ),
    n: (
      <svg viewBox="0 0 45 45" className="w-full h-full fill-black stroke-white stroke-[1.5]">
        <g fill="#000" fillRule="evenodd" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10c10.5 1 16.5 8 16 29H15c8-9 10-18.5 7-29z" stroke="#fff" strokeLinecap="butt" />
          <path d="M24 18c.38 2.32-.46 4.76-3 7 0 0-1.5 1-2.5-.5-1.5-2.5-.5-4.5 0-5.5 1.5-1.5 3.5 1 5.5-1zM9.5 25.5A4.5 4.5 0 1 1 15 25.5 4.5 4.5 0 1 1 9.5 25.5z" stroke="#fff" />
          <path d="M15 15.5c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" fill="#fff" stroke="none" />
        </g>
      </svg>
    ),
    p: (
      <svg viewBox="0 0 45 45" className="w-full h-full fill-black stroke-white stroke-[1.5]">
        <path d="M22.5 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38C17.33 16.5 16 18.59 16 21c0 2.03.94 3.84 2.41 5.03-3 1.06-7.41 5.55-7.41 13.47h23c0-7.92-4.41-12.41-7.41-13.47 1.47-1.19 2.41-3 2.41-5.03 0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z" stroke="#fff" strokeWidth="1.5" fill="#000"/>
      </svg>
    )
  }
};

const SimpleChessboard = ({ position, onSquareClick, boardWidth = 400 }) => {
  // Parse FEN or use chess.js to get board array
  // If position is a FEN string, we can use a temporary Chess instance to parse it easy
  const board = React.useMemo(() => {
    const tempK = new Chess(position);
    return tempK.board();
  }, [position]);

  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];

  const [selectedSquare, setSelectedSquare] = React.useState(null);

  const handleClick = (square) => {
    // Basic click handling to visualize selection before passing up
    if (selectedSquare === square) {
      setSelectedSquare(null);
      if(onSquareClick) onSquareClick(square);
    } else {
      setSelectedSquare(square);
      if(onSquareClick) onSquareClick(square);
    }
  };

  return (
    <div className="relative rounded-lg shadow-2xl bg-slate-900 p-2">
        <div 
        className="grid grid-cols-8 grid-rows-8 rounded overflow-hidden border border-slate-700 bg-slate-800"
        style={{ 
            width: '100%',
            maxWidth: boardWidth,
            aspectRatio: '1/1',
        }}
        >
        {board.map((row, rowIndex) => 
            row.map((piece, colIndex) => {
                const square = `${files[colIndex]}${ranks[rowIndex]}`;
                const isDark = (rowIndex + colIndex) % 2 === 1;
                
                // Professional clean colors (Slate theme)
                const bgClass = isDark 
                    ? 'bg-[#0F172A]' // Slate-900
                    : 'bg-[#64748B]'; // Slate-500
                
                let content = null;
                if (piece) {
                  content = PieceIcons[piece.color][piece.type];
                }
    
                // Highlight selected
                const isSelected = selectedSquare === square;
            
                return (
                <div
                    key={square}
                    onClick={() => handleClick(square)}
                    className={`relative flex items-center justify-center cursor-pointer ${bgClass}`}
                    data-square={square}
                >
                    {/* Square Overlay for Selection */}
                    {isSelected && (
                        <div className="absolute inset-0 bg-yellow-400/50 mix-blend-overlay shadow-[inset_0_0_10px_rgba(250,204,21,0.5)]"></div>
                    )}

                    {/* Coordinate labels */}
                    {colIndex === 0 && (
                        <span className={`absolute top-0.5 left-1 text-[10px] font-bold select-none ${isDark ? 'text-slate-600' : 'text-slate-300'}`}>
                            {ranks[rowIndex]}
                        </span>
                    )}
                    {rowIndex === 7 && (
                        <span className={`absolute bottom-0 right-1 text-[10px] font-bold select-none ${isDark ? 'text-slate-600' : 'text-slate-300'}`}>
                            {files[colIndex]}
                        </span>
                    )}
                    
                    {/* Piece Container - NO SCALING */}
                    {content && (
                        <div className="relative w-[85%] h-[85%] pointer-events-none z-10 select-none">
                            {content}
                        </div>
                    )}
                </div>
                );
            })
        )}
        </div>
    </div>
  );
};

export default SimpleChessboard;
