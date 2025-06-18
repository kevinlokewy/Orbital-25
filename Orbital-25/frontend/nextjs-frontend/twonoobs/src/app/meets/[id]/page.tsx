'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // to get dynamic route param
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

interface Meet {
  id: string;
  meet_name: string;
  location: string;
  start_date: string;
  end_date: string;
  heat_sheets: string | null; // adjust type if you store heat sheets as text, URL, etc.
  results: string | null;
}

export default function MeetPage() {
  const params = useParams();
  const meetId = params.id;
  const router = useRouter();


  const [meet, setMeet] = useState<Meet | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMeet = async () => {
      if (!meetId) return;

      const { data, error } = await supabase
        .from('upcoming_meets')
        .select('meet_name, location, start_date, end_date')
        .eq('id', meetId)
        .single();

      if (error) {
        setError(error.message);
      } else {
        setMeet(data);
      }
      setLoading(false);
    };

    fetchMeet();
  }, [meetId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!meet) return <p>Meet not found</p>;

  return (
    <main className="p-6 bg-white min-h-screen max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">{meet.meet_name}</h1>
      
      <div className="mb-4 mt-12 text-gray-800">
        <strong>Location:</strong> {meet.location}
      </div>

      <div className="mb-4 text-gray-800">
        <strong>Start Date:</strong> {(meet.start_date)}
      </div>

      <div className="mb-4 text-gray-800">
        <strong>End Date:</strong> {(meet.end_date)}
      </div>
        <div className="mb-4">
            <span className="font-semibold text-gray-800">Heat Sheets:</span>{' '}
            {meet.heat_sheets ? (
                <a
                href={meet.heat_sheets}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:underline font-medium"
                >
                View Heat Sheets
                </a>
            ) : (
                <span className="text-red-600 font-medium">Heat Sheets Currently Unavailable</span>
            )}
            <div className="mb-6 mt-4">
            <span className="font-semibold text-gray-800">Results:</span>{' '}
            {meet.results ? (
              <a
                href={meet.results}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:underline font-medium"
              >
                View Results
              </a>
            ) : (
              <span className="text-red-600 font-medium">Results Currently Unavailable</span>
            )}
          </div>

                </div>
                <div className="text-center mt-8"></div>
                <button
                onClick={() => router.push('/')}
                className="mb-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                ← Back to Homepage
              </button>

            </main>
  );
}



    