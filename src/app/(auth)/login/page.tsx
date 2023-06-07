'use client'; // look more into this + 'use server'

import React, { useState } from 'react';
import { verifyUser } from '@/lib/user/verifyUser';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// then when doing the id, it'll be an arg in params: export default function test({ params })
export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isValid, setIsValid] = useState(false);
	const router = useRouter();

	const handleEmailChange = (event: React.ChangeEvent) => {
		setEmail(event.target.value);
		setIsValid(event.target.value && password)
	}

	const handlePasswordChange = (event: React.ChangeEvent) => {
		setPassword(event.target.value);
		setIsValid(email && event.target.value);
	}

	const handleLogin = async (event: React.FormEvent) => {
		event.preventDefault();
		const userId: string = await verifyUser(event);	// can cache this func b/c we're fetching the same login info

		console.log('userId:', userId);

		if(userId)
			router.push(`../${userId}/menu`);
		else
			console.log('Invalid credentials');
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

			<Link href="../">Back</Link>
		</div>
	)
}