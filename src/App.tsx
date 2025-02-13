import { useState, useRef, useEffect } from "react";
import { Heart, Music2, PauseCircle, PlayCircle, Image as  ImageDown, Mail, Gift, Calendar, Quote } from "lucide-react";
import { BookHeart } from 'lucide-react';
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-lg p-8 max-w-4xl w-full max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <h2 className="text-2xl font-bold text-rose-600 mb-6">{title}</h2>
        {children}
        <button onClick={onClose} className="mt-6 w-full bg-rose-500 text-white py-2 rounded-lg hover:bg-rose-600">
          Close
        </button>
      </div>
    </div>
  );
};

const ValentineApp = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentModal, setCurrentModal] = useState(null);
  const [animateHearts, setAnimateHearts] = useState(false);
  const audioRef = useRef(new Audio('/Love in the Darkness (feat. Jeremy Shada, Ashly Burch & Hynden Walch).mp3'));

  const memories = [
    { date: "11-3-2023", text: "First Met -Jeonju Night Market" },
    { date: "20-4-2023", text: "First ~date~ - Flower seeing" },
    { date: "27-4-2023", text: "Confession - Rooftop" },
    { date: "2-5-2023", text: "Officialy Together - cat cafe" }
  ];

  const quotes = [
    "Venue : Online",
    "Activities : Movies and Games",
    "Time: 10pm upwards",
    "RSVP through IM"
  ];

  const specialMoments = [
    { title: "2023", desc: "meeting you", icon: Gift },
    { title: "2024", desc: "our university dates", icon: Heart },
    { title: "2025", desc: "ending our university era", icon: Calendar },
    { title: "to the next years up till forever", desc: "will always be together <3", icon: BookHeart }
  ];

  useEffect(() => {
    audioRef.current.loop = true;
    return () => audioRef.current.pause();
  }, []);

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(console.error);
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
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-6">
              <button onClick={triggerHearts} className="hover:scale-110 transition-transform">
                <Heart className="h-8 w-8 text-rose-500" />
              </button>
              <button onClick={toggleMusic} className="flex items-center space-x-2 text-gray-600 hover:text-rose-500">
                <Music2 className="h-5 w-5" />
                {isPlaying ? <PauseCircle className="h-5 w-5" /> : <PlayCircle className="h-5 w-5" />}
              </button>
            </div>
            <div className="flex space-x-4">
              
              <button onClick={() => setCurrentModal('timeline')} className="text-gray-600 hover:text-rose-500">
                <Calendar className="h-5 w-5" />
              </button>
              <button onClick={() => setCurrentModal('quotes')} className="text-gray-600 hover:text-rose-500">
                <Quote className="h-5 w-5" />
              </button>
              <button onClick={() => setCurrentModal('letter')} className="text-gray-600 hover:text-rose-500">
                <Mail className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-16">
        <section className="relative h-screen flex items-center justify-center">
          <div className="absolute inset-0">
            <img src="https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&q=80" alt="Valentine's Background" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-rose-900/30 mix-blend-multiply" />
          </div>
          <div className="relative text-center px-4">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">Happy Valentine's Day</h1>
            <p className="text-xl md:text-2xl text-white/90">To my forever Valentine, qya</p>
          </div>
        </section>

        <section className="py-20 bg-white/80">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-rose-600 text-center mb-12">Our Journey</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {specialMoments.map((moment, i) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow-lg text-center">
                  <moment.icon className="h-12 w-12 text-rose-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{moment.title}</h3>
                  <p className="text-gray-600">{moment.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>


        <Modal isOpen={currentModal === 'timeline'} onClose={() => setCurrentModal(null)} title="Our Story">
          <div className="space-y-6">
            {memories.map((memory, i) => (
              <div key={i} className="flex items-start space-x-4">
                <div className="w-24 font-bold text-rose-500">{memory.date}</div>
                <div className="flex-1 p-4 bg-rose-50 rounded-lg">{memory.text}</div>
              </div>
            ))}
          </div>
        </Modal>

        <Modal isOpen={currentModal === 'quotes'} onClose={() => setCurrentModal(null)} title=" Date night invitation ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quotes.map((quote, i) => (
              <div key={i} className="p-4 bg-rose-50 rounded-lg italic text-center">"{quote}"</div>
            ))}
          </div>
        </Modal>

        <Modal isOpen={currentModal === 'letter'} onClose={() => setCurrentModal(null)} title="My Dearest">
          <div className="prose prose-rose mx-auto">
             <p className="text-left font-bold">My love, happy Valentine's Day.</p>

            <p className="mb-4">From the moment our souls intertwined, you have been my anchor, the steady force that keeps me grounded when the winds of life try to sweep me away. Your love is the gravity that holds me close, the warmth that shields me from the cold uncertainties of the world. In your presence, I find solace; in your touch, I find home.<br/><br/>Every heartbeat of mine echoes your name, every breath I take is filled with the essence of you. I love you not just in fleeting moments, but in the eternity of every second we share. You are the melody in my silence, the light in my darkest nights, and the gentle whisper in my dreams.</p>
            <p className="mb-4">May we walk this path of love, hand in hand, through the changing seasons of life. Let our laughter be the song that lingers in the air, our embrace the shelter against all storms. When all is said and done, when our dreams have taken flight and the stars have whispered their final songs, my only wish will still be the same—to be with you, now and always.</p>
            <p className="text-right font-bold">Forever Yours,<br/>Your Valentine</p>
          </div>
        </Modal>

        {animateHearts && (
          <div className="fixed inset-0 pointer-events-none">
            {[...Array(24)].map((_, i) => (
              <Heart
                key={i}
                className="absolute text-rose-500 animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.2}s`,
                  width: `${Math.random() * 20 + 10}px`,
                  height: `${Math.random() * 20 + 10}px`,
                  opacity: Math.random() * 0.3 + 0.1,
                }}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ValentineApp;