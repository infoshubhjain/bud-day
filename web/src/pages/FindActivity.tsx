import { useEffect, useState } from "react";
import { api } from "../api/client";

interface Activity {
  id: string;
  name: string;
}

export const FindActivity = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    api
      .activities()
      .then(setActivities)
      .catch(() => setActivities([]));
  }, []);

  const handleChoose = (activity: Activity) => {
    setStatus("Looking for a friend...");
    api
      .createMatch(activity.id)
      .then((match) => {
        if (match.status === "searching") {
          setStatus("We are searching for a friend nearby.");
        } else {
          setStatus("We found someone. They will see your request.");
        }
      })
      .catch(() => setStatus("Something went wrong. Please try again."));
  };

  return (
    <div className="screen" aria-label="Find a friend or activity">
      <h1 className="screen-title">Choose an activity</h1>
      {status && (
        <div className="status-message" role="status">
          {status}
        </div>
      )}
      <ul className="list">
        {activities.map((act) => {
          const iconMap: Record<string, string> = {
            "morning-walk": "🌅",
            "evening-walk": "🌆",
            "light-exercise": "💪",
            "chair-yoga": "🧘",
            "stretching": "🤸",
            "board-games": "🎲",
            "card-games": "🃏",
            "chess-checkers": "♟️",
            "tea-chat": "☕",
            "phone-chat": "📞",
            "reading-circle": "📚",
            "religious-visit": "🕌",
            "prayer-group": "🙏",
            "slow-walk-temple": "🚶",
            "music-listening": "🎵",
            "sing-along": "🎤",
            "garden-visit": "🌳",
            "indoor-plants": "🌱",
            "video-call-family": "📹",
            "memory-sharing": "💭"
          };
          const icon = iconMap[act.id] || "⭐";
          return (
            <li key={act.id}>
              <button
                className="activity-item"
                type="button"
                onClick={() => handleChoose(act)}
              >
                <span className="activity-icon" aria-hidden="true">{icon}</span>
                <span>{act.name}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};


