'use client';

import FormData from 'form-data';
import React, { useState } from 'react';

export async function handleSubmit(event) {
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
				console.log('user found');

				return;
			}
		}
		console.log('user not found');
	}
	catch(error) {
		console.error('Error retrieving data', error);
	}
}

// then when doing the id, it'll be an arg in params: export default function test({ params })
export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isValid, setIsValid] = useState(false);

	const handleEmailChange = (event) => {
		setEmail(event.target.value);
		setIsValid(event.target.value && password)
	}

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
		setIsValid(email && event.target.value);
	}

	return(
		<div>
			<h1>Login to your account!</h1>

			<form onSubmit={handleSubmit}>
			{/* <form> */}
				<label>Email:</label>
				<input 
					type="email"
					name="email"
					value={email}
					onChange={handleEmailChange}
					className="appearance-none border rounded w-full py-2 px-4 text-gray-700 bg-gray-200 focus:outline-none focus:shadow-outline"
					placeholder="Enter email"/>

				<label>Password:</label>
				<input
					type="password"
					name="password"
					value={password}
					onChange={handlePasswordChange}
					className="appearance-none border rounded w-full py-2 px-4 text-gray-700 bg-gray-200 focus:outline-none focus:shadow-outline"
					placeholder="Enter password"/>

				<button
					type="submit"
					disabled={!isValid}
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
					Login
				</button>

			</form>
		</div>
	)
}