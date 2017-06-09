const socket = socketio.connect()

socket.on('update', updateRecieved)

function sendUpdate(data){
    socket.emit('update', data)
}