/**
 * Messages list screen
 * List of active conversations
 * Large list items
 * No swipe gestures
 * Back button returns to Home
 */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockApi } from "../services/mockApi";
import { TopBar } from "../components/navigation/TopBar";
import "./MessagesListPage.css";

interface Match {
  id: string;
  activity: { name: string };
  user: { firstName: string };
}

export const MessagesListPage = () => {
  const navigate = useNavigate();
  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    mockApi
      .getMatches()
      .then(setMatches)
      .catch(() => setMatches([]))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className="messages-list-page">
        <TopBar title="Messages" backTo="/home" />
        <div className="page-loading">
          <div className="loading" aria-label="Loading messages"></div>
          <p>Loading conversations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="messages-list-page">
      <TopBar title="Messages" backTo="/home" />

      {matches.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">💬</div>
          <p className="empty-state-text">
            You have no conversations yet. Find a friend to start chatting.
          </p>
          <button
            className="btn-primary"
            onClick={() => navigate("/activities")}
            style={{ marginTop: "var(--spacing-lg)" }}
          >
            Find a friend
          </button>
        </div>
      ) : (
        <div className="messages-list">
          {matches.map((match) => (
            <button
              key={match.id}
              className="message-list-item"
              onClick={() => navigate(`/messages/${match.id}`)}
              aria-label={`Open conversation with ${match.user.firstName}`}
            >
              <div className="message-list-icon" aria-hidden="true">👤</div>
              <div className="message-list-content">
                <div className="message-list-name">{match.user.firstName}</div>
                <div className="message-list-activity">{match.activity.name}</div>
              </div>
              <div className="message-list-arrow" aria-hidden="true">→</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
