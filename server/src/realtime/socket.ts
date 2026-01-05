import { Server } from "socket.io";
import jwt from "jsonwebtoken";

interface JwtPayload {
  sub: string;
}

export let ioInstance: Server | null = null;

export function attachSocketHandlers(io: Server) {
  ioInstance = io;
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token as string | undefined;
    if (!token) return next(new Error("unauthorized"));
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "dev-secret") as JwtPayload;
      (socket as any).userId = decoded.sub;
      next();
    } catch {
      next(new Error("unauthorized"));
    }
  });

  io.on("connection", (socket) => {
    const userId = (socket as any).userId as string;
    socket.join(`user:${userId}`);

    socket.on("disconnect", () => {
      // placeholder for future presence tracking
    });
  });
}



