'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { verifyUser } from '@/util/user/verifyUser';
import { User } from '@prisma/client';
import LoginPrompt from '@/components/auth/LoginPrompt';
import SignupPrompt from '@/components/auth/SignupPrompt';
import Modal from '@/components/Modal';

export default function LandingPage() {
  const router = useRouter();

  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
  const [signupModalIsOpen, setSignupModalIsOpen] = useState(false);

  async function handleLogin(user: User) {
    const id = await verifyUser(user);

    if (id) {
      console.log('Logging in...');
      router.push(`/${id}/menu`);
    } else {
      console.log('Invalid credentials');
    }
  }

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

      if (createdUser) router.push('/login');
      else throw Error('Failed to create user');
    } catch (error) {
      console.error('Client error:', error);
    }
  }

  return (
    <div className="flex justify-center h-full">
      <div>
        {/* header */}
        <div className="pt-14 pb-10">
          <h1 className="text-4xl font-semibold">NBA Fantasy League</h1>
          <p className="flex justify-center pt-2 text-gray-500">description placeholder</p>
        </div>

        {/* action buttons */}
        <div className="flex space-x-1.5 justify-center">
          <button
            className="bg-gray-800 hover:bg-black text-gray-100 font-semibold py-2 w-36 border border-gray-400 rounded-lg"
            onClick={() => setLoginModalIsOpen(true)}>
            Login
          </button>
          <button
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 w-36 border border-gray-400 rounded-lg"
            onClick={() => setSignupModalIsOpen(true)}>
            Sign up
          </button>
        </div>
      </div>

      {/* app image */}
      <div className="bg-gray-200 bottom-28 absolute h-72 w-[40rem] rounded-2xl">
        <p className="flex justify-center place-items-center h-full">image placeholder</p>
      </div>

      <Modal isOpen={loginModalIsOpen} onClose={() => setLoginModalIsOpen(false)}>
        <LoginPrompt handleLogin={handleLogin} />
      </Modal>
      <Modal isOpen={signupModalIsOpen} onClose={() => setSignupModalIsOpen(false)}>
        <SignupPrompt handleSignup={handleSignup} />
      </Modal>
    </div>
  );
}
