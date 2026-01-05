import { Router } from "express";
import { prisma } from "../db/client";
import { requireAuth } from "../middleware/auth";

const router = Router();

// Public catalog of elderly-appropriate activities (no user profiles exposed)
router.get("/", requireAuth, async (_req, res) => {
  const activities = await prisma.activity.findMany({
    where: { isActive: true },
    orderBy: { name: "asc" }
  });
  return res.json(activities);
});

export default router;



