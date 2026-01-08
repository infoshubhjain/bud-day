import { Router } from "express";
import { requireAuth } from "../middleware/auth";

const router = Router();

// Static catalog of elderly-appropriate activities – kept simple and recognizable.
const ACTIVITIES = [
  { id: "morning-walk", name: "Morning walk" },
  { id: "evening-walk", name: "Evening walk" },
  { id: "light-exercise", name: "Gentle exercise" },
  { id: "chair-yoga", name: "Chair yoga" },
  { id: "stretching", name: "Light stretching" },
  { id: "board-games", name: "Board games" },
  { id: "card-games", name: "Card games" },
  { id: "chess-checkers", name: "Chess or checkers" },
  { id: "tea-chat", name: "Conversation over tea" },
  { id: "phone-chat", name: "Phone conversation" },
  { id: "reading-circle", name: "Reading together" },
  { id: "religious-visit", name: "Religious visit" },
  { id: "prayer-group", name: "Prayer or meditation" },
  { id: "slow-walk-temple", name: "Slow walk near temple/church" },
  { id: "music-listening", name: "Listening to music" },
  { id: "sing-along", name: "Sing-along" },
  { id: "garden-visit", name: "Visit to park or garden" },
  { id: "indoor-plants", name: "Indoor gardening or plants" },
  { id: "video-call-family", name: "Video call with family" },
  { id: "memory-sharing", name: "Sharing memories and stories" }
];

// Public catalog of elderly-appropriate activities (no user profiles exposed)
router.get("/", requireAuth, async (_req, res) => {
  return res.json(ACTIVITIES);
});

export default router;



