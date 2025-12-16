import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import http from "http";

import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { initSocket } from "./lib/socket.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

/* -------------------- MIDDLEWARE -------------------- */
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://chatnova-jsq3.onrender.com",
    ],
    credentials: true,
  })
);

/* -------------------- ROUTES -------------------- */
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

/* -------------------- PRODUCTION STATIC -------------------- */
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.join(__dirname, "../frontend/dist/index.html")
    );
  });
}

/* -------------------- SERVER + SOCKET -------------------- */
const server = http.createServer(app);
export const io = initSocket(server);

/* -------------------- START SERVER -------------------- */
connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`✅ Server running on PORT: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB connection failed:", err);
  });
