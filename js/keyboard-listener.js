export default function createKeyboardListener(document) {
	const state = {
		observers: []
	}

	function subscribe(observer) {
		state.observers.push(observer);
	}

	function notifyAll(command) {
		for (const observer of state.observers) {
			observer(command);
		}
	}

	document.addEventListener('keydown', handleKeyDown);

	function handleKeyDown(event) {
		// console.log(event.key);
		notifyAll({ id: 'Player1', key: event.key });
	}

	return {
		subscribe
	}
}