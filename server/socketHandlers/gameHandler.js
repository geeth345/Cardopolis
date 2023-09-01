module.exports = (socket, io) => {
  socket.on('send_message', (data) => {
    io.emit('new_message', data);
  });
};