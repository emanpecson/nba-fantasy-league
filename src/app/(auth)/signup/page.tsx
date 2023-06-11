'use client';

import SignupPrompt from '@/components/auth/SignupPrompt';
import RouteButton from '@/components/RouteButton';
import { useRouter } from 'next/navigation';
import { User } from '@prisma/client';

export default function Signup() {
	const router = useRouter();

	async function signup(user: User) {
		const res = await fetch('/api/user', {
			method: 'POST',
			body: JSON.stringify({
				email: user.email,
				password: user.password,
			}),
		});

		const { createdUser } = await res.json();

		if(createdUser) {
			router.push('/login');
		}
		else {
			console.log('Fail to create user')
		}
	}

	return (
		<div>
			<SignupPrompt signup={signup} />
			<RouteButton route={'/'}>
				Cancel
			</RouteButton>
		</div>
	)
}
