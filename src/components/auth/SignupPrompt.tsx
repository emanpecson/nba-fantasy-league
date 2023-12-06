import { User } from '@prisma/client';
import { useForm } from 'react-hook-form';

export default function SignupPrompt({ handleSignup }: { handleSignup: (user: User) => void }) {
  const { register, handleSubmit } = useForm();

  // fix: handleSignup should verify password

  return (
    <>
      <div className="flex min-h-full justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-sm space-y-10">
          <div>
            <h2 className="text-center text-2xl font-semibold leading-9 tracking-tight text-gray-900">
              Create an account
            </h2>
            <p className="text-center text-gray-500">
              Please enter an email and password to sign up.
            </p>
          </div>
          <form
            className="space-y-6"
            onSubmit={handleSubmit((data) => {
              handleSignup(data as User);
            })}>
            <div className="relative -space-y-px rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-0 z-10 rounded-md ring-1 ring-inset ring-gray-300" />
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Email address"
                  {...register('email', { required: true, maxLength: 64 })}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Password"
                  {...register('password', { required: true, maxLength: 64 })}
                />
              </div>
              <div>
                <label htmlFor="confirm-password" className="sr-only">
                  Confirm password
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Confirm password"
                  {...register('confirmPassword', { required: true, maxLength: 64 })}
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-white hover:bg-gray-50 px-3 py-1.5 text-sm font-semibold border-gray-400 border-[1px] leading-6 text-gray-800">
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
