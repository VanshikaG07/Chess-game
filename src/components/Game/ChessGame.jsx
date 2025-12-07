import React from 'react';

export default function ChessGame() {
    return (
        <div className="w-full flex flex-col items-center justify-center p-4">
            <h2 style={{ textAlign: 'center', marginBottom: '10px' }} className="text-2xl font-bold text-white">
                Play Chess
            </h2>

            <div className="w-full max-w-[480px] bg-[#111] rounded-xl overflow-hidden shadow-2xl">
                <iframe
                    src="https://chess-game-eight-theta.vercel.app/"
                    style={{
                        width: '100%',
                        height: '520px',
                        border: 'none',
                        display: 'block'
                    }}
                    title="Chess Game"
                />
            </div>

            <p className="text-gray-500 text-sm mt-4 text-center">
                Powered by Vercel
            </p>
        </div>
    );
}
