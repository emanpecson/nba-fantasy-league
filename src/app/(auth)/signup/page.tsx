'use client';

import React, { useState } from 'react';
import { createUser } from '@/lib/user/createUser';
import Link from 'next/link';

export default function Signup() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [verifyPassword, setVerifyPassword] = useState('');
	const [isValid, setIsValid] = useState(false);

	const handleEmailChange = (event: React.ChangeEvent) => {
		setEmail(event.target.value);
		setIsValid(event.target.value && password && verifyPassword && (password == verifyPassword));
	}

	const handlePasswordChange = (event: React.ChangeEvent) => {
		setPassword(event.target.value);
		setIsValid(email && event.target.value && verifyPassword && (event.target.value == verifyPassword));
	}

	const handleVerifyPasswordChange = (event: React.ChangeEvent) => {
		setVerifyPassword(event.target.value);
		setIsValid(email && password && event.target.value && (password == event.target.value));
	}

	return (
		<div>
			<h1>Create an account!</h1>

			<form onSubmit={createUser}>
				<label>E-mail:</label>
				<input 
					type="email" 
					name="email" 
					value={email}
					onChange={handleEmailChange}
					className="appearance-none border rounded w-full py-2 px-4 text-gray-700 bg-gray-200 focus:outline-none focus:shadow-outline"
					placeholder="Enter email" />

				<label>Password:</label>
				<input
					type="password"
					name="password"
					value={password}
					onChange={handlePasswordChange}
					className="appearance-none border rounded w-full py-2 px-4 text-gray-700 bg-gray-200 focus:outline-none focus:shadow-outline"
					placeholder="Enter password" />

				<label>Verify password:</label>
				<input
					type="password"
					name="verifyPassword"
					value={verifyPassword}
					onChange={handleVerifyPasswordChange}
					className="appearance-none border rounded w-full py-2 px-4 text-gray-700 bg-gray-200 focus:outline-none focus:shadow-outline"
					placeholder="Verify password" />

				<button
					type="submit"
					disabled={!isValid}
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
					Create account
				</button>
			</form>

			<Link href="../">Back</Link>
		</div>
	)
}

