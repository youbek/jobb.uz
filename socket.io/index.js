function initialize(app) {
  const server = require("http").Server(app);
  const io = require("socket.io")(server);
  const onlineUsers = [];

  io.on("connection", socket => {
    socket.on("join", data => {
      onlineUsers.push({ ...data, socketId: socket.id });
    });

    socket.on("checkUserOnlineStatus", (hashId, ack) => {
      if (onlineUsers.some(user => user.hashId === hashId)) {
        ack(true);
        return;
      }

      ack(false);
    });

    socket.on("disconnect", () => {
      const userToRemove = onlineUsers.findIndex(
        user => user.socketId === socket.id,
      );

      const removedUser = onlineUsers.splice(userToRemove, 1)[0];

      socket.broadcast.emit("userDisconnected", removedUser.hashId);
    });
  });

  return server;
}

module.exports = {
  initialize,
};
