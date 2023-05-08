import { cache } from 'react';

export const getUserById = cache(async (id: string) => {
	try {
		const response = await fetch(`../../api/user/${id}`, {
			method: 'GET'
		});
		return response.json();	// return body
	}
	catch(error) {
		console.error('Error getting user:', error);
		return error;
	}
});