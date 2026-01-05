import { useNavigate } from "react-router-dom";
import { LargeButton } from "../components/LargeButton";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="screen" aria-label="Home">
      <h1 className="screen-title">What would you like to do?</h1>
      <div className="grid">
        <LargeButton onClick={() => navigate("/find")}>Find a friend or activity</LargeButton>
        <LargeButton onClick={() => navigate("/messages")}>Messages</LargeButton>
        <LargeButton onClick={() => navigate("/order")}>Order essentials</LargeButton>
        <LargeButton onClick={() => navigate("/schedule")}>My schedule</LargeButton>
        <LargeButton onClick={() => navigate("/help")}>Help or emergency</LargeButton>
      </div>
    </div>
  );
};



