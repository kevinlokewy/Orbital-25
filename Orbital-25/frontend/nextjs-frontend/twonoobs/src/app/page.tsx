'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import React from 'react';

interface Meet {
  id: string;
  meet_name: string;
  location: string;
  start_date: string;
  end_date: string;
}

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('meets');
  const [upcomingMeets, setUpcomingMeets] = useState<Meet[]>([]);
  const [pastMeets, setPastMeets] = useState<Meet[]>([]);

  useEffect(() => {
    const fetchUpcomingMeets = async () => {
      const { data, error } = await supabase
        .from('upcoming_meets')
        .select('id, meet_name, location, start_date, end_date')
        .order('start_date', { ascending: true })
        .limit(5);

      if (error) {
        console.error('Supabase fetch error:', JSON.stringify(error, null, 2));
      } else {
        setUpcomingMeets(data);
      }
    };

    const fetchPastMeets = async () => {
      const { data, error } = await supabase
        .from('past_meets')
        .select('id, meet_name, location, start_date, end_date')
        .order('start_date', { ascending: false });

      if (error) {
        console.error('Supabase fetch error:', JSON.stringify(error, null, 2));
      } else {
        setPastMeets(data);
      }
    };

    fetchUpcomingMeets();
    fetchPastMeets();
  }, []); 


  return (
    <main className="p-6 bg-white min-h-screen">
      {/* login button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => (window.location.href = '/login')}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Log In
        </button>
      </div>

      <h1 className="text-3xl font-bold text-center mb-6 text-black">Home</h1>

      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setActiveTab('meets')}
          className={`px-4 py-2 rounded ${
            activeTab === 'meets' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border'
          }`}
        >
          Meets
        </button>
        <button
          onClick={() => setActiveTab('swimmers')}
          className={`px-4 py-2 rounded ${
            activeTab === 'swimmers' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border'
          }`}
        >
          Swimmers
        </button>
        <button
          onClick={() => setActiveTab('teams')}
          className={`px-4 py-2 rounded ${
            activeTab === 'teams' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border'
          }`}
        >
          Teams
        </button>
      </div>

      <div className="bg-white p-4 rounded shadow-md border border-gray-200">
        {activeTab === 'meets' && (
          <div>
            {/* Upcoming Meets */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Upcoming Meets</h3>
              <ul className="list-disc list-inside text-gray-700">
                {upcomingMeets.length === 0 ? (
                  <li>No Upcoming Meets</li>
                ) : (
                  upcomingMeets.map((meet) => (
                    <li key={meet.id} className="mb-2">
                      <Link
                        href={`/meets/${meet.id}`}
                        className="font-medium text-blue-500 hover:underline"
                      >
                        {meet.meet_name}
                      </Link>
                    </li>
                  ))
                )}
              </ul>
            </div>

            {/* Past Meets */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Past Meets</h3>
              <ul className="list-disc list-inside text-gray-600 mb-4">
                {pastMeets.length === 0 ? (
                  <li>No Recent Meets</li>
                ) : (
                  pastMeets.map((meet) => (
                    <li key={meet.id} className="mb-2">
                      <Link
                        href={`/meets/${meet.id}`}
                        className="font-medium text-gray-700 hover:underline"
                      >
                        {meet.meet_name} 
                      </Link>
                    </li>
                  ))
                )}      
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
              className="border border-gray-400 p-2 w-full rounded text-gray-700"
            />
          </div>
        )}

        {activeTab === 'teams' && (
          <div>
            <h2 className="text-xl font-semibold mb-2 text-black">Search Teams</h2>
            <input
              type="text"
              placeholder="Search for a team..."
              className="border border-gray-400 p-2 w-full rounded text-gray-700"
            />
          </div>
        )}
      </div>
    </main>
  );
}
