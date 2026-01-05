import { useEffect, useState } from "react";
import { api } from "../api/client";

interface User {
  id: string;
  name: string;
  phoneNumber: string;
}

export const AdminDashboard = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Admin endpoints are under /api/admin; using raw fetch to avoid expanding api client too much.
    fetch(
      (import.meta.env.VITE_API_BASE || "http://localhost:4000/api") + "/admin/users",
      {
        headers: {
          "Content-Type": "application/json",
        }
      }
    )
      .then((r) => r.json())
      .then(setUsers)
      .catch(() => setUsers([]));
  }, []);

  return (
    <div className="screen" aria-label="Admin dashboard">
      <h1 className="screen-title">Admin</h1>
      <h2 className="subheading">Users</h2>
      <ul className="list">
        {users.map((u) => (
          <li key={u.id} className="admin-row">
            <span>{u.name}</span>
            <span>{u.phoneNumber}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};



