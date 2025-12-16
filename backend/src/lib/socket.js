import { Server } from "socket.io";

// Map to store online users: { userId: socketId }
export const onlineUsers = new Map();

// Export socket instance
export let io;

export function initSocket(server) {
  io = new Server(server, {
    cors: {
      origin: [
        "http://localhost:5173",
        "https://chatnova-jsq3.onrender.com"
      ],
      credentials: true,
    },
  });

  // 🔐 AUTH MIDDLEWARE (IMPORTANT)
  io.use((socket, next) => {
    const cookie = socket.request.headers.cookie;
    const userId = socket.handshake.query.userId;

    if (!cookie || !userId) {
      return next(new Error("Unauthorized"));
    }
    next();
  });

  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;

    // Store online user
    onlineUsers.set(userId, socket.id);
    console.log(`User connected: ${userId} -> ${socket.id}`);

    io.emit("getOnlineUsers", Array.from(onlineUsers.keys()));

    socket.on("disconnect", () => {
      onlineUsers.delete(userId);
      console.log(`User disconnected: ${userId}`);

      io.emit("getOnlineUsers", Array.from(onlineUsers.keys()));
    });

    socket.on("sendMessage", (message) => {
      const receiverSocketId = onlineUsers.get(message.receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", message);
      }
    });
  });

  return io;
}

// Helper
export function getReceiverSocketId(userId) {
  return onlineUsers.get(userId);
}
