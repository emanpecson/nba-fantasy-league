'use client';

import React, { useState } from 'react';
import { handleLogin } from '@/app/lib/user/handleLogin';

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

			<form onSubmit={handleLogin}>
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