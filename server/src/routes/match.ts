import { Router } from "express";
import { z } from "zod";
import { prisma } from "../db/client";
import { requireAuth, AuthRequest } from "../middleware/auth";

const router = Router();

const createMatchSchema = z.object({
  activityId: z.string()
});

// Request matching for an activity – system finds nearby people with same interest.
router.post("/", requireAuth, async (req: AuthRequest, res) => {
  const parsed = createMatchSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Invalid payload" });

  const { activityId } = parsed.data;

  // Find one potential partner – in real system, use location and availability.
  const candidate = await prisma.user.findFirst({
    where: {
      id: { not: req.userId || "" },
      matchesReceived: {
        none: {
          initiatorId: req.userId,
          activityId
        }
      }
    }
  });

  if (!candidate) {
    return res.json({ status: "searching" });
  }

  const match = await prisma.match.create({
    data: {
      initiatorId: req.userId as string,
      receiverId: candidate.id,
      activityId,
      approximateDistanceKm: 1.0
    },
    include: { activity: true }
  });

  return res.json(match);
});

// Accept or reject a pending match – mutual consent required.
router.post("/:id/respond", requireAuth, async (req: AuthRequest, res) => {
  const { id } = req.params;
  const { decision } = req.body as { decision: "ACCEPTED" | "REJECTED" };

  const match = await prisma.match.findUnique({ where: { id } });
  if (!match || match.receiverId !== req.userId) {
    return res.status(404).json({ error: "Not found" });
  }

  const updated = await prisma.match.update({
    where: { id },
    data: { status: decision }
  });

  return res.json(updated);
});

// Simple list of user matches – no public browsing.
router.get("/", requireAuth, async (req: AuthRequest, res) => {
  const matches = await prisma.match.findMany({
    where: {
      OR: [{ initiatorId: req.userId }, { receiverId: req.userId }]
    },
    include: { activity: true }
  });
  return res.json(matches);
});

// Schedule a time slot for a match using preset slots from the client.
router.post("/:id/schedule", requireAuth, async (req: AuthRequest, res) => {
  const { id } = req.params;
  const { scheduledFor } = req.body as { scheduledFor: string };

  const match = await prisma.match.findUnique({ where: { id } });
  if (!match) return res.status(404).json({ error: "Not found" });

  // Any party can propose/reschedule for now.
  const updated = await prisma.match.update({
    where: { id },
    data: { scheduledFor: new Date(scheduledFor) }
  });

  return res.json(updated);
});

export default router;



