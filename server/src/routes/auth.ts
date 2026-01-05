import { Router } from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { prisma } from "../db/client";

const router = Router();

const requestOtpSchema = z.object({
  phoneNumber: z.string().min(6)
});

const verifyOtpSchema = z.object({
  phoneNumber: z.string().min(6),
  otp: z.string().min(4),
  name: z.string().optional(),
  ageRange: z.string().optional(),
  approximateLocation: z.string().optional(),
  preferredLanguage: z.string().optional(),
  accessibilityNeeds: z.string().optional()
});

// In production this should integrate with an SMS provider.
// Here we simulate OTP delivery and validation.
const otpStore = new Map<string, string>();

router.post("/request-otp", async (req, res) => {
  const parsed = requestOtpSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Invalid payload" });

  const { phoneNumber } = parsed.data;
  const otp = "123456"; // deterministic for now
  otpStore.set(phoneNumber, otp);

  // TODO: integrate with SMS provider
  return res.json({ success: true });
});

router.post("/verify-otp", async (req, res) => {
  const parsed = verifyOtpSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Invalid payload" });

  const { phoneNumber, otp, ...profileData } = parsed.data;
  const expectedOtp = otpStore.get(phoneNumber);
  if (!expectedOtp || expectedOtp !== otp) {
    return res.status(401).json({ error: "Invalid OTP" });
  }

  let user = await prisma.user.findUnique({ where: { phoneNumber } });
  if (!user) {
    user = await prisma.user.create({
      data: {
        phoneNumber,
        name: profileData.name || "Friend",
        ageRange: profileData.ageRange || "65+",
        approximateLocation: profileData.approximateLocation || "Unknown",
        preferredLanguage: profileData.preferredLanguage || "en",
        accessibilityNeeds: profileData.accessibilityNeeds || undefined
      }
    });
  }

  const token = jwt.sign(
    { sub: user.id, role: user.role },
    process.env.JWT_SECRET || "dev-secret",
    { expiresIn: "30d" }
  );

  return res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      role: user.role
    }
  });
});

export default router;



