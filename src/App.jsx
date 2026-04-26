import { useState, useEffect } from "react";

const HER_NAME = "Ruby";

const slides = [
  "/one.jpeg",
  "/two.jpeg",
  "/three.jpeg",
  "/four.jpeg",
  "/five.jpeg",
  "/six.jpeg",
  "/seven.jpeg",
];

const message = `Hey ${HER_NAME}, First of all... I owe you a serious apology 😅. I completely missed your birthday and I won't even try to defend myself because there's no really good excuse. My brain just decided to go on leave at the wrong time.

But genuinely, I'm sorry. You didn't deserve to be forgotten like that, especially on your day. I hope it was still really fun and that you were surrounded by people who made you smile (as you should be).

Even though I'm late(very late 😭), happy birthday. I wish you more happiness, peace, and everything good that life can offer.You're someone worth celebrating whether I remembered on time or not.

I'll make it up to you... somehow. I dn't know how yet, but I will - this is me holding myself accountable now - King 🤍 Ruby`;

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
