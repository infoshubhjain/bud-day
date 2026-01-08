/**
 * Mock API services - simulates backend interactions
 * All methods return promises with static/delayed data
 * In production, these would call real API endpoints
 */

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock data
const MOCK_ACTIVITIES = [
  { id: "morning-walk", name: "Morning walk", icon: "🌅" },
  { id: "evening-walk", name: "Evening walk", icon: "🌆" },
  { id: "light-exercise", name: "Gentle exercise", icon: "💪" },
  { id: "chair-yoga", name: "Chair yoga", icon: "🧘" },
  { id: "stretching", name: "Light stretching", icon: "🤸" },
  { id: "board-games", name: "Board games", icon: "🎲" },
  { id: "card-games", name: "Card games", icon: "🃏" },
  { id: "chess-checkers", name: "Chess or checkers", icon: "♟️" },
  { id: "tea-chat", name: "Conversation over tea", icon: "☕" },
  { id: "phone-chat", name: "Phone conversation", icon: "📞" },
  { id: "reading-circle", name: "Reading together", icon: "📚" },
  { id: "religious-visit", name: "Religious visit", icon: "🕌" },
  { id: "prayer-group", name: "Prayer or meditation", icon: "🙏" },
  { id: "slow-walk-temple", name: "Slow walk near temple/church", icon: "🚶" },
  { id: "music-listening", name: "Listening to music", icon: "🎵" },
  { id: "sing-along", name: "Sing-along", icon: "🎤" },
  { id: "garden-visit", name: "Visit to park or garden", icon: "🌳" },
  { id: "indoor-plants", name: "Indoor gardening or plants", icon: "🌱" },
  { id: "video-call-family", name: "Video call with family", icon: "📹" },
  { id: "memory-sharing", name: "Sharing memories and stories", icon: "💭" }
];

const MOCK_FREQUENT_ITEMS = {
  GROCERIES: [
    { id: "milk", name: "Milk", icon: "🥛" },
    { id: "bread", name: "Bread", icon: "🍞" },
    { id: "eggs", name: "Eggs", icon: "🥚" },
    { id: "fruits", name: "Fresh fruits", icon: "🍎" },
    { id: "vegetables", name: "Vegetables", icon: "🥕" },
    { id: "rice", name: "Rice", icon: "🍚" }
  ],
  MEDICINES: [
    { id: "blood-pressure", name: "Blood pressure medicine", icon: "💊" },
    { id: "vitamins", name: "Daily vitamins", icon: "💊" },
    { id: "pain-relief", name: "Pain relief", icon: "💊" }
  ],
  MEALS: [
    { id: "lunch", name: "Lunch", icon: "🍽️" },
    { id: "dinner", name: "Dinner", icon: "🍽️" },
    { id: "breakfast", name: "Breakfast", icon: "🍽️" }
  ]
};

const MOCK_MATCHES = [
  {
    id: "match-1",
    activity: { id: "morning-walk", name: "Morning walk" },
    user: { id: "user-1", firstName: "Mary", distance: "0.5 km away" },
    availability: "Available mornings"
  },
  {
    id: "match-2",
    activity: { id: "tea-chat", name: "Conversation over tea" },
    user: { id: "user-2", firstName: "John", distance: "1.2 km away" },
    availability: "Available afternoons"
  }
];

const MOCK_MESSAGES = [
  {
    id: "msg-1",
    senderId: "user-1",
    content: "Hello! Would you like to go for a walk tomorrow morning?",
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    isVoice: false
  },
  {
    id: "msg-2",
    senderId: "current-user",
    content: "Yes, that sounds wonderful!",
    createdAt: new Date(Date.now() - 1800000).toISOString(),
    isVoice: false
  }
];

export const mockApi = {
  // Authentication
  async requestOtp(phoneNumber: string): Promise<{ success: boolean }> {
    await delay(800);
    return { success: true };
  },

  async verifyOtp(
    phoneNumber: string,
    otp: string
  ): Promise<{ token: string; user: { id: string; name: string; phoneNumber: string } }> {
    await delay(1000);
    if (otp !== "123456") {
      throw new Error("Invalid code. Please try again.");
    }
    return {
      token: "mock-jwt-token",
      user: {
        id: `user-${phoneNumber}`,
        name: "Friend",
        phoneNumber
      }
    };
  },

  // Activities
  async getActivities(): Promise<
    Array<{ id: string; name: string; icon: string }>
  > {
    await delay(500);
    return MOCK_ACTIVITIES;
  },

  // Matching
  async findMatches(
    activityId: string
  ): Promise<
    Array<{
      id: string;
      activity: { id: string; name: string };
      user: { id: string; firstName: string; distance: string };
      availability: string;
    }>
  > {
    await delay(1500);
    return MOCK_MATCHES.filter((m) => m.activity.id === activityId);
  },

  async connectToMatch(matchId: string): Promise<{ success: boolean }> {
    await delay(800);
    return { success: true };
  },

  // Messages
  async getMatches(): Promise<
    Array<{ id: string; activity: { name: string }; user: { firstName: string } }>
  > {
    await delay(500);
    return MOCK_MATCHES.map((m) => ({
      id: m.id,
      activity: m.activity,
      user: { firstName: m.user.firstName }
    }));
  },

  async getMessages(matchId: string): Promise<
    Array<{
      id: string;
      senderId: string;
      content: string | null;
      createdAt: string;
      isVoice?: boolean;
    }>
  > {
    await delay(500);
    return MOCK_MESSAGES;
  },

  async sendMessage(
    matchId: string,
    content: string
  ): Promise<{
    id: string;
    senderId: string;
    content: string;
    createdAt: string;
  }> {
    await delay(600);
    return {
      id: `msg-${Date.now()}`,
      senderId: "current-user",
      content,
      createdAt: new Date().toISOString()
    };
  },

  // Orders
  async getFrequentItems(category: string): Promise<
    Array<{ id: string; name: string; icon: string }>
  > {
    await delay(400);
    return (
      MOCK_FREQUENT_ITEMS[category as keyof typeof MOCK_FREQUENT_ITEMS] || []
    );
  },

  async placeOrder(data: {
    category: string;
    items: Array<{ id: string; quantity: number }>;
  }): Promise<{ orderId: string; estimatedDelivery: string }> {
    await delay(1200);
    return {
      orderId: `order-${Date.now()}`,
      estimatedDelivery: new Date(
        Date.now() + 2 * 60 * 60 * 1000
      ).toLocaleString()
    };
  },

  // Schedule
  async getScheduledActivities(): Promise<
    Array<{
      id: string;
      activity: { name: string };
      scheduledFor: string;
      reminderSet: boolean;
    }>
  > {
    await delay(500);
    return [
      {
        id: "schedule-1",
        activity: { name: "Morning walk" },
        scheduledFor: new Date(
          Date.now() + 24 * 60 * 60 * 1000
        ).toISOString(),
        reminderSet: true
      }
    ];
  },

  async scheduleActivity(
    matchId: string,
    timeSlot: "morning" | "afternoon" | "evening"
  ): Promise<{ success: boolean }> {
    await delay(800);
    return { success: true };
  }
};
