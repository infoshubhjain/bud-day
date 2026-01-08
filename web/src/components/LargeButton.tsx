import { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  variant?: "primary" | "secondary" | "danger";
}

export const LargeButton = ({ icon, children, variant = "primary", ...rest }: Props) => {
  const variantClass = variant !== "primary" ? `large-button-${variant}` : "";
  return (
    <button className={`large-button ${variantClass}`} {...rest}>
      {icon && <span className="large-button-icon" aria-hidden="true">{icon}</span>}
      <span className="large-button-label">{children}</span>
    </button>
  );
};



