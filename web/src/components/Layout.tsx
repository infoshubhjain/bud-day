import { ReactNode } from "react";
import { VoiceMicButton } from "./VoiceMicButton";

interface Props {
  children: ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <div className="app-root">
      <main className="app-main" aria-live="polite">
        {children}
      </main>
      <VoiceMicButton />
    </div>
  );
};



