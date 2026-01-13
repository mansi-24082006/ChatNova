import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import http from "http";
import { fileURLToPath } from "url";

import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { initSocket } from "./lib/socket.js";

dotenv.config();

const app = express();

/* ✅ IMPORTANT: USE 5002 (MATCH FRONTEND) */
const PORT = process.env.PORT || 5002;

/* Fix __dirname for ES modules */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ✅ MIDDLEWARES */
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

/* ✅ ROUTES */
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

/* ✅ PRODUCTION FRONTEND */
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

/* ✅ HTTP SERVER */
const server = http.createServer(app);

/* ✅ SOCKET INITIALIZATION */
export const io = initSocket(server);

/* ✅ START SERVER */
connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`🚀 Server running on PORT: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB connection failed:", err);
  });
