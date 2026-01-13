import { Server } from "socket.io";

/* ✅ Track online users */
export const onlineUsers = new Map();

/* ✅ Export socket instance */
export let io;

/**
 * Initialize Socket.io server
 */
export function initSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
    transports: ["websocket"], // ✅ FIX: prevent polling issues
  });

  io.on("connection", (socket) => {
    const userId = socket.handshake.query?.userId;

    if (userId) {
      onlineUsers.set(userId, socket.id);
      console.log(`✅ User connected: ${userId} -> ${socket.id}`);
      io.emit("getOnlineUsers", Array.from(onlineUsers.keys()));
    }

    socket.on("disconnect", () => {
      for (const [key, value] of onlineUsers.entries()) {
        if (value === socket.id) onlineUsers.delete(key);
      }
      console.log(`❌ User disconnected: ${socket.id}`);
      io.emit("getOnlineUsers", Array.from(onlineUsers.keys()));
    });

    /* ✅ FIX: server should only FORWARD messages */
    socket.on("sendMessage", ({ receiverId, message }) => {
      const receiverSocketId = onlineUsers.get(receiverId);

      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", message);
      }
    });
  });

  return io;
}

/**
 * Helper to get receiver socket ID
 */
export function getReceiverSocketId(userId) {
  return onlineUsers.get(userId);
}
