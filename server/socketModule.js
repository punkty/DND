function socketModule(io) {

    let currentData = null

    io.on('connection', socket => {

        socket.emit('update', currentData)

        socket.on('update', updatedData => {
            currentData = updatedData
            socket.broadcast.emit('update', currentData)
        })

    })
}

module.exports = socketModule