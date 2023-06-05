import FormData from 'form-data';
import { getUsers } from './getUsers';

// look into caching 
export async function verifyUser(event: React.FormEvent) {
	// event.preventDefault();
	const formData = new FormData(event.target);

	try {
		const { key, users } = await getUsers();

		console.log('Success:', users);

		for(let user of users) {
			if(user.email == formData.get('email') && user.password == formData.get('password')) {
				console.log('User found:', user);

				return user._id;
			}
		}
		console.log('User not in database');
		return null;
	}
	catch(error) {
		console.error('Error:', error);
		return null;
	}
}