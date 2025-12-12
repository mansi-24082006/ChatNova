import { Server } from "socket.io";

// Map to store online users: { userId: socketId }
export const onlineUsers = new Map();

// Export socket instance
export let io;

/**
 * Initialize Socket.io server
 * @param {http.Server} server - HTTP server instance
 * @returns {Server} io - Socket.io server instance
 */
export function initSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId) {
      onlineUsers.set(userId, socket.id);
      console.log(`User connected: ${userId} -> Socket ID: ${socket.id}`);
      io.emit("getOnlineUsers", Array.from(onlineUsers.keys()));
    }

    socket.on("disconnect", () => {
      for (const [key, value] of onlineUsers.entries()) {
        if (value === socket.id) onlineUsers.delete(key);
      }
      console.log(`User disconnected: Socket ID ${socket.id}`);
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

/**
 * Helper to get receiver socket ID
 * @param {string} userId 
 * @returns {string | undefined}
 */
export function getReceiverSocketId(userId) {
  return onlineUsers.get(userId);
}
