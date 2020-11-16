export default function createKeyboardListener(document) {
	const state = {
		playerId: null,
		observers: []
	}

	function registerPlayerId(playerId) {
		state.playerId = playerId
	}

	function subscribe(observer) {
		state.observers.push(observer)
	}

	function notifyAll(command) {
		for (const observer of state.observers) {
			observer(command)
		}
	}

	document.addEventListener('keydown', handleKeyDown)

	function handleKeyDown(event) {
		// console.log(event.key)
		const command = {
			type: 'move-player',
			key: event.key,
			playerId: state.playerId
		}

		notifyAll(command)
	}

	return {
		registerPlayerId,
		subscribe
	}
}