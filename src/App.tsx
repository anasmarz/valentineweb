import React, { useState, useRef, useEffect } from 'react';
import { Heart, Music2, PauseCircle, PlayCircle, Image as ImageIcon, Mail } from 'lucide-react';

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [animateHearts, setAnimateHearts] = useState(false);
  const audioRef = useRef(new Audio('/Love in the Darkness (feat. Jeremy Shada, Ashly Burch & Hynden Walch).mp3'));

  useEffect(() => {
    audioRef.current.loop = true;
    return () => audioRef.current.pause();
  }, []);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setShowLetter(false);
        setShowGallery(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(error => console.log("Error playing audio:", error));
    }
    setIsPlaying(!isPlaying);
  };

  const triggerHearts = () => {
    setAnimateHearts(true);
    setTimeout(() => setAnimateHearts(false), 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-100 to-pink-200">
      <nav className="bg-white/80 backdrop-blur-sm fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <button onClick={triggerHearts} className="flex items-center hover:scale-110 transition-transform duration-200">
                <Heart className="h-8 w-8 text-rose-500" />
              </button>
              <button onClick={toggleMusic} className="flex items-center space-x-2 text-gray-600 hover:text-rose-500 transition-colors hover:scale-105">
                <Music2 className="h-5 w-5" />
                {isPlaying ? <PauseCircle className="h-5 w-5" /> : <PlayCircle className="h-5 w-5" />}
              </button>
            </div>
            <div className="flex space-x-4">
              <button onClick={() => setShowGallery(true)} className="text-gray-600 hover:text-rose-500 transition-colors hover:scale-110">
                <ImageIcon className="h-5 w-5" />
              </button>
              <button onClick={() => setShowLetter(!showLetter)} className="text-gray-600 hover:text-rose-500 transition-colors hover:scale-110">
                <Mail className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-16">
        <section className="relative h-screen flex items-center justify-center">
          <div className="absolute inset-0">
            <img src="https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&q=80" 
                 alt="Valentine's Day Background" 
                 className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-rose-900/30 mix-blend-multiply" />
          </div>
          <div className="relative text-center px-4">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">Happy Valentine's Day</h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">To the one who makes every day feel like Valentine's Day</p>
          </div>
        </section>

        {showLetter && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowLetter(false)}>
            <div className="bg-white rounded-lg p-8 max-w-lg w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="prose prose-rose mx-auto">
                <h2 className="text-2xl font-bold text-rose-600 mb-4">My Dearest Love</h2>
                <p className="mb-4">Every moment with you feels like a beautiful dream come true. Your smile lights up my world, and your laughter is my favorite melody.</p>
                <p className="mb-4">I cherish the way you understand me without words and stand by me through every storm. You are my strength, my joy, and my greatest love.</p>
                <p className="mb-4">With you, I've found a home in your heart, and I promise to cherish and adore you for all eternity.</p>
                <p className="text-right font-bold">Forever Yours,<br/>Your Valentine</p>
              </div>
              <button onClick={() => setShowLetter(false)} className="mt-6 w-full bg-rose-500 text-white py-2 rounded-lg hover:bg-rose-600 transition-colors">
                Close
              </button>
            </div>
          </div>
        )}

        {showGallery && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowGallery(false)}>
            <div className="bg-white rounded-lg p-8 max-w-4xl w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <h2 className="text-2xl font-bold text-rose-600 mb-4">Our Memories</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <img key={i} 
                       src={`https://picsum.photos/200/300?random=${i}`} 
                       alt="Memory" 
                       className="w-full h-32 object-cover rounded-lg hover:scale-105 transition-transform cursor-pointer" />
                ))}
              </div>
              <button onClick={() => setShowGallery(false)} className="mt-6 w-full bg-rose-500 text-white py-2 rounded-lg hover:bg-rose-600 transition-colors">
                Close
              </button>
            </div>
          </div>
        )}
      </main>

      {animateHearts && (
        <div className="fixed inset-0 pointer-events-none">
          {[...Array(24)].map((_, i) => (
            <Heart
              key={i}
              className="absolute text-rose-500 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.2}s`,
                width: `${Math.random() * 30 + 10}px`,
                height: `${Math.random() * 30 + 10}px`,
                opacity: Math.random() * 0.3 + 0.1,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;