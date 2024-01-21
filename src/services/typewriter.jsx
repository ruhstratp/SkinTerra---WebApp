import React, { useState, useEffect } from "react";

const Typewriter = ({ paragraphs }) => {
  const [typewriterText, setTypewriterText] = useState([]);
  const [index, setIndex] = useState(0);
  const [currentParagraph, setCurrentParagraph] = useState(0);

  useEffect(() => {
    if (currentParagraph < paragraphs.length) {
      if (index < paragraphs[currentParagraph].length) {
        setTimeout(() => {
          setTypewriterText((prev) => [
            ...prev.slice(0, currentParagraph),
            (prev[currentParagraph] || "") +
              paragraphs[currentParagraph][index],
          ]);
          setIndex((prev) => prev + 1);
        }, 50); //speed of character display
      } else {
        setIndex(0);
        setCurrentParagraph((prev) => prev + 1);
      }
    }
  }, [paragraphs, currentParagraph, index]);

  return (
    <>
      {typewriterText.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}
    </>
  );
};

export default Typewriter;
