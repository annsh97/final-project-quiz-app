import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Rings } from "react-loader-spinner";
import { Progress } from "reactstrap";

import Boolean from "../QuestionTypes/Boolean";
import Multiple from "../QuestionTypes/Multiple";
import Single from "../QuestionTypes/Single";
import PopUp from "../TryAgain/PopUp";

import { setDataWithExpiry, getDataWithExpiry } from "../../Utilities/Api";
import { fetchData } from "../../helpers/fetchData";

import "./Quiz.css";

const Quiz = () => {
  const [data, setData] = useState({ questions: [], answers: [] });
  const [currentQuestionId, setCurrentQuestionId] = useState(0);
  const [score, setScore] = useState(0);

  const navigate = useNavigate();
  const goHomePage = () => {
    navigate("/");
  };

  const handleNext = () => {
    setCurrentQuestionId(currentQuestionId + 1);
  };

  const handleSettingScore = (newScore) => {
    setScore(newScore);
  };

  useEffect(() => {
    const getData = async () => {
      const tempData = await fetchData();
      setDataWithExpiry("data", tempData, 500000);
      setData({
        questions: getDataWithExpiry("data").questions,
        answers: getDataWithExpiry("data").answers,
      });
    };
    getDataWithExpiry("data")
      ? setData({
          questions: getDataWithExpiry("data").questions,
          answers: getDataWithExpiry("data").answers,
        })
      : getData();
  }, []);

  const { questions, answers } = data;

  return !questions.length ? (
    <div className="app">
      <Rings color="#FFB03B" height={350} width={700} />
    </div>
  ) : (
    <div className="page">
      {currentQuestionId < questions.length ? (
        questions[currentQuestionId].type === "single" ? (
          <Single
            question={questions[currentQuestionId]}
            answer={answers[currentQuestionId]}
            onClick={handleNext}
            score={score}
            newScore={handleSettingScore}
          ></Single>
        ) : questions[currentQuestionId].type === "multiple" ? (
          <Multiple
            question={questions[currentQuestionId]}
            answer={answers[currentQuestionId]}
            onClick={handleNext}
            score={score}
            newScore={handleSettingScore}
          ></Multiple>
        ) : (
          <Boolean
            question={questions[currentQuestionId]}
            answer={answers[currentQuestionId]}
            onClick={handleNext}
            score={score}
            newScore={handleSettingScore}
          ></Boolean>
        )
      ) : (
        <div className="final-page">
          <div className="score-container">
            <h3>Total score:</h3>
            <h1>
              {score} / {questions.length}
            </h1>
          </div>
          <PopUp value={score} total={questions.length} />
        </div>
      )}
      <div className="progress-bar-container">
        <Progress
          color="warning"
          value={(currentQuestionId / questions.length) * 100}
        >
          {currentQuestionId}/{questions.length}
        </Progress>
      </div>

      <button className="button-home" onClick={goHomePage}>
        Go Home
      </button>
    </div>
  );
};

export default Quiz;
