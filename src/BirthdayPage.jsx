import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

// =======================
// 🔧 CUSTOMIZE THIS PART
// =======================
const HER_NAME = "Confi"; 

const PHOTOS = [
  "/photo1.jpg",
  "/photo2.jpg",
];

const message = `Happy Birthday ${HER_NAME} ❤️\n\nI won’t even lie… from the moment you came into my life, things just changed. You make everything feel softer, calmer, and better.\n\nIt’s not just that you’re beautiful… it’s your energy, your smile, the way you carry yourself. You’re different, and I love that.\n\nI might not have everything right now, but one thing I’m sure of is you mean a lot to me… and I’m not playing about you.\n\nEnjoy your day, my girl 🤍`;

export default function BirthdayPage() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);

  // Typewriter effect
  useEffect(() => {
    if (open && index < message.length) {
      const timeout = setTimeout(() => {
        setText((prev) => prev + message[index]);
        setIndex(index + 1);
      }, 30);
      return () => clearTimeout(timeout);
    }
  }, [open, index]);

  // 🎵 PERFECT TIMING MUSIC (starts after 9 seconds)
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        const audio = document.getElementById("song");
        if (audio) {
          audio.volume = 0.5; // keep it soft
          audio.play().catch(() => {});
        }
      }, 9000); // 9 seconds delay

      return () => clearTimeout(timer);
    }
  }, [open]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-rose-200 to-purple-300 flex items-center justify-center p-4 overflow-hidden">
      {/* 🎵 AUDIO FILE */}
      <audio id="song" src="/song.mp3" />

      {/* Floating Hearts */}
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-red-400"
          initial={{ y: "100vh", x: Math.random() * window.innerWidth }}
          animate={{ y: "-10vh" }}
          transition={{ duration: 5 + Math.random() * 5, repeat: Infinity }}
        >
          <Heart size={12 + Math.random() * 24} />
        </motion.div>
      ))}

      <Card className="max-w-md w-full shadow-2xl rounded-2xl z-10 backdrop-blur-lg bg-white/80">
        <CardContent className="p-6 text-center">
          {!open ? (
            <>
              <motion.h1
                className="text-2xl font-bold mb-4"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                Hey {HER_NAME} ❤️
              </motion.h1>
              <p className="mb-6">I made something special just for you...</p>
              <Button onClick={() => setOpen(true)}>
                Tap to Open 🎁
              </Button>
            </>
          ) : (
            <>
              <motion.h1
                className="text-3xl font-bold mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                ✨ {HER_NAME} ✨
              </motion.h1>

              <p className="text-sm whitespace-pre-line mb-4">{text}</p>

              {/* Photos */}
              <div className="grid grid-cols-2 gap-2 mt-4">
                {PHOTOS.map((src, i) => (
                  <motion.img
                    key={i}
                    src={src}
                    alt="memory"
                    className="h-24 w-full object-cover rounded-xl"
                    whileHover={{ scale: 1.05 }}
                  />
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}