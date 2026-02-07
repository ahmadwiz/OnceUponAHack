import React, { useState, useRef, useEffect } from "react";
import "./Prompt.css";

const TYPEWRITER_MS_PER_CHAR = 35;

const Prompt = () => {
  const [word, setWord] = useState("");
  const [story, setStory] = useState("");
  const [displayedStory, setDisplayedStory] = useState("");
  const [newSentence, setNewSentence] = useState("");
  const [spokenWordIndex, setSpokenWordIndex] = useState(-1);
  const [images, setImages] = useState([]);
  const [showInput, setShowInput] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const audioRef = useRef(null);
  const wordsRef = useRef([]);

  const fetchStory = async () => {
    setLoading(true);
    setError(null);
    setSpokenWordIndex(-1);
    const previousStory = story;
    try {
      const response = await fetch(
        `http://localhost:5000/story?story=${encodeURIComponent(story)}&word=${encodeURIComponent(word)}`
      );
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Something went wrong");

      const fullStory = data.response;
      const addedSentence = fullStory.slice(previousStory.length).trim();

      setStory(fullStory);
      setNewSentence(addedSentence);
      setDisplayedStory(previousStory);

      if (data.image) {
        setImages((prev) => [...prev, data.image]);
      }
      if (data.audio) {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.src = "";
        }
        const audio = new Audio(data.audio);
        audioRef.current = audio;
        wordsRef.current = addedSentence.split(/\s+/).filter(Boolean);
        const onTimeUpdate = () => {
          if (!audio.duration || !isFinite(audio.duration)) return;
          const words = wordsRef.current;
          if (words.length === 0) return;
          const index = Math.min(
            Math.floor((audio.currentTime / audio.duration) * words.length),
            words.length - 1
          );
          setSpokenWordIndex(index);
        };
        const onEnded = () => setSpokenWordIndex(-1);
        audio.addEventListener("timeupdate", onTimeUpdate);
        audio.addEventListener("ended", onEnded);
        audio.play().catch((e) => console.warn("Audio play failed:", e));
      }
      setShowInput(true);
    } catch (err) {
      console.error("Error fetching story:", err);
      setError(err.message || "Could not add to the story. Try again.");
      setShowInput(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (displayedStory.length >= story.length) return;
    const target = story;
    const id = setInterval(() => {
      setDisplayedStory((prev) => {
        if (prev.length >= target.length) {
          clearInterval(id);
          return target;
        }
        return target.slice(0, prev.length + 1);
      });
    }, TYPEWRITER_MS_PER_CHAR);
    return () => clearInterval(id);
  }, [story]);

  useEffect(() => {
    if (!story) setDisplayedStory("");
  }, [story]);

  const handleEnter = (event) => {
    if (event.key === "Enter" && word.trim()) {
      setShowInput(false);
      fetchStory();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (word.trim() && !loading) {
      setShowInput(false);
      fetchStory();
    }
  };

  const isTypewriterActive = displayedStory.length < story.length;
  const showWordHighlight = newSentence && !isTypewriterActive && spokenWordIndex >= 0;

  const renderStoryContent = () => {
    if (!displayedStory && !story) return null;
    const text = isTypewriterActive ? displayedStory : story;
    if (!showWordHighlight || !newSentence.trim()) {
      return (
        <p className={`story-text ${isTypewriterActive ? "typewriter-active" : ""}`}>
          {text || "\u00A0"}
        </p>
      );
    }
    const beforeNew = story.slice(0, story.length - newSentence.length - 1).trim();
    const words = newSentence.split(/\s+/).filter(Boolean);
    return (
      <p className="story-text">
        {beforeNew && <span>{beforeNew} </span>}
        {words.map((w, i) => (
          <span
            key={`${i}-${w}`}
            className={`story-word ${i === spokenWordIndex ? "highlight" : ""}`}
          >
            {w}{i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </p>
    );
  };

  return (
    <div className="prompt">
      <section className="story-section">
        <div className="story-card">
          {story || displayedStory ? (
            renderStoryContent()
          ) : (
            <p className="story-placeholder">
              Your story will appear here. Type a word below and press Enter to begin.
            </p>
          )}
        </div>
      </section>

      {images.length > 0 && (
        <section className="illustrations-section">
          <h2 className="illustrations-title">Illustrations</h2>
          <div className="illustrations-grid">
            {images.map((src, i) => (
              <figure key={i} className="illustration-wrap">
                <img
                  src={src}
                  alt={`Scene ${i + 1}`}
                  className="illustration-img"
                />
                <figcaption className="illustration-caption">Scene {i + 1}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {loading && (
        <div className="loading-state" aria-live="polite">
          <span className="loading-dots">
            <span>.</span><span>.</span><span>.</span>
          </span>
          <span className="loading-text">Writing the next sentence and drawing an illustration</span>
        </div>
      )}

      {error && (
        <div className="error-state" role="alert">
          {error}
        </div>
      )}

      {showInput && (
        <form className="input-wrap" onSubmit={handleSubmit}>
          <label htmlFor="story-word" className="input-label">
            Add a word to continue the story
          </label>
          <div className="input-row">
            <input
              id="story-word"
              type="text"
              value={word}
              onChange={(e) => setWord(e.target.value)}
              onKeyDown={handleEnter}
              placeholder="e.g. dragon, castle, mystery"
              disabled={loading}
              className="story-input"
              autoComplete="off"
            />
            <button
              type="submit"
              disabled={loading || !word.trim()}
              className="story-submit"
            >
              Add sentence
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Prompt;
