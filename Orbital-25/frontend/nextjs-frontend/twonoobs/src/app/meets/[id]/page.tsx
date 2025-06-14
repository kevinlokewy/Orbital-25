'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // to get dynamic route param
import { supabase } from '@/lib/supabaseClient';

interface Meet {
  id: string;
  meet_name: string;
  location: string;
  start_date: string;
  end_date: string;
  heat_sheets: string | null; // adjust type if you store heat sheets as text, URL, etc.
}

export default function MeetPage() {
  const params = useParams();
  const meetId = params.id;

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
        <strong>Start Date:</strong> {new Date(meet.start_date).toLocaleDateString()}
      </div>

      <div className="mb-4 text-gray-800">
        <strong>End Date:</strong> {new Date(meet.end_date).toLocaleDateString()}
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
            </div>
            </main>
  );
}



    

     /* <div className="mb-4 text-gray-800">
        <strong>Heat Sheets:</strong> {meet.heat_sheets ? (
          <a href={meet.heat_sheets} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            View Heat Sheets
          </a>
        ) : (
          <span>Heat Sheets Currently Unavailable</span>
        )}
      </div>
    </main> 
  );  */