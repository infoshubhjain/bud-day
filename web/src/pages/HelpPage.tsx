/**
 * Help and emergency screen
 * Emergency contact button
 * Call support button
 * Caregiver notify button
 * Simple explanation text
 * Back button returns to Home
 */

import { TopBar } from "../components/navigation/TopBar";
import "./HelpPage.css";

export const HelpPage = () => {
  const handleEmergency = () => {
    if (
      confirm(
        "This will call your emergency contact. Are you sure you need immediate help?"
      )
    ) {
      // In production, would trigger phone call
      alert("Calling emergency contact...");
    }
  };

  const handleSupport = () => {
    // In production, would trigger phone call to support
    alert("Calling support...");
  };

  const handleCaregiver = () => {
    // In production, would notify caregiver
    alert("Notifying your caregiver...");
  };

  return (
    <div className="help-page">
      <TopBar title="Help and emergency" backTo="/home" />

      <div className="help-buttons">
        <button
          className="btn-danger help-button-large"
          onClick={handleEmergency}
          aria-label="Call emergency contact"
        >
          <span className="help-button-icon" aria-hidden="true">🆘</span>
          <span className="help-button-text">Call emergency contact</span>
        </button>

        <button
          className="btn-primary help-button-large"
          onClick={handleSupport}
          aria-label="Call support"
        >
          <span className="help-button-icon" aria-hidden="true">📞</span>
          <span className="help-button-text">Call support</span>
        </button>

        <button
          className="btn-secondary help-button-large"
          onClick={handleCaregiver}
          aria-label="Notify caregiver"
        >
          <span className="help-button-icon" aria-hidden="true">👨‍👩‍👧</span>
          <span className="help-button-text">Notify caregiver</span>
        </button>
      </div>

      <div className="help-info">
        <h2 className="help-info-title">Important</h2>
        <p className="help-info-text">
          If you are in immediate danger, please use your phone&apos;s emergency
          services (911 or your local emergency number).
        </p>
        <p className="help-info-text">
          This app is not a replacement for emergency services.
        </p>
      </div>
    </div>
  );
};
