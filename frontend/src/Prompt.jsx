import React, { useState } from "react";

const Prompt = () => {
  const [word, setWord] = useState("");
  const [story, setStory] = useState("");
  const [showInput, setShowInput] = useState(true);

  const fetchStory = async () => {
    try {
        const response = await fetch(`http://localhost:5000/story?story=${story}&word=${word}`);
        const data = await response.json();

        setStory(data.response);
        setShowInput(true);
    } catch (error) {
        console.error("Error fetching story:", error);
  }
};

  const handleEnter = (event) => {
    if (event.key === "Enter") {
      setShowInput(false);
      fetchStory();
        
    }
  };

  return (
   <>
   <p>{story}</p>
   {showInput && (<input
      value={word}
      onChange={(e) => setWord(e.target.value)}
      onKeyDown={handleEnter}
    />)}
   </>
  );
};

export default Prompt;