import { Router } from "express";
import { prisma } from "../db/client";
import { requireAuth, requireAdmin, AuthRequest } from "../middleware/auth";

const router = Router();

// All admin routes require authenticated admin.
router.use(requireAuth, requireAdmin);

router.get("/users", async (_req, res) => {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    take: 100
  });
  return res.json(users);
});

router.get("/activities", async (_req, res) => {
  const activities = await prisma.activity.findMany();
  return res.json(activities);
});

router.post("/activities", async (req: AuthRequest, res) => {
  const { name, description, category } = req.body as {
    name: string;
    description?: string;
    category: string;
  };
  if (!name || !category) {
    return res.status(400).json({ error: "Invalid payload" });
  }
  const activity = await prisma.activity.create({
    data: { name, description, category }
  });
  return res.status(201).json(activity);
});

router.get("/reports", async (_req, res) => {
  const reports = await prisma.report.findMany({
    orderBy: { createdAt: "desc" },
    take: 100
  });
  return res.json(reports);
});

router.post("/reports/:id/resolve", async (req, res) => {
  const { id } = req.params;
  const report = await prisma.report.update({
    where: { id },
    data: { status: "RESOLVED" }
  });
  return res.json(report);
});

export default router;



