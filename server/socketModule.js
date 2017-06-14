function socketModule(io) {

    let currentData = null
    let charNameArr = null
    io.on('connection', socket => {

        socket.emit('update', currentData)
        socket.emit('createTC')

        socket.on('update', updatedData => {
            currentData = updatedData
            socket.broadcast.emit('update', currentData)
        })
        socket.on('createTC', updatedData => {
            charNameArr = updatedData
            socket.broadcast.emit('createTC')
        })
        socket.on('turnUpdate', function() {
            socket.broadcast.emit('turnUpdate')
        })
    })
}

module.exports = socketModule