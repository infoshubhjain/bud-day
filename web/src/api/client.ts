const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000/api";

let authToken: string | null = null;

export function setAuthToken(token: string | null) {
  authToken = token;
}

async function request(path: string, options: RequestInit = {}) {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(options.headers || {})
  };
  if (authToken) {
    (headers as Record<string, string>).Authorization = `Bearer ${authToken}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers
  });
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }
  return res.json();
}

export const api = {
  requestOtp: (phoneNumber: string) =>
    request("/auth/request-otp", {
      method: "POST",
      body: JSON.stringify({ phoneNumber })
    }),
  verifyOtp: (phoneNumber: string, otp: string) =>
    request("/auth/verify-otp", {
      method: "POST",
      body: JSON.stringify({ phoneNumber, otp })
    }),
  me: () => request("/users/me"),
  activities: () => request("/activities"),
  createMatch: (activityId: string) =>
    request("/matches", {
      method: "POST",
      body: JSON.stringify({ activityId })
    }),
  listMatches: () => request("/matches"),
  listMessages: (matchId: string) => request(`/messages/${matchId}`),
  sendMessage: (matchId: string, content: string) =>
    request(`/messages/${matchId}`, {
      method: "POST",
      body: JSON.stringify({ content })
    }),
  placeOrder: (category: string, items: string[]) =>
    request("/orders", {
      method: "POST",
      body: JSON.stringify({ category, items })
    }),
  listOrders: () => request("/orders")
};



