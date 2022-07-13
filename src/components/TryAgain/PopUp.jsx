import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

import "./tryagain.scss";

const Popup = (props) => {
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);

  const handlePopupClick = (e) => {
    if (!popupRef.current.contains(e.target)) {
      setShowPopup(false);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const openPopup = (e) => {
    setShowPopup(true);
  };

  const saveRefresh = () => {
    window.location.reload(false);
    saveAttempt();
  };

  const refreshOnly = () => {
    window.location.reload(false);
  };

  const saveAttempt = () => {
    let attempts = JSON.parse(localStorage.getItem("attempts")) || [];
    let curDate = new Date();
    let dateToString = curDate.toLocaleString([], {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      second: "2-digit",
    });

    attempts.push({
      score: props.value,
      total: props.total,
      time: dateToString,
    });

    attempts.sort((a, b) => {
      return a.score > b.score
        ? -1
        : a.score === b.score
        ? a.time > b.time
          ? -1
          : 1
        : 1;
    });

    localStorage.setItem("attempts", JSON.stringify(attempts));
  };

  return (
    <div className="buttons-wrapper">
      <button className="tryAgain" onClick={openPopup}>
        Try Again
      </button>
      {showPopup && (
        <div
          style={{
            visibility: showPopup ? "visible" : "hidden",
            opacity: showPopup ? "1" : "0",
          }}
          className="overlay"
          onClick={handlePopupClick}
        >
          <h3>Do you want to save this attempt?</h3>

          <span className="close-button" onClick={closePopup}>
            X
          </span>

          <button onClick={saveRefresh} className="Save">
            Yes
          </button>

          <button className="no" onClick={refreshOnly}>
            No
          </button>
        </div>
      )}

      <Link to="/history">
        <button onClick={saveAttempt}>History </button>
      </Link>
    </div>
  );
};

export default Popup;
