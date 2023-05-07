import FormData from 'form-data';

export async function handleSignup(event) {
	event.preventDefault();
	const formData = new FormData(event.target);
  
	try {
		const response = await fetch('../../api/user', {
			method: 'POST',
			body: JSON.stringify({
				email: formData.get('email'),
				password: formData.get('password')
			})
		});

		const { key, user } = await response.json();
		console.log(response.json());

		console.log('Success', user);
	}
	catch(error) {
		console.error('Error:', error);
	}
}
