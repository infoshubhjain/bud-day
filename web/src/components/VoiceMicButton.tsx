import { useVoice } from "../voice/VoiceContext";

export const VoiceMicButton = () => {
  const { listening, toggleListening } = useVoice();

  return (
    <button
      type="button"
      className="voice-mic-button"
      onClick={toggleListening}
      aria-pressed={listening}
      aria-label={listening ? "Stop listening" : "Tap to speak"}
    >
      <span aria-hidden="true">{listening ? "●" : "🎤"}</span>
    </button>
  );
};



