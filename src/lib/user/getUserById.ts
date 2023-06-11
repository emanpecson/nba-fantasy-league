export async function getUserById(id: string) {
	try {
		const response = await fetch(`../../api/user/`, {
			method: 'GET',
			body: JSON.stringify({
				id,
			})
		});
		return response.json();
	}
	catch(error) {
		console.error('Error getting user:', error);
		return error;
	}
}