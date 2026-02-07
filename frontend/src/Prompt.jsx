import React, { useState, useRef } from "react";
import { useTypewriter } from "./TypeWriter";
import List from "./List";


const Prompt = () => {
  const [word, setWord] = useState("");
  const [story, setStory] = useState({
    oldStory: "",
    newStory: "",
    fullStory: "",
  });
  const [showInput, setShowInput] = useState(true);
  const [wordsUsed, setWordsUsed] = useState([]);


  const addWordToList = (wordToAdd) => {
    setWordsUsed(prev => {
    if (prev.includes(wordToAdd)) return prev;
    return [...prev, wordToAdd];
    });
  }

  const playChime = async () => {
    try {
    const chime = new Audio("/chime.mp3");
      chime.currentTime = 0.2; 
      chime.playbackRate = 2;
      await chime.play();
    } catch (err) {
      console.error("Audio play failed:", err);
    }
  };

  const textBoxVisible = (state) => {
    if (state === false) {
        setWord("");
    }
    setShowInput(state);
  }

  const fetchStory = async (wordToAdd) => {
    try {
        const response = await fetch(`http://localhost:5000/story?story=${story.fullStory}&word=${wordToAdd}`);
        const data = await response.json();

        playChime();
        setStory(data);
       
    } catch (error) {
        console.error("Error fetching story:", error);
  }
};

    const fetchWord = async() => {
        try {
            setWord("Loading")
            const response = await fetch("https://random-word-api.herokuapp.com/word?diff=1");
            const data = await response.json();
            setWord(data[0])
            
        } catch (error) {
            textBoxVisible(true);
            console.error("Error fetching randomly generated word", error)
        }
    }

  const handleEnter = (event) => {
    if (event.key === "Enter") {
      fetchStory(word);
      addWordToList(word);
      textBoxVisible(false);
    }
  };

  return (
   <>
    <div className="textBox">
        <p
            style={{
                display: "inline",
            }}
            dangerouslySetInnerHTML={{
                __html: story.oldStory + " "
            }}
        />
        <p
            style={{
                display: "inline",
                paddingRight: story.oldStory === "" ? 0 : 10
            }}
            dangerouslySetInnerHTML={{
                __html: useTypewriter(story.newStory + " ", textBoxVisible)
            }}
        />
    </div>
     


   {showInput && (<div className="input-container">
    <input
      value={word}
      onChange={(e) => setWord(e.target.value.replace(/\s/g, ""))}
      onKeyDown={handleEnter}
      maxLength={15}
      size={10}
      placeholder="Enter word"
      disabled={word === "Loading"}
    />
   </div>)}

    {(showInput&&word != "Loading") ? (
    <div className="input-container">
    <svg onClick={fetchWord} xmlns="http://www.w3.org/2000/svg" width="50" height="50" color="white" fill="currentColor" className="bi bi-dice-6" viewBox="0 0 16 16">
        <path d="M13 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2zM3 0a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3z"/>
        <path d="M5.5 4a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m8 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-4a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m-8 4a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-4a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
    </svg>
    </div>
    ): ""}


  <List wordsUsed={wordsUsed}/>
   </>
  );
};

export default Prompt;