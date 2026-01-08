/**
 * Accessibility controls component
 * Font size toggle and high contrast toggle
 * Always visible in header
 */

import { useAppStore } from "../state/store";
import "./AccessibilityControls.css";

export const AccessibilityControls = () => {
  const { accessibility, setFontSize, setHighContrast } = useAppStore();

  const sizes: Array<"normal" | "large" | "extra-large"> = [
    "normal",
    "large",
    "extra-large"
  ];

  const getFontSizeLabel = (size: "normal" | "large" | "extra-large") => {
    switch (size) {
      case "normal":
        return "Small";
      case "large":
        return "Medium";
      case "extra-large":
        return "Large";
    }
  };

  const handleFontSizeClick = () => {
    const currentIndex = sizes.indexOf(accessibility.fontSize);
    const nextIndex = (currentIndex + 1) % sizes.length;
    setFontSize(sizes[nextIndex]);
  };

  return (
    <div className="accessibility-controls" role="toolbar" aria-label="Accessibility controls">
      <button
        className={`accessibility-button accessibility-button-font-size`}
        onClick={handleFontSizeClick}
        aria-label={`Font size: ${getFontSizeLabel(accessibility.fontSize)}. Click to change to ${getFontSizeLabel(sizes[(sizes.indexOf(accessibility.fontSize) + 1) % sizes.length])}.`}
        title={`Font size: ${getFontSizeLabel(accessibility.fontSize)}. Click to change.`}
        aria-pressed={false}
      >
        <span className="font-size-icon" aria-hidden="true" style={{
          fontSize: accessibility.fontSize === "normal" ? "0.9em" : accessibility.fontSize === "large" ? "1.1em" : "1.3em"
        }}>
          Aa
        </span>
        <span className="font-size-label">{getFontSizeLabel(accessibility.fontSize)}</span>
        <span className="sr-only">Font size: {getFontSizeLabel(accessibility.fontSize)}</span>
      </button>

      <button
        className="accessibility-button"
        onClick={() => setHighContrast(!accessibility.highContrast)}
        aria-label={accessibility.highContrast ? "Disable high contrast" : "Enable high contrast"}
        aria-pressed={accessibility.highContrast}
        title={accessibility.highContrast ? "Disable high contrast" : "Enable high contrast"}
      >
        <span aria-hidden="true">◐</span>
        <span className="sr-only">
          High contrast {accessibility.highContrast ? "on" : "off"}
        </span>
      </button>
    </div>
  );
};
