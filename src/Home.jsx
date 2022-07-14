import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const enterQuiz = () => {
    navigate("/Quiz");
  };
  const enterHistory = () => {
    navigate("/History");
  };
  return (
    <div>
      <ul className="start-page">
        <h1>Welcome to Quiz App</h1>
        <li>
          <button className="button-items" onClick={enterQuiz}>
            Start Quiz
          </button>
        </li>
        <li>
          <button className="button-history" onClick={enterHistory}>
            History
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Home;
