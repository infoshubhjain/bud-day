import { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
}

export const LargeButton = ({ icon, children, ...rest }: Props) => {
  return (
    <button className="large-button" {...rest}>
      {icon && <span className="large-button-icon" aria-hidden="true">{icon}</span>}
      <span className="large-button-label">{children}</span>
    </button>
  );
};



