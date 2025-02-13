import React, { useState } from 'react';
import { Heart, Music2, PauseCircle, PlayCircle, Image as ImageIcon, Mail } from 'lucide-react';

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showLetter, setShowLetter] = useState(false);

  const toggleMusic = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-100 to-pink-200">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Heart className="h-8 w-8 text-rose-500" />
              <button 
                onClick={toggleMusic}
                className="flex items-center space-x-2 text-gray-600 hover:text-rose-500 transition-colors"
              >
                <Music2 className="h-5 w-5" />
                {isPlaying ? <PauseCircle className="h-5 w-5" /> : <PlayCircle className="h-5 w-5" />}
              </button>
            </div>
            <div className="flex space-x-4">
              <button className="text-gray-600 hover:text-rose-500 transition-colors">
                <ImageIcon className="h-5 w-5" />
              </button>
              <button 
                onClick={() => setShowLetter(!showLetter)}
                className="text-gray-600 hover:text-rose-500 transition-colors"
              >
                <Mail className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&q=80"
              alt="Valentine's Day Background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-rose-900/30 mix-blend-multiply" />
          </div>
          <div className="relative text-center px-4">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Happy Valentine's Day
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
              To the one who makes every day feel like Valentine's Day
            </p>
          </div>
        </section>

        {/* Love Letter Modal */}
        {showLetter && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-8 max-w-lg w-full max-h-[80vh] overflow-y-auto">
              <div className="prose prose-rose mx-auto">
                <h2 className="text-2xl font-bold text-rose-600 mb-4">My Dearest</h2>
                <p className="mb-4">
                  Every moment with you feels like a beautiful dream come true. Your smile lights up my world,
                  and your love makes my heart skip a beat. You're not just my valentine; you're my best friend,
                  my confidante, and my soulmate.
                </p>
                <p className="mb-4">
                  Thank you for filling my life with joy, laughter, and endless love. I cherish every second
                  we spend together and look forward to creating countless more memories with you.
                </p>
                <p className="text-right font-bold">
                  Forever Yours
                </p>
              </div>
              <button
                onClick={() => setShowLetter(false)}
                className="mt-6 w-full bg-rose-500 text-white py-2 rounded-lg hover:bg-rose-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Floating Hearts Animation */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <Heart
            key={i}
            className={`absolute text-rose-500/20 animate-float-${i % 3}`}
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              fontSize: `${Math.random() * 20 + 10}px`
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default App;