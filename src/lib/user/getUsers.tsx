
export async function getUsers() {
	try {
		const response = await fetch('../../api/user', {
			method: 'GET'
		});
		return response.json();	// return body
	}
	catch(error) {
		console.error('Error getting user:', error);
		return error;
	}
}