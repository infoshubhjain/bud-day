import { useEffect, useState } from "react";
import { api } from "../api/client";

interface Match {
  id: string;
  activity: { name: string };
  scheduledFor: string | null;
}

export const Schedule = () => {
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    api
      .listMatches()
      .then((data) => {
        setMatches(
          data.filter((m: Match) => m.scheduledFor).sort((a: Match, b: Match) => {
            return (
              new Date(a.scheduledFor || 0).getTime() -
              new Date(b.scheduledFor || 0).getTime()
            );
          })
        );
      })
      .catch(() => setMatches([]));
  }, []);

  return (
    <div className="screen" aria-label="My schedule">
      <h1 className="screen-title">My schedule</h1>
      {matches.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📅</div>
          <p className="helper-text">You have no scheduled activities yet.</p>
        </div>
      ) : (
        <ul className="list">
          {matches.map((m) => (
            <li key={m.id} className="schedule-item">
              <div className="schedule-title">{m.activity?.name}</div>
              <div className="schedule-time">
                {m.scheduledFor &&
                  new Date(m.scheduledFor).toLocaleString([], {
                    weekday: "short",
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};



