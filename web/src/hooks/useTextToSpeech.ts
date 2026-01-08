/**
 * Text-to-speech hook for reading content aloud
 * Respects user's textToSpeech preference from store
 */

import { useEffect, useRef } from "react";
import { useAppStore } from "../state/store";

export const useTextToSpeech = () => {
  const { accessibility } = useAppStore();
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  const speak = (text: string, options?: { rate?: number; pitch?: number }) => {
    if (!accessibility.textToSpeech || !synthRef.current) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = options?.rate || 0.9;
    utterance.pitch = options?.pitch || 1.0;
    utterance.lang = "en-US";

    synthRef.current.speak(utterance);
  };

  const stop = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
    }
  };

  return { speak, stop, enabled: accessibility.textToSpeech };
};
