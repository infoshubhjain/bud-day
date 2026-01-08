/**
 * Back button component
 * Always visible, explicit, accessible
 * Minimum 56px height, labeled "Back"
 * Returns to previous logical screen
 */

import { useNavigate, useLocation } from "react-router-dom";
import "./BackButton.css";

interface BackButtonProps {
  to?: string;
  label?: string;
}

export const BackButton = ({ to, label = "Back" }: BackButtonProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    if (to) {
      navigate(to);
    } else {
      // Navigate to home if no specific route provided
      navigate("/home");
    }
  };

  return (
    <button
      className="back-button"
      onClick={handleBack}
      aria-label={label}
      type="button"
    >
      <span className="back-button-icon" aria-hidden="true">←</span>
      <span className="back-button-text">{label}</span>
    </button>
  );
};
