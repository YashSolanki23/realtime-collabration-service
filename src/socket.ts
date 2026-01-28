import { userOffline, userOnline, getOnlineUsers } from "./presence";
import { Server } from "socket.io";

export function setupSocket(server: any) {
  const io = new Server(server, {
    cors: { origin: "*" }
  });

  io.on("connection", socket => {
    console.log("connected", socket.id);

    socket.on("user-online", (userId: string) => {
      userOnline(userId, socket.id);

      io.emit("presence-update", {
        userId,
        status: "online",
        onlineUsers: getOnlineUsers()
      });
    });

    socket.on("disconnect", () => {
      for (const [userId, sockId] of getOnlineUsers.entries()) {
        if (sockId === socket.id) {
          userOffline(userId);

          io.emit("presence-update", {
            userId,
            status: "offline",
            onlineUsers: getOnlineUsers()
          });

          break; // ✅ stop searching
        }
      }
    });
  });
}
