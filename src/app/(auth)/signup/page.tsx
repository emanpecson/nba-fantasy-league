'use client';

import SignupPrompt from '@/components/auth/SignupPrompt';
import RouteButton from '@/components/RouteButton';
import { useRouter } from 'next/navigation';
import { User } from '@prisma/client';

export default function Signup() {
	const router = useRouter();

	async function handleSignup(user: User) {
		try {
			const res = await fetch('/api/user', {
				method: 'POST',
				body: JSON.stringify({
					email: user.email,
					password: user.password,
				}),
			});
	
			const { createdUser } = await res.json();

			if(createdUser)
				router.push('/login');
			else
				throw Error('Failed to create user');
		}
		catch (error) {
			console.error('Client error:', error);
		}
	}

	return (
		<div>
			<SignupPrompt handleSignup={handleSignup} />
			<RouteButton route={'/'}>
				Cancel
			</RouteButton>
		</div>
	)
}
