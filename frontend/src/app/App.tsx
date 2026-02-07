import { useState, useRef } from "react";
import { motion } from "motion/react";
import { Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "./components/ui/input";

const API_BASE = "http://localhost:5000";

export default function App() {
  const [word, setWord] = useState("");
  const [story, setStory] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const fetchStory = async () => {
    if (!word.trim() || loading) return;
    setLoading(true);
    try {
      const url = `${API_BASE}/story?story=${encodeURIComponent(story)}&word=${encodeURIComponent(word)}`;
      const res = await fetch(url);
      const data = await res.json();
      setStory(data.response ?? story);
      if (data.image) {
        setImages((prev) => [...prev, data.image]);
        setSelectedImageIndex((prev) => prev + 1); // jump to the new image
      }
      if (data.audio) {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.src = "";
        }
        const audio = new Audio(data.audio);
        audioRef.current = audio;
        audio.play().catch(() => {});
      }
    } catch (e) {
      console.error("Error fetching story:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") fetchStory();
  };

  const canPrev = images.length > 0 && selectedImageIndex > 0;
  const canNext = images.length > 0 && selectedImageIndex < images.length - 1;

  return (
    <div className="size-full min-h-screen p-8 md:p-16 relative overflow-hidden">
      {/* Subtle background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              delay: Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="inline-block mb-6 text-accent"
          >
            <Sparkles className="size-8" />
          </motion.div>

          <h1 className="text-5xl md:text-6xl bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Once upon a time...
          </h1>
        </motion.div>

        {/* Story + textbox inline: textbox moves to end of sentence as story grows */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap items-baseline gap-x-2 gap-y-2 p-6 rounded-xl bg-card/60 backdrop-blur-sm border border-border"
        >
          {story && (
            <span className="text-foreground text-lg leading-relaxed whitespace-pre-wrap">
              {story}
            </span>
          )}
          <span className="inline-flex items-center gap-2">
            <Input
              value={word}
              onChange={(e) => setWord(e.target.value)}
              onKeyDown={handleKeyDown}
              maxLength={15}
              placeholder="Start here..."
              disabled={loading}
              className="w-48 bg-card/50 backdrop-blur-sm border-primary/30 focus:border-primary/60 text-lg"
            />
            {loading && (
              <span className="text-muted-foreground text-sm whitespace-nowrap">
                Adding…
              </span>
            )}
          </span>
        </motion.div>

        {/* Images: left-to-right order, swap with prev/next */}
        {images.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 flex flex-row items-center gap-3"
          >
            <button
              type="button"
              disabled={!canPrev}
              onClick={() => setSelectedImageIndex((i) => Math.max(0, i - 1))}
              className="shrink-0 rounded-full p-2 border border-border bg-card/80 hover:bg-card disabled:opacity-40 disabled:pointer-events-none"
              aria-label="Previous image"
            >
              <ChevronLeft className="size-5" />
            </button>
            <div className="flex-1 flex justify-center min-h-[200px] items-center">
              <img
                src={images[selectedImageIndex]}
                alt={`Scene ${selectedImageIndex + 1}`}
                className="max-w-full max-h-[70vh] w-auto object-contain rounded-lg border border-border shadow-lg"
              />
            </div>
            <button
              type="button"
              disabled={!canNext}
              onClick={() =>
                setSelectedImageIndex((i) => Math.min(images.length - 1, i + 1))
              }
              className="shrink-0 rounded-full p-2 border border-border bg-card/80 hover:bg-card disabled:opacity-40 disabled:pointer-events-none"
              aria-label="Next image"
            >
              <ChevronRight className="size-5" />
            </button>
            <span className="text-muted-foreground text-sm whitespace-nowrap">
              {selectedImageIndex + 1} / {images.length}
            </span>
          </motion.div>
        )}
      </div>
    </div>
  );
}