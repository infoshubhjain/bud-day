/**
 * Activity selection screen
 * Predefined activity list as large cards
 * Icon plus text, tap once to select
 * Continue button at bottom
 * Back button returns to Home
 */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockApi } from "../services/mockApi";
import { TopBar } from "../components/navigation/TopBar";
import "./ActivitySelectionPage.css";

interface Activity {
  id: string;
  name: string;
  icon: string;
}

export const ActivitySelectionPage = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    mockApi
      .getActivities()
      .then(setActivities)
      .catch(() => setActivities([]))
      .finally(() => setIsLoading(false));
  }, []);

  const handleContinue = () => {
    if (selectedId) {
      navigate("/matches", { state: { activityId: selectedId } });
    }
  };

  if (isLoading) {
    return (
      <div className="page-loading">
        <div className="loading" aria-label="Loading activities"></div>
        <p>Loading activities...</p>
      </div>
    );
  }

  return (
    <div className="activity-selection-page">
      <TopBar title="Choose an activity" backTo="/home" />
      <p className="page-subtitle">
        Select an activity you would like to do with a friend
      </p>

      <div className="activity-list">
        {activities.map((activity) => (
          <button
            key={activity.id}
            className={`card ${selectedId === activity.id ? "card-selected" : ""}`}
            onClick={() => setSelectedId(activity.id)}
            aria-pressed={selectedId === activity.id}
            aria-label={`Select ${activity.name}`}
          >
            <span className="card-icon" aria-hidden="true">
              {activity.icon}
            </span>
            <span className="card-content">{activity.name}</span>
          </button>
        ))}
      </div>

      <button
        className="btn-primary"
        onClick={handleContinue}
        disabled={!selectedId}
        style={{ marginTop: "var(--spacing-lg)" }}
      >
        Continue
      </button>
    </div>
  );
};
