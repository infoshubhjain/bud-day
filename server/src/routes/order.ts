import { Router } from "express";
import { prisma } from "../db/client";
import { requireAuth, AuthRequest } from "../middleware/auth";
import { placeDeliveryOrder } from "../services/deliveryMock";

const router = Router();

// Place a simple essentials order with stored default payment method.
router.post("/", requireAuth, async (req: AuthRequest, res) => {
  const { category, items } = req.body as {
    category: "GROCERIES" | "MEDICINES" | "MEALS";
    items: string[];
  };

  if (!category || !items || !items.length) {
    return res.status(400).json({ error: "Invalid payload" });
  }

  const userId = req.userId as string;

  // Ensure user has a default payment method configured.
  const payment = await prisma.paymentMethod.findFirst({
    where: { userId, isDefault: true }
  });
  if (!payment) {
    return res.status(400).json({ error: "No payment method on file" });
  }

  const order = await prisma.order.create({
    data: {
      userId,
      category,
      items: items.join(", "),
      totalAmount: null // Using null for now – normally calculated from catalog.
    }
  });

  const delivery = await placeDeliveryOrder({ userId, category, items });

  return res.status(201).json({
    order,
    delivery
  });
});

// List recent orders for the current user.
router.get("/", requireAuth, async (req: AuthRequest, res) => {
  const orders = await prisma.order.findMany({
    where: { userId: req.userId },
    orderBy: { createdAt: "desc" },
    take: 20
  });
  return res.json(orders);
});

export default router;



