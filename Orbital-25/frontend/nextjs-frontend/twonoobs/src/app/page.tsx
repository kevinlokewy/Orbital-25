'use client';

import { useState } from 'react';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('meets');

  return (
    <main className="p-6 bg-white min-h-screen">
      {/*login button*/}
      <div className='flex justify-end mb-4'>
        <button
          onClick={() => window.location.href = '/login'}
          className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
        >
          Log In
        </button>
      </div>

      <h1 className="text-3xl font-bold text-center mb-6 text-black">Racetrack Home</h1>

      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setActiveTab('meets')}
          className={`px-4 py-2 rounded ${activeTab === 'meets' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border'
            }`}
        >
          Meets
        </button>
        <button
          onClick={() => setActiveTab('swimmers')}
          className={`px-4 py-2 rounded ${activeTab === 'swimmers' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border'
            }`}
        >
          Swimmers
        </button>
        <button
          onClick={() => setActiveTab('teams')}
          className={`px-4 py-2 rounded ${activeTab === 'teams' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border'
            }`}
        >
          Teams
        </button>
      </div>

      <div className="bg-white p-4 rounded shadow-md border border-gray-200">
        {activeTab === 'meets' && (
          <div>
            <h2 className="text-xl font-semibold mb-2 text-black">Meets & Heatsheets</h2>
            <p className="text-gray-700">List upcoming meets and heatsheets here.</p>
          </div>
        )}
        {activeTab === 'swimmers' && (
          <div>
            <h2 className="text-xl font-semibold mb-2 text-black">Search Swimmers</h2>
            <input
              type="text"
              placeholder="Search for a swimmer..."
              className="border border-gray-400 p-2 w-full rounded text-gray-700" />
          </div>
        )}
        {activeTab === 'teams' && (
          <div>
            <h2 className="text-xl font-semibold mb-2 text-black">Search Teams</h2>
            <input
              type="text"
              placeholder="Search for a team..."
              className="border border-gray-400 p-2 w-full rounded text-gray-700" />
          </div>
        )}
      </div>
    </main>
  );
}