import FormData from 'form-data';

export async function createUser(event) {
	event.preventDefault();
	const formData = new FormData(event.target);
  
	try {
		const res = await fetch('../../api/user', {
			method: 'POST',
			body: JSON.stringify({
				email: formData.get('email'),
				password: formData.get('password')
			})
		});

		const createdUser = await res.json();
		console.log('Success:', createdUser);
	}
	catch(error) {
		console.error('Error:', error);
	}
}
