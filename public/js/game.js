export default function createGame() {
	const state = {
		players: {},
		fruits: {},
		screen: {
			width: 30,
			height: 30
		}
	}

	const observers = []

	function setState(newState) {
		Object.assign(state, newState)
	}

	function subscribe(observer) {
		observers.push(observer)
	}

	function notifyAll(command) {
		for (const observer of observers) {
			observer(command)
		}
	}

	function addPlayer(command) {
		const player = {
			id: command.id,
			x: 'x' in command ? command.x : Math.floor(Math.random() * state.screen.width),
			y: 'y' in command ? command.y : Math.floor(Math.random() * state.screen.height)
		}

		state.players[player.id] = player

		notifyAll({ type: 'add-player', player })
	}

	function removePlayer(command) {
		delete state.players[command.id]

		notifyAll({ type: 'remove-player', player: { id: command.id } })
	}

	function addFruit(command) {
		state.fruits[command.id] = {
			x: command.x,
			y: command.y
		}
	}

	function removeFruit(command) {
		delete state.fruits[command.id]
	}

	function movePlayer(command) {
		const acceptedMoves = {
			ArrowUp(player) {
				player.y = Math.max(player.y - 1, 0)
			},
			ArrowDown(player) {
				player.y = Math.min(player.y + 1, state.screen.height - 1)
			},
			ArrowLeft(player) {
				player.x = Math.max(player.x - 1, 0)
			},
			ArrowRight(player) {
				player.x = Math.min(player.x + 1, state.screen.width - 1)
			}
		}

		const player = state.players[command.playerId]
		const moveFunction = acceptedMoves[command.key]

		if (player && moveFunction) {
			moveFunction(player)
			checkFruitCollision(player)

			notifyAll(command)
		}
	}

	function checkFruitCollision(player) {
		for (const fruitId in state.fruits) {
			const fruit = state.fruits[fruitId]

			if (player.x == fruit.x && player.y == fruit.y) {
				removeFruit({ id: fruitId })
			}
		}
	}

	return {
		state,
		setState,
		subscribe,
		notifyAll,
		addPlayer,
		removePlayer,
		addFruit,
		removeFruit,
		movePlayer,
		checkFruitCollision
	}
}