import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL =
  import.meta.env.MODE === "development" ? "https://chatnova-backend-5hq3.onrender.com" : "/";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  /* ================= CHECK AUTH ================= */
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/api/auth/check"); // ✅ added /api
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.error("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  /* ================= SIGNUP ================= */
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/api/auth/signup", data); // ✅ added /api
      set({ authUser: res.data });
      toast.success("Account created successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Signup failed");
    } finally {
      set({ isSigningUp: false });
    }
  },

  /* ================= LOGIN ================= */
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/api/auth/login", data); // ✅ added /api
      set({ authUser: res.data });
      localStorage.setItem("authUser", JSON.stringify(res.data));
      toast.success("Logged in successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  /* ================= LOGOUT ================= */
  logout: async () => {
    try {
      await axiosInstance.post("/api/auth/logout"); // ✅ added /api
      set({ authUser: null });
      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Logout failed");
    }
  },

  /* ================= UPDATE PROFILE ================= */
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      let config = {};
      let payload = data;

      if (data instanceof FormData) {
        config = { headers: { "Content-Type": "multipart/form-data" } };
      }

      const res = await axiosInstance.put(
        "/api/auth/update-profile", // ✅ added /api
        payload,
        config
      );

      if (res.data?.user) set({ authUser: res.data.user });
      else set({ authUser: res.data });

      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error in update profile:", error);
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Profile update failed"
      );
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  /* ================= SOCKET CONNECTION ================= */
  connectSocket: () => {
    const { authUser, socket } = get();
    if (!authUser || socket?.connected) return;

    const newSocket = io(BASE_URL, {
      query: { userId: authUser._id },
      transports: ["websocket"],
    });

    newSocket.on("connect", () => {
      console.log("✅ Socket connected:", newSocket.id);
    });

    newSocket.on("disconnect", () => {
      console.log("❌ Socket disconnected");
    });

    newSocket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });

    set({ socket: newSocket });
  },

  disconnectSocket: () => {
    const { socket } = get();
    if (socket?.connected) {
      socket.disconnect();
      console.log("🔌 Socket manually disconnected");
    }
  },
}));
