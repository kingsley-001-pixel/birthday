import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

// =======================
// 🔧 CUSTOMIZE THIS PART
// =======================
const HER_NAME = "Ruby"; 

const PHOTOS = [
  "/one.jpeg",
  "/two.jpeg",
  "/three.jpeg",
  "/four.jpeg",
  "/five.jpeg",
  "/six.jpeg",
  "/seven.jpeg",
];

const message = `Hey ${HER_NAME}, First of all... I owe you a serious apology 😅. I completely missed your birthday and I won't even try to defend myself because there's no really god excuse. My brain just decided to go on leave at the wrong time.
But genuinely, I'm sorry. You didn't deserve to be forgotten like that, especially on yur day. I hpe it was still really fun and that you were surrounded by people who made you smile (as you should be).
Even though I'm late(very late 😭), happy birthday. I wish you more happiness, peace, and everything good that life can offer.You're someone worth celebrating whether I remembered on time or not.
I'll make it up to you... somehow. I dn't know how yet, but I will - this is me holding myself accountable now - King 🤍 Ruby`;

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