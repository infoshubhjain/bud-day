import { Router } from "express";
import { prisma } from "../db/client";
import { requireAuth, AuthRequest } from "../middleware/auth";
import { ioInstance } from "../realtime/socket";

const router = Router();

// List messages for a given match (1:1 chat only).
router.get("/:matchId", requireAuth, async (req: AuthRequest, res) => {
  const { matchId } = req.params;

  const match = await prisma.match.findUnique({ where: { id: matchId } });
  if (!match) return res.status(404).json({ error: "Not found" });
  if (match.initiatorId !== req.userId && match.receiverId !== req.userId) {
    return res.status(403).json({ error: "Forbidden" });
  }

  const messages = await prisma.message.findMany({
    where: { matchId },
    orderBy: { createdAt: "asc" }
  });
  return res.json(messages);
});

// Send a new message – text or voice url.
router.post("/:matchId", requireAuth, async (req: AuthRequest, res) => {
  const { matchId } = req.params;
  const { content, voiceUrl } = req.body as { content?: string; voiceUrl?: string };

  const match = await prisma.match.findUnique({ where: { id: matchId } });
  if (!match) return res.status(404).json({ error: "Not found" });
  if (match.status !== "ACCEPTED") {
    return res.status(400).json({ error: "Match not confirmed" });
  }
  if (match.initiatorId !== req.userId && match.receiverId !== req.userId) {
    return res.status(403).json({ error: "Forbidden" });
  }

  const recipientId = match.initiatorId === req.userId ? match.receiverId : match.initiatorId;

  const msg = await prisma.message.create({
    data: {
      matchId,
      senderId: req.userId as string,
      recipientId,
      content,
      voiceUrl
    }
  });

  // Emit to recipient via WebSocket if connected.
  if (ioInstance) {
    ioInstance.to(`user:${recipientId}`).emit("message:new", msg);
  }

  return res.status(201).json(msg);
});

export default router;



