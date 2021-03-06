export default function renderScreen(screen, game, requestAnimationFrame, playerId) {
	const context = screen.getContext('2d')

	context.clearRect(0, 0, screen.width, screen.height)

	for (const id in game.state.players) {
		const player = game.state.players[id]

		context.fillStyle = 'black'
		context.fillRect(player.x, player.y, 1, 1)
	}

	for (const id in game.state.fruits) {
		const fruit = game.state.fruits[id]

		context.fillStyle = 'green'
		context.fillRect(fruit.x, fruit.y, 1, 1)
	}

	let player = game.state.players[playerId]

	if (player) {
		context.fillStyle = 'orange'
		context.fillRect(player.x, player.y, 1, 1)
	}

	requestAnimationFrame(() => {
		renderScreen(screen, game, requestAnimationFrame, playerId)
	})
}