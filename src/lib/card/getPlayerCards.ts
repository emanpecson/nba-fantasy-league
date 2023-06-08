export async function getPlayerCards() {
	try {
		const response = await fetch('../../api/card', {
			method: 'GET'
		});
		return response.json();
	}
	catch (error) {
		console.error('Error getting player cards:', error);
		return error;
	}
}