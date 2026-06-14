import { useState, useEffect } from "react";

const HER_NAME = "Ororo";

const slides = [
  "/one.jpeg",
  "/two.jpeg",
  "/three.jpeg",
  "/four.jpeg",
  "/five.jpeg",
];

const message = `Hey ${HER_NAME}! I wish I could give you a better and bigger gift, but even still, I am cheering for you with all my heart. I love you more than words can carry. I don't have a big gift to give you right now, but I hope you'll accept this instead: my gratitude for your friendship, my prayers for your happiness, and my promise that I'll always be in your corner. You deserve a day that's as beautiful and kind as you are. I hope this year brings you peace, laughter, and everything you've been quietly wishing for. Happy birthday to you, my baby, ${HER_NAME} mi🥹! Thanks for being you.`

export default function BirthdayPage() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [confetti, setConfetti] = useState(false);

  // typewriter
  useEffect(() => {
    if (open && index < message.length) {
      const t = setTimeout(() => {
        setText((p) => p + message[index]);
        setIndex(index + 1);
      }, 28);
      return () => clearTimeout(t);
    }
  }, [open, index]);

  // music + cinematic timing
  useEffect(() => {
    if (!open) return;

    const audioTimer = setTimeout(() => {
      const audio = document.getElementById("song");
      if (audio) {
        audio.volume = 0.5;
        audio.play().catch(() => {});
      }
    }, 9000); // intro delay

    const confettiTimer = setTimeout(() => {
      setConfetti(true);
      setTimeout(() => setConfetti(false), 4000);
    }, 15000); // roughly when chorus feels right

    return () => {
      clearTimeout(audioTimer);
      clearTimeout(confettiTimer);
    };
  }, [open]);

  // auto slide
  useEffect(() => {
    if (!open) return;
    const i = setInterval(() => {
      setCurrentIndex((p) => (p + 1) % slides.length);
    }, 4000);
    return () => clearInterval(i);
  }, [open]);

  const nextSlide = () => setCurrentIndex((p) => (p + 1) % slides.length);
  const prevSlide = () => setCurrentIndex((p) => (p - 1 + slides.length) % slides.length);

  const handleTouchStart = (e) => setTouchStartX(e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (dx < -50) nextSlide();
    if (dx > 50) prevSlide();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 via-rose-200 to-purple-300 overflow-hidden relative">
      {/* audio */}
      <audio id="song" src="/song.mp3" />

      {/* floating hearts (slow rise) */}
      {Array.from({ length: 18 }).map((_, i) => (
        <span
          key={i}
          className="absolute text-pink-500 opacity-80"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: -20,
            fontSize: `${12 + Math.random() * 22}px`,
            animation: `rise ${6 + Math.random() * 6}s linear infinite`,
          }}
        >
          ❤️
        </span>
      ))}

      {/* confetti */}
      {confetti && (
        <div className="pointer-events-none absolute inset-0">
          {Array.from({ length: 40 }).map((_, i) => (
            <span
              key={i}
              className="absolute block w-2 h-2 rounded-sm bg-pink-500"
              style={{
                left: `${Math.random() * 100}%`,
                top: -10,
                animation: `fall ${2 + Math.random() * 2}s linear infinite`,
              }}
            />
          ))}
        </div>
      )}

      <div className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-2xl w-[92%] max-w-md text-center z-10">
        {!open ? (
          <>
            <h1 className="text-2xl font-bold mb-4 animate-pulse">Hey {HER_NAME} ❤️</h1>
            <p className="mb-6">I made something special for you...</p>
            <button
              onClick={() => setOpen(true)}
              className="bg-pink-500 text-white px-4 py-2 rounded-lg shadow"
            >
              Tap to Open 🎁
            </button>
          </>
        ) : (
          <>
            {/* glowing name */}
            <h1 className="text-3xl font-bold mb-4 text-pink-600 drop-shadow-[0_0_10px_rgba(236,72,153,0.7)]">
              ✨ {HER_NAME} ✨
            </h1>

            {/* message */}
            <p className="text-sm whitespace-pre-line mb-4 transition-opacity duration-700">{text}</p>

            {/* carousel */}
            <div className="relative mt-4">
              <div className="overflow-hidden rounded-xl">
                <div
                  className="flex transition-transform duration-700 ease-out"
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                >
                  {slides.map((src, i) => (
                    <div key={i} className="min-w-full flex justify-center items-center">
                      <img
                        src={src}
                        className="h-56 object-contain bg-white rounded-xl transition-transform duration-700 hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* controls + dots */}
              <div className="flex justify-between items-center mt-3">
                <button onClick={prevSlide} className="px-3 py-1 bg-pink-400 text-white rounded">Prev</button>

                <div className="flex gap-1">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentIndex(i)}
                      className={`h-2.5 w-2.5 rounded-full ${currentIndex === i ? "bg-pink-500" : "bg-gray-300"}`}
                    />
                  ))}
                </div>

                <button onClick={nextSlide} className="px-3 py-1 bg-pink-400 text-white rounded">Next</button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* keyframes */}
      <style>{`
        @keyframes rise {
          from { transform: translateY(0); opacity: 1; }
          to { transform: translateY(-110vh); opacity: 0; }
        }
        @keyframes fall {
          from { transform: translateY(0); opacity: 1; }
          to { transform: translateY(110vh); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
