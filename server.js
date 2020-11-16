import express from 'express'
import http from 'http'
import socketio from 'socket.io'
import createGame from './public/js/game.js'

const app = express()
const server = http.createServer(app)
const sockets = socketio(server)
const game = createGame()

app.use(express.static('public'))

game.subscribe((command) => {
	console.log(`> Emiting ${command.type}`)
	sockets.emit(command.type, command)
})

sockets.on('connection', (socket) => {
	const playerId = socket.id

	game.addPlayer({ id: playerId })
	console.log(`> Player connected: ${playerId}`)

	socket.emit('setup', game.state)

	socket.on('disconnect', () => {
		game.removePlayer({ id: playerId })
		console.log(`> Player disconnected: ${playerId}`)
	})

	socket.on('move-player', (command) => {
		command.type = 'move-player'
		command.playerId = playerId

		game.movePlayer(command)
	})
})

server.listen(3000, () => {
	console.log(`> server listening on port 3000`)
})
