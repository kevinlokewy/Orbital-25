'use client';

export default function LoginPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-sm">
       <h1 className="water-text text-center">Racetrack</h1>

        <form onSubmit={(e) => e.preventDefault()}>
          {/* Username and Password inputs */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter username"
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
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            />
          </div>

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
              onClick={() => {
                window.location.href = "/";
              }}
            >
              Continue as Guest
            </button>
          </div>
        </form>

        {/* Create account link */}
        <p className="text-gray-800 font-semibold text-left text-sm mt-4">
          Don’t have an account?{'  '}
 
          <a href="/register" className="text-blue-500 hover:underline">
               Sign Up
          </a>
        </p>
      </div>
    </main>
  );
}

