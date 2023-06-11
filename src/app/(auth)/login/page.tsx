'use client';

import LoginPrompt from '@/components/LoginPrompt';
import { verifyUser } from '@/lib/user/verifyUser';
import { User } from '@prisma/client';
import { useRouter } from 'next/navigation';

export default function Login() {
	const router = useRouter();

	async function login(user: User) {
		const id = await verifyUser(user);

		if(id) {
			console.log('Logging in...');
			router.push(`/${id}/menu`);
		}
		else {
			console.log('Invalid credentials');
		}
	}

	return(
		<div>
			<LoginPrompt login={login} />
		</div>
	)
}
