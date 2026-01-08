/**
 * Microphone button for voice assistant
 * Can be used in TopBar or standalone (home screen)
 */

import { useState } from "react";
import { VoiceOverlay } from "./VoiceOverlay";
import "./VoiceMicButton.css";

interface VoiceMicButtonProps {
  standalone?: boolean;
}

export const VoiceMicButton = ({ standalone = false }: VoiceMicButtonProps) => {
  const [isListening, setIsListening] = useState(false);
  const [transcription, setTranscription] = useState("");

  const handleClick = () => {
    if (isListening) {
      // Stop listening
      setIsListening(false);
      setTranscription("");
    } else {
      // Start listening
      setIsListening(true);
      // Mock transcription - in production would use Web Speech API
      setTimeout(() => {
        setTranscription("Find a friend for morning walk");
      }, 1000);
    }
  };

  return (
    <>
      <button
        className={`voice-mic-button ${standalone ? "standalone" : ""}`}
        onClick={handleClick}
        aria-label={isListening ? "Stop listening" : "Start voice assistant"}
        aria-pressed={isListening}
        title={isListening ? "Stop listening" : "Start voice assistant"}
      >
        <span aria-hidden="true">{isListening ? "⏹" : "🎤"}</span>
        <span className="sr-only">
          {isListening ? "Stop listening" : "Start voice assistant"}
        </span>
      </button>

      {isListening && (
        <VoiceOverlay
          transcription={transcription}
          onClose={() => {
            setIsListening(false);
            setTranscription("");
          }}
        />
      )}
    </>
  );
};
