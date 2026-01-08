/**
 * Home screen - single dashboard
 * Five large vertical buttons
 * No scrolling required
 */

import { useNavigate } from "react-router-dom";
import { useAppStore } from "../state/store";
import "./HomePage.css";

export const HomePage = () => {
  const navigate = useNavigate();
  const { user } = useAppStore();

  return (
    <div className="home-page">
      <h1 className="home-greeting">
        Hello{user?.name ? `, ${user.name}` : ""}!
      </h1>
      <p className="home-subtitle">What would you like to do today?</p>

      <div className="home-buttons">
        <button
          className="home-button"
          onClick={() => navigate("/activities")}
          aria-label="Find an activity or friend"
        >
          <span className="home-button-icon" aria-hidden="true">👥</span>
          <span className="home-button-text">Find an activity or friend</span>
        </button>

        <button
          className="home-button"
          onClick={() => navigate("/messages")}
          aria-label="Messages"
        >
          <span className="home-button-icon" aria-hidden="true">💬</span>
          <span className="home-button-text">Messages</span>
        </button>

        <button
          className="home-button"
          onClick={() => navigate("/order")}
          aria-label="Order essentials"
        >
          <span className="home-button-icon" aria-hidden="true">🛒</span>
          <span className="home-button-text">Order essentials</span>
        </button>

        <button
          className="home-button"
          onClick={() => navigate("/schedule")}
          aria-label="My schedule"
        >
          <span className="home-button-icon" aria-hidden="true">📅</span>
          <span className="home-button-text">My schedule</span>
        </button>

        <button
          className="home-button home-button-danger"
          onClick={() => navigate("/help")}
          aria-label="Help or emergency"
        >
          <span className="home-button-icon" aria-hidden="true">🆘</span>
          <span className="home-button-text">Help or emergency</span>
        </button>
      </div>
    </div>
  );
};
