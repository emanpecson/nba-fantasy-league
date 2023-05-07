import FormData from 'form-data';

export async function verifyUser(event) { // event: React.ChangeEvent or React.FormEvent
	event.preventDefault();
	const formData = new FormData(event.target);

	try {
		const response = await fetch('../../api/user', {
			method: 'GET'
		});

		const { key, users } = await response.json();

		console.log('Success:', users);

		for(let user of users) {
			if(user.email == formData.get('email') && user.password == formData.get('password')) {
				console.log('User found:', user);

				return user._id;
			}
		}
		console.log('Error: User not in database');
		return null;
	}
	catch(error) {
		console.error('Error', error);
		return null;
	}
}