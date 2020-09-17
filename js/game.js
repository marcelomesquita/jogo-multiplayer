export default function createGame() {
	const state = {
		players: {},
		fruits: {},
		screen: {
			width: 10,
			height: 10
		}
	}

	function addPlayer(command) {
		state.players[command.id] = {
			x: command.x,
			y: command.y
		}
	}

	function removePlayer(command) {
		delete state.players[command.id];
	}

	function addFruit(command) {
		state.fruits[command.id] = {
			x: command.x,
			y: command.y
		}
	}

	function removeFruit(command) {
		delete state.fruits[command.id];
	}

	function movePlayer(command) {
		const acceptedMoves = {
			ArrowUp(player) {
				player.y = Math.max(player.y - 1, 0);
			},
			ArrowDown(player) {
				player.y = Math.min(player.y + 1, state.screen.height - 1);
			},
			ArrowLeft(player) {
				player.x = Math.max(player.x - 1, 0);
			},
			ArrowRight(player) {
				player.x = Math.min(player.x + 1, state.screen.width - 1);
			},
		}

		const player = state.players[command.id];
		const moveFunction = acceptedMoves[command.key];

		if (player && moveFunction) {
			moveFunction(player);
			checkFruitCollision(player);
		}
	}

	function checkFruitCollision(player) {
		for (const fruitId in state.fruits) {
			const fruit = state.fruits[fruitId];

			if (player.x == fruit.x && player.y == fruit.y) {
				removeFruit({ id: fruitId });
			}
		}
	}

	return {
		state,
		addPlayer,
		removePlayer,
		addFruit,
		removeFruit,
		movePlayer,
		checkFruitCollision
	}
}