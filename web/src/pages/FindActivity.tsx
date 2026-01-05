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
        <p className="helper-text" role="status">
          {status}
        </p>
      )}
      <ul className="list">
        {activities.map((act) => (
          <li key={act.id}>
            <button
              className="list-item-button"
              type="button"
              onClick={() => handleChoose(act)}
            >
              {act.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};


