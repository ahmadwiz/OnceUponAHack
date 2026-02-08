import { useState, useEffect } from "react";

function List({wordsUsed}) {

  return (
    <div id="words-box">
      <p>Word Bank: </p>
      { wordsUsed.map((word, i) => (
        <p id={i}>{word + ", "}</p>
      ))}
    </div>
  )
}

export default List