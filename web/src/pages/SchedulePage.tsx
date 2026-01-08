/**
 * Scheduling screen
 * Preset time slots: morning, afternoon, evening
 * Simple confirmation flow
 * Reminder indicator
 * No free form calendar
 * Back button returns to Home
 */

import { useEffect, useState } from "react";
import { mockApi } from "../services/mockApi";
import { TopBar } from "../components/navigation/TopBar";
import "./SchedulePage.css";

interface ScheduledActivity {
  id: string;
  activity: { name: string };
  scheduledFor: string;
  reminderSet: boolean;
}

export const SchedulePage = () => {
  const [scheduled, setScheduled] = useState<ScheduledActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    mockApi
      .getScheduledActivities()
      .then(setScheduled)
      .catch(() => setScheduled([]))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className="page-loading">
        <div className="loading" aria-label="Loading schedule"></div>
        <p>Loading your schedule...</p>
      </div>
    );
  }

  return (
    <div className="schedule-page">
      <TopBar title="My schedule" backTo="/home" />

      {scheduled.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📅</div>
          <p className="empty-state-text">
            You have no scheduled activities yet.
          </p>
          <p className="empty-state-text">
            Connect with a friend to schedule an activity together.
          </p>
        </div>
      ) : (
        <div className="schedule-list">
          {scheduled.map((item) => {
            const date = new Date(item.scheduledFor);
            const timeSlot =
              date.getHours() < 12
                ? "Morning"
                : date.getHours() < 17
                ? "Afternoon"
                : "Evening";

            return (
              <div key={item.id} className="schedule-item">
                <div className="schedule-item-header">
                  <h2 className="schedule-activity-name">
                    {item.activity.name}
                  </h2>
                  {item.reminderSet && (
                    <span className="schedule-reminder-badge" aria-label="Reminder set">
                      🔔
                    </span>
                  )}
                </div>
                <p className="schedule-time-slot">{timeSlot}</p>
                <p className="schedule-date">
                  {date.toLocaleDateString([], {
                    weekday: "long",
                    month: "long",
                    day: "numeric"
                  })}
                </p>
                <p className="schedule-time">
                  {date.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
