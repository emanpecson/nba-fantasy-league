import { cache } from 'react';

// cache to reduce latency on consecutive requests to api
export const getUsers = cache(async () => {
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
});