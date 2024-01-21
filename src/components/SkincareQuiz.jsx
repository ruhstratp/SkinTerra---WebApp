import React, { useState } from "react";
import "../assets/css/skinQuiz.css";

const SkincareQuiz = (props) => {
  const questions = [
    {
      id: 1,
      question: "How does your skin feel after cleansing?",
      options: [
        { id: "a", text: "Tight or dry", value: "dry" },
        { id: "b", text: "Oily or greasy", value: "oily" },
        { id: "c", text: "A mix of oily and dry", value: "combination" },
        {
          id: "d",
          text: "Comfortable, but sometimes tight or dry",
          value: "dehydrated",
        },
      ],
    },
    {
      id: 2,
      question: "How often do you experience breakouts?",
      options: [
        { id: "a", text: "Rarely", value: "dry" },
        { id: "b", text: "Occasionally", value: "combination" },
        { id: "c", text: "Frequently", value: "oily" },
        {
          id: "d",
          text: "Only when my skin feels tight or dry",
          value: "dehydrated",
        },
      ],
    },
    {
      id: 3,
      question: "What is your primary skin concern?",
      options: [
        { id: "a", text: "Dryness or flakiness", value: "dry" },
        { id: "b", text: "Uneven texture or tone", value: "combination" },
        { id: "c", text: "Excess oil or shine", value: "oily" },
        { id: "d", text: "Tightness or dehydration", value: "dehydrated" },
      ],
    },
    {
      id: 4,
      question: "How does your skin feel by midday?",
      options: [
        { id: "a", text: "Dry and tight", value: "dry" },
        { id: "b", text: "Oily or shiny", value: "oily" },
        { id: "c", text: "Combination of oily and dry", value: "combination" },
        {
          id: "d",
          text: "Comfortable but sometimes tight or dry",
          value: "dehydrated",
        },
      ],
    },
    {
      id: 5,
      question: "How does your skin react to new products?",
      options: [
        { id: "a", text: "Sensitive or easily irritated", value: "dry" },
        { id: "b", text: "No significant reaction", value: "combination" },
        { id: "c", text: "Prone to breakouts or clogged pores", value: "oily" },
        {
          id: "d",
          text: "Feels more hydrated and comfortable",
          value: "dehydrated",
        },
      ],
    },
    {
      id: 6,
      question: "How large do your pores appear?",
      options: [
        { id: "a", text: "Small or barely visible", value: "dry" },
        { id: "b", text: "Medium", value: "combination" },
        { id: "c", text: "Large or easily visible", value: "oily" },
        {
          id: "d",
          text: "Varies depending on skin condition",
          value: "dehydrated",
        },
      ],
    },
    {
      id: 7,
      question: "What is your main aging concern?",
      options: [
        { id: "a", text: "Fine lines and wrinkles", value: "dry" },
        { id: "b", text: "Loss of firmness", value: "combination" },
        { id: "c", text: "Dark spots or hyperpigmentation", value: "oily" },
        { id: "d", text: "Dehydration and dullness", value: "dehydrated" },
      ],
    },
    {
      id: 8,
      question: "How easily does your skin burn in the sun?",
      options: [
        { id: "a", text: "Very easily", value: "dry" },
        { id: "b", text: "Sometimes", value: "combination" },
        { id: "c", text: "Rarely or never", value: "oily" },
        {
          id: "d",
          text: "Depends on the current level of hydration",
          value: "dehydrated",
        },
      ],
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [results, setResults] = useState({
    dry: 0,
    oily: 0,
    combination: 0,
    dehydrated: 0,
  });
  const [showResults, setShowResults] = useState(false);

  const handleAnswerClick = (option) => {
    setResults((prevResults) => ({
      ...prevResults,
      [option.value]: prevResults[option.value] + 1,
    }));

    const nextQuestion = currentQuestion + 1;

    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResults(true);
    }
  };

  const calculateResults = () => {
    const skinType = Object.keys(results).reduce((a, b) =>
      results[a] > results[b] ? a : b
    );

    switch (skinType) {
      case "dry":
        return { text: "Your skin type is likely dry.", emoji: "💧" };
      case "oily":
        return { text: "Your skin type is likely oily.", emoji: "✨" };
      case "combination":
        return { text: "Your skin type is likely combination.", emoji: "🌦️" };
      case "dehydrated":
        return { text: "Your skin type is likely dehydrated.", emoji: "🥤" };
      default:
        return { text: "Unable to determine your skin type.", emoji: "❓" };
    }
  };

  const retakeQuiz = () => {
    setCurrentQuestion(0);
    setResults({ dry: 0, oily: 0, combination: 0, dehydrated: 0 });
    setShowResults(false);
  };

  return (
    <div className="quiz-wrapper">
      {/* <div className="quiz-header">
        <h2>Discover Your Skin Type</h2>
        <p>Answer these questions to find out your skin type:</p>
      </div> */}
      {!showResults ? (
        <div className="quiz-question">
          <p>{questions[currentQuestion].question}</p>
          <div className="quiz-options">
            {questions[currentQuestion].options.map((option) => (
              <div
                className="quiz-option"
                key={option.id}
                onClick={() => handleAnswerClick(option)}
              >
                {option.text}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="results">
          <h2>{calculateResults().text}</h2>
          <span className="emoji" role="img" aria-label="Skin type emoji">
            {calculateResults().emoji}
          </span>
        </div>
      )}
      <div className="quiz-navigation">
        {!showResults ? (
          <button
            className="quiz-button"
            onClick={() => setCurrentQuestion(currentQuestion + 1)}
          >
            Next
          </button>
        ) : (
          <button className="quiz-button" onClick={retakeQuiz}>
            Retake Quiz
          </button>
        )}
      </div>
    </div>
  );
};

export default SkincareQuiz;
