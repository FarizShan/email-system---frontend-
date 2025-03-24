import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./loader.css";

const Loader = () => {
  const navigate = useNavigate();
  const fakeButtonRef = useRef(null);

  useEffect(() => {
    console.log("Loader mounted");
    // Simulate a click to fake user interaction
    if (fakeButtonRef.current) {
      console.log("Attempting to simulate click...");
      const clickEvent = new Event("click", { bubbles: true, cancelable: true });
      fakeButtonRef.current.dispatchEvent(clickEvent);
    }

    const timer = setTimeout(() => {
      console.log("Navigating to /login...");
      navigate("/login");
    }, 3000); // 3-second animation

    return () => {
      console.log("Loader cleanup");
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <div className="loader-container">
      <div className="eye-container">
        <div className="eye">
          <div className="eyelid"></div>
          <div className="pupil"></div>
        </div>
      </div>
      <h1 className="app-name">InVision</h1>
      {/* Hidden button for fake click */}
      <button
        ref={fakeButtonRef}
        style={{ display: "none" }}
        aria-hidden="true"
      ></button>
    </div>
  );
};

export default Loader;