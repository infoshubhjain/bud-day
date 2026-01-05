import React, { createContext, useContext, useState, ReactNode } from "react";

type VoiceIntent =
  | "find_activity"
  | "send_message"
  | "order_items"
  | "check_schedule"
  | "ask_help"
  | "confirm";

interface VoiceContextValue {
  listening: boolean;
  toggleListening: () => void;
  lastTranscript: string | null;
  lastIntent: VoiceIntent | null;
}

const VoiceContext = createContext<VoiceContextValue | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export const VoiceProvider = ({ children }: Props) => {
  const [listening, setListening] = useState(false);
  const [lastTranscript, setLastTranscript] = useState<string | null>(null);
  const [lastIntent, setLastIntent] = useState<VoiceIntent | null>(null);

  const toggleListening = () => {
    // Placeholder: integrate with cloud speech services here.
    // For now we only toggle UI state.
    setListening((prev) => !prev);
    if (listening) {
      setLastTranscript(null);
      setLastIntent(null);
    }
  };

  const value: VoiceContextValue = {
    listening,
    toggleListening,
    lastTranscript,
    lastIntent
  };

  return <VoiceContext.Provider value={value}>{children}</VoiceContext.Provider>;
};

export const useVoice = () => {
  const ctx = useContext(VoiceContext);
  if (!ctx) throw new Error("useVoice must be used within VoiceProvider");
  return ctx;
};



