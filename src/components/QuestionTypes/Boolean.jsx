import React, { useState } from "react";

const Boolean = (props) => {
  const [isCorrect, setIsCorrect] = useState(null);
  const [selected, setSelected] = useState(null);
  const [confirm, setConfirm] = useState(false);

  const selectAnswer = (answer) => {
    if (!confirm) {
      setSelected(answer);
    }
  };

  const handleConfirm = () => {
    setConfirm(true);
    if (selected === props.answer.answer) {
      setIsCorrect(true);
      props.newScore(props.score + 1);
    } else setIsCorrect(false);
  };

  return (
    <div className="question-container">
      <div className="question-content">
        <h3>{props.question.question}</h3>

        <div className="answer-options">
          <div
            className={
              "single-option " +
              (isCorrect === true && selected === true
                ? "correct"
                : isCorrect === false && selected === true
                ? "wrong"
                : selected === true
                ? "active "
                : "")
            }
            onClick={() => selectAnswer(true)}
          >
            <span>true</span>
          </div>
          <div
            className={
              "single-option " +
              (isCorrect === true && selected === false
                ? "correct"
                : isCorrect === false && selected === false
                ? "wrong"
                : selected === false
                ? "active "
                : "")
            }
            onClick={() => selectAnswer(false)}
          >
            <span>false</span>
          </div>
        </div>
        {!confirm && selected !== null && (
          <button className="btn" onClick={() => handleConfirm()}>
            Confirm
          </button>
        )}
        {confirm && (
          <button className="btn" onClick={() => props.onClick()}>
            Next
          </button>
        )}
      </div>
    </div>
  );
};
export default Boolean;
