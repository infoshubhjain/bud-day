/**
 * Phone number input screen
 * First step of authentication
 * Very simple, clear progress indication
 * No back button (first screen)
 */

import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { mockApi } from "../services/mockApi";
import "./AuthPhonePage.css";

export const AuthPhonePage = () => {
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [caregiverMode, setCaregiverMode] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await mockApi.requestOtp(phone);
      navigate("/auth/otp", { state: { phone, caregiverMode } });
    } catch (err) {
      setError("Could not send code. Please check your number and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-progress" aria-label="Step 1 of 2">
        <span className="auth-progress-step active">1</span>
        <span className="auth-progress-step">2</span>
      </div>

      <h1 className="auth-title">Welcome to Bud Day</h1>
      <p className="auth-subtitle">
        Connect with friends and simplify your daily activities
      </p>

      {error && (
        <div className="status-message error" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="auth-form">
        <label className="input-label">
          Your phone number
          <input
            type="tel"
            className="input-field"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number"
            required
            autoFocus
            aria-required="true"
          />
        </label>

        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={caregiverMode}
            onChange={(e) => setCaregiverMode(e.target.checked)}
            className="checkbox-input"
          />
          <span>I am setting this up with help from a caregiver</span>
        </label>

        <button
          type="submit"
          className="btn-primary"
          disabled={isLoading || !phone.trim()}
        >
          {isLoading ? "Sending..." : "Continue"}
        </button>
      </form>
    </div>
  );
};
