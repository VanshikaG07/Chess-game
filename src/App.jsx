import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Play from './pages/Play';
import Learn from './pages/Learn';
import Puzzles from './pages/Puzzles';
import Tournaments from './pages/Tournaments';
import Rankings from './pages/Rankings';
import Community from './pages/Community';
import Profile from './pages/Profile';

const NotFound = () => <div className="text-center py-20"><h1 className="text-4xl font-bold text-red-500">404</h1><p>Checkmate! Page not found.</p></div>;

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/play" element={<Play />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/puzzles" element={<Puzzles />} />
          <Route path="/tournaments" element={<Tournaments />} />
          <Route path="/rankings" element={<Rankings />} />
          <Route path="/community" element={<Community />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
