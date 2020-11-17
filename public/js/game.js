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

	function start() {
		const interval = 2000

		setInterval(addFruit, interval)
	}

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

	function addFruit(command) {
		const fruit = {
			id: command ? command.id : Math.floor(Math.random() * 1000),
			x: command ? command.x : Math.floor(Math.random() * state.screen.width),
			y: command ? command.y : Math.floor(Math.random() * state.screen.height)
		}

		state.fruits[fruit.id] = fruit

		notifyAll({ type: 'add-fruit', fruit })
	}

	function removeFruit(command) {
		delete state.fruits[command.id]

		notifyAll({ type: 'remove-fruit', command })
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

		notifyAll({ type: 'remove-player', player: command })
	}

	function movePlayer(command) {
		notifyAll(command)

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
		}
	}

	function checkFruitCollision(player) {
		for (const fruitId in state.fruits) {
			const fruit = state.fruits[fruitId]

			if (player.x == fruit.x && player.y == fruit.y) {
				removeFruit(fruit)
			}
		}
	}

	return {
		state,
		start,
		setState,
		subscribe,
		notifyAll,
		addFruit,
		removeFruit,
		addPlayer,
		removePlayer,
		movePlayer,
		checkFruitCollision
	}
}