
/*
'use client';

import { useState } from 'react';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('meets');

  return (
    <main className="p-6 bg-white min-h-screen">
      {/*login button}*//*
      <div className='flex justify-end mb-4'>
        <button
          onClick={() => window.location.href = '/login'}
          className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
        >
          Log In
        </button>
      </div>

      <h1 className="text-3xl font-bold text-center mb-6 text-black"> Home</h1>

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
        {activeTab === 'meets' && (
  <div>

    {/* Upcoming Meets }*//*
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-blue-600 mb-2">Upcoming Meets</h3>
      <ul className="list-disc list-inside text-gray-700">
        <li>Singapore National Championships – July 20</li>
        <li>Asian Age Group Invitational – August 5</li>
        {/* Replace with dynamic data later }*//*
      </ul>
    </div>

    {/* Past Meets }*//*
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">Past Meets</h3>
      <ul className="list-disc list-inside text-gray-500">
        <li>SEA Age Group – May 14</li>
        <li>NUS Invitational – April 30</li>
        {/* Replace with dynamic data later }*//*
      
      </ul>
    </div>
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
}*/
'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface Meet {
  meet_name: string;
  location: string;
  start_date: string;
  end_date: string;
}

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('meets');
  const [upcomingMeets, setUpcomingMeets] = useState([]);

  useEffect(() => {
    const fetchMeets = async () => {
      const { data, error } = await supabase
        .from('upcoming_meets')
        .select('meet_name, location, start_date, end_date')
        .order('start_date', { ascending: true })
        .limit(5);

      if (error) {
        console.error('Supabase fetch error:', JSON.stringify(error, null, 2));
      } else {
        setUpcomingMeets(data);
      }
    };

    fetchMeets();
  }, []);

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

      <h1 className="text-3xl font-bold text-center mb-6 text-black"> Home</h1>

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
            <h2 className="text-xl font-semibold mb-4 text-black">Meets & Heatsheets</h2>

            {/* Upcoming Meets */}
           <div className="mb-6">
            <h3 className="text-lg font-semibold text-blue-600 mb-2">Upcoming Meets</h3>
            <ul className="list-disc list-inside text-gray-700">
              {upcomingMeets.length === 0 ? (
                <li>Loading or no upcoming meets.</li>
              ) : (
                upcomingMeets.map((meet, index) => (
                  <li key={index}>
                    <span className="font-medium">{meet.meet_name}</span>  
                    {' – '}
                    <span className="text-sm text-gray-600">{meet.location}</span>
                    {' • '}
                    <span className="text-sm text-gray-500">
                      {new Date(meet.start_date).toLocaleDateString()} – {new Date(meet.end_date).toLocaleDateString()}
                    </span>
                  </li>
                ))
              )}
            </ul>
          </div>


            {/* Past Meets - You can do something similar here if you want */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Past Meets</h3>
              <ul className="list-disc list-inside text-gray-500">
                <li>SEA Age Group – May 14</li>
                <li>NUS Invitational – April 30</li>
              </ul>
            </div>
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
