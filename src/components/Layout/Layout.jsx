import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-midnight text-white selection:bg-neon-green selection:text-midnight flex flex-col">
            {/* Background Grid Pattern */}
            <div className="fixed inset-0 z-0 opacity-20 pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                }}>
            </div>

            <Navbar />

            <main className="flex-grow pt-24 px-4 md:px-8 relative z-10 w-full max-w-7xl mx-auto">
                {children}
            </main>

            <Footer />
        </div>
    );
};

export default Layout;
