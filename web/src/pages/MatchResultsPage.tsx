/**
 * Match results screen
 * List of matched users
 * Minimal information: first name, distance, availability
 * Connect button for each match
 * Empty state handling
 * Back button returns to Activity selection
 */

import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { mockApi } from "../services/mockApi";
import { TopBar } from "../components/navigation/TopBar";
import "./MatchResultsPage.css";

interface Match {
  id: string;
  activity: { id: string; name: string };
  user: { id: string; firstName: string; distance: string };
  availability: string;
}

export const MatchResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const activityId = (location.state as { activityId?: string })?.activityId;

  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [connectingId, setConnectingId] = useState<string | null>(null);

  useEffect(() => {
    if (!activityId) {
      navigate("/activities");
      return;
    }

    mockApi
      .findMatches(activityId)
      .then(setMatches)
      .catch(() => setMatches([]))
      .finally(() => setIsLoading(false));
  }, [activityId, navigate]);

  if (isLoading) {
    return (
      <div className="match-results-page">
        <TopBar title="Finding friends" backTo="/activities" />
        <div className="page-loading">
          <div className="loading" aria-label="Finding matches"></div>
          <p>Finding friends nearby...</p>
        </div>
      </div>
    );
  }

  const handleConnect = async (matchId: string) => {
    setConnectingId(matchId);
    try {
      await mockApi.connectToMatch(matchId);
      navigate("/messages");
    } catch (err) {
      // Error handling - show message
      alert("Could not connect. Please try again.");
    } finally {
      setConnectingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="page-loading">
        <div className="loading" aria-label="Finding matches"></div>
        <p>Finding friends nearby...</p>
      </div>
    );
  }

  if (matches.length === 0) {
    return (
      <div className="match-results-page">
        <TopBar title="No matches" backTo="/activities" />
        <div className="empty-state">
          <div className="empty-state-icon">👥</div>
          <p className="empty-state-text">
            We could not find anyone nearby for this activity right now.
          </p>
          <p className="empty-state-text">
            Please try again later or choose a different activity.
          </p>
          <button
            className="btn-primary"
            onClick={() => navigate("/activities")}
            style={{ marginTop: "var(--spacing-lg)" }}
          >
            Choose different activity
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="match-results-page">
      <TopBar title="Friends found" backTo="/activities" />
      <p className="page-subtitle">
        Here are people nearby who want to do this activity
      </p>

      <div className="match-list">
        {matches.map((match) => (
          <div key={match.id} className="match-card">
            <div className="match-info">
              <h2 className="match-name">{match.user.firstName}</h2>
              <p className="match-details">{match.user.distance}</p>
              <p className="match-details">{match.availability}</p>
            </div>
            <button
              className="btn-primary"
              onClick={() => handleConnect(match.id)}
              disabled={connectingId === match.id}
            >
              {connectingId === match.id ? "Connecting..." : "Connect"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
