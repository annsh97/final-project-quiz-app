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
      <button className="button-items" onClick={enterQuiz}>
        Start Quiz
      </button>
      <button className="button-history" onClick={enterHistory}>
        {" "}
        History{" "}
      </button>
    </div>
  );
}

export default Home;
