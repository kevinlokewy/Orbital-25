'use client';

<<<<<<< HEAD
export default function LoginPage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-sm">
        <h1 className="water-text text-center mb-6 text-3xl">Racetrack</h1>

        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter username"
=======
import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_KEY!
);

export default function LoginPage() {
  //stores the users credentials and any error messages
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
    } else {
      window.location.href = '/';
    }
  };

  const handleGuestLogin = () => {
    window.location.href = '/';
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-sm">
        <h1 className="water-text text-center">Racetrack</h1>

        <form onSubmit={handleSubmit}>
          {/* Email and Password inputs */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
>>>>>>> 17c3042 (search bar)
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
<<<<<<< HEAD
=======
              value={password}
              onChange={(e) => setPassword(e.target.value)}
>>>>>>> 17c3042 (search bar)
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            />
          </div>

<<<<<<< HEAD
=======
          {error && <p className='text-red-500 text-sm mb-4'>{error}</p>}

>>>>>>> 17c3042 (search bar)
          <div className="flex items-center justify-start gap-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Log In
            </button>
            <button
              type="button"
              className="text-sm text-blue-500 hover:underline"
<<<<<<< HEAD
              onClick={() => {
                window.location.href = "/";
              }}
=======
              onClick={handleGuestLogin}
>>>>>>> 17c3042 (search bar)
            >
              Continue as Guest
            </button>
          </div>
        </form>

<<<<<<< HEAD
        <p className="text-gray-800 font-semibold text-left text-sm mt-4">
          Don’t have an account?{' '}
=======
        {/* Create account link */}
        <p className="text-gray-800 font-semibold text-left text-sm mt-4">
          Don’t have an account?{'  '}

>>>>>>> 17c3042 (search bar)
          <a href="/register" className="text-blue-500 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </main>
  );
}
<<<<<<< HEAD
=======

>>>>>>> 17c3042 (search bar)
