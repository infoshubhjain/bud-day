/**
 * Voice listening overlay
 * Shows when microphone is active
 * Displays transcription and confirmation options
 * Cancel button returns to previous screen safely
 */

import "./VoiceOverlay.css";

interface VoiceOverlayProps {
  transcription: string;
  onClose: () => void;
}

export const VoiceOverlay = ({ transcription, onClose }: VoiceOverlayProps) => {
  return (
    <div className="voice-overlay" role="dialog" aria-label="Voice assistant">
      <div className="voice-overlay-content">
        <div className="voice-overlay-icon" aria-hidden="true">
          🎤
        </div>
        <p className="voice-listening-text">Listening...</p>
        {transcription && (
          <div className="voice-transcription">
            <p className="voice-transcription-label">You said:</p>
            <p className="voice-transcription-text">{transcription}</p>
          </div>
        )}
        <div className="voice-overlay-actions">
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          {transcription && (
            <button className="btn-primary" onClick={onClose}>
              Confirm
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
